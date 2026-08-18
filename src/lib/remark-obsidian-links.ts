import { readdirSync } from 'node:fs';
import path from 'node:path';

type MarkdownNode = {
  type: string;
  value?: string;
  url?: string;
  title?: string | null;
  children?: MarkdownNode[];
  data?: Record<string, unknown>;
};

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\.md$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

let publicImageIndex: string[] | null = null;

function collectPublicImages(directory: string, prefix: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) return collectPublicImages(absolutePath, relativePath);
    return /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(entry.name) ? [relativePath] : [];
  });
}

function getPublicImageIndex(): string[] {
  if (publicImageIndex) return publicImageIndex;
  const imageDirectory = path.join(process.cwd(), 'public', 'images');
  try {
    publicImageIndex = collectPublicImages(imageDirectory, 'public/images');
  } catch {
    publicImageIndex = [];
  }
  return publicImageIndex;
}

function resolveImageAsset(value: string): string {
  const trimmed = value.trim().replace(/^\/+/, '');
  if (trimmed.startsWith('public/images/')) return trimmed;
  if (trimmed.startsWith('images/')) return `public/${trimmed}`;

  const expectedPath = `public/images/${trimmed}`;
  const exactMatch = getPublicImageIndex().find((candidate) => candidate === expectedPath);
  if (exactMatch) return exactMatch;

  const basename = path.posix.basename(trimmed);
  const basenameMatches = getPublicImageIndex().filter((candidate) => path.posix.basename(candidate) === basename);
  return basenameMatches.length === 1 ? basenameMatches[0] : trimmed;
}

function assetUrl(value: string): string {
  const vaultPath = resolveImageAsset(value);
  const publicPath = vaultPath.startsWith('public/') ? vaultPath.slice('public/'.length) : vaultPath;
  return `/${publicPath.split('/').map((segment) => encodeURIComponent(segment)).join('/')}`;
}

function normalizeMarkdownImageUrl(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:') || trimmed.startsWith('/images/')) {
    return trimmed;
  }

  const resolvedAsset = resolveImageAsset(trimmed);
  if (resolvedAsset !== trimmed || trimmed.includes('public/images/') || trimmed.startsWith('images/')) {
    return assetUrl(resolvedAsset);
  }

  return value;
}

function transformImageNodes(node: MarkdownNode): void {
  if (!node.children) return;

  for (const child of node.children) {
    if (child.type === 'image' && child.url) {
      child.url = normalizeMarkdownImageUrl(child.url);
    }
    transformImageNodes(child);
  }
}

function transformCallouts(node: MarkdownNode): void {
  if (!node.children) return;

  for (const child of node.children) {
    if (child.type === 'blockquote' && child.children?.[0]?.type === 'paragraph') {
      const firstParagraph = child.children[0];
      const firstText = firstParagraph.children?.[0];

      if (firstText?.type === 'text' && firstText.value) {
        const match = firstText.value.match(/^\[!([A-Za-z]+)\](?:[+-])?\s*/);
        if (match) {
          const calloutType = match[1].toLowerCase();
          firstText.value = firstText.value.slice(match[0].length);
          child.data = {
            ...(child.data ?? {}),
            hName: 'aside',
            hProperties: {
              className: ['callout', `callout-${calloutType}`],
              'data-callout': calloutType,
            },
          };
        }
      }
    }

    transformCallouts(child);
  }
}

function transformChildren(node: MarkdownNode): void {
  if (!node.children) return;

  const nextChildren: MarkdownNode[] = [];
  const wikiImagePattern = /!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const wikiLinkPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

  for (const child of node.children) {
    if (child.type !== 'text' || !child.value) {
      transformChildren(child);
      nextChildren.push(child);
      continue;
    }

    const imageMatch = wikiImagePattern.exec(child.value);
    wikiImagePattern.lastIndex = 0;
    if (imageMatch) {
      let cursor = 0;
      let match: RegExpExecArray | null;
      while ((match = wikiImagePattern.exec(child.value)) !== null) {
        if (match.index > cursor) {
          nextChildren.push({ type: 'text', value: child.value.slice(cursor, match.index) });
        }
        const target = match[1].trim();
        const alt = (match[2] ?? target.split('/').pop() ?? 'Embedded image').trim();
        nextChildren.push({ type: 'image', url: assetUrl(target), title: null, data: { hProperties: { alt } } });
        cursor = match.index + match[0].length;
      }
      if (cursor < child.value.length) {
        nextChildren.push({ type: 'text', value: child.value.slice(cursor) });
      }
      continue;
    }

    if (!wikiLinkPattern.test(child.value)) {
      wikiLinkPattern.lastIndex = 0;
      transformChildren(child);
      nextChildren.push(child);
      continue;
    }

    wikiLinkPattern.lastIndex = 0;
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = wikiLinkPattern.exec(child.value)) !== null) {
      if (match.index > cursor) {
        nextChildren.push({ type: 'text', value: child.value.slice(cursor, match.index) });
      }

      const target = match[1].trim();
      const label = (match[2] ?? target).trim();
      nextChildren.push({
        type: 'link',
        title: null,
        url: `/blog/${slugify(target)}/`,
        children: [{ type: 'text', value: label }],
      });
      cursor = match.index + match[0].length;
    }

    if (cursor < child.value.length) {
      nextChildren.push({ type: 'text', value: child.value.slice(cursor) });
    }
  }

  node.children = nextChildren;
}

export default function remarkObsidianLinks() {
  return (tree: MarkdownNode) => {
    transformChildren(tree);
    transformImageNodes(tree);
    transformCallouts(tree);
  };
}
