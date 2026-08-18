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
  const wikiLinkPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

  for (const child of node.children) {
    if (child.type !== 'text' || !child.value || !wikiLinkPattern.test(child.value)) {
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
    transformCallouts(tree);
  };
}
