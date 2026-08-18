# Publishing from Obsidian

This site is designed for a simple workflow: write in Obsidian, place only reviewed public notes in the publishing folder, and let GitHub Actions build the Astro site.

## Safe publishing workflow

Keep unfinished or private material outside the public repository. A `draft: true` field prevents a note from being generated into the site, but it is not a privacy boundary: files and their history can still be visible in a public Git repository.

Before a note is pushed, confirm that it contains no secrets, private names, internal URLs, credentials, or unpublished research. Review images as well as Markdown text.

## Supported frontmatter

Every public note should include:

```yaml
---
title: "A useful title"
description: "A one-sentence summary for search and social previews."
pubDate: 2026-08-18
updatedDate: 2026-08-18
type: note
tags:
  - linux
  - systems
series: ""
featured: false
draft: false
---
```

The supported `type` values are `article`, `note`, `guide`, `writeup`, and `project`. Older posts without these fields remain valid and default to `article`.

## Obsidian links

Use wiki links for related public notes:

```md
Read [[Pwnable 1 - File Descriptor]] before continuing.

For a friendlier label, use [[Nice - The Priority Scheduling Modification|process scheduling]].
```

Wiki links are converted to `/blog/<slug>/` links at build time. Standard Markdown links continue to work as usual.

## Callouts

Obsidian callouts are supported for notes, warnings, tips, and important insights:

```md
> [!TIP]
> Keep the reusable technique or command here.

> [!WARNING]
> Explain a dangerous command or an important prerequisite.
```

They render as colored, labeled panels in the published article.

## Recommended note types

Use `note` for a short observation or concept, `guide` for a reproducible tutorial, `writeup` for a CTF or security solution, and `project` for a detailed engineering case study.

## Writing rhythm

Short notes can be published weekly. Practical guides can be published every two weeks, and one deeper project or research case study can be published each month. The homepage separates curated featured writing from the latest public notes, so not every note needs to be polished as a flagship article.
