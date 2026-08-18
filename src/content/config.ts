import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    type: z.enum(['article', 'note', 'guide', 'writeup', 'project']).default('article'),
    series: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string(),
    repo: z.string().url(),
    category: z.string(),
    role: z.string(),
    year: z.coerce.string(),
    problem: z.string(),
    outcome: z.string(),
    visual: z.enum(['pipeline', 'camera', 'scanner', 'web', 'boot', 'terminal']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    stack: z.array(z.string()).default([]),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.coerce.string(),
      detail: z.string(),
    })).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, caseStudies };
