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
	}),
});

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
		link: z.string().optional(),
	}),
});

const media = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		category: z.enum(['movie', 'series', 'anime', 'book']),
		image: z.string(),
		rating: z.string().optional(),
		year: z.string().optional(),
		status: z.string().optional(),
		pubDate: z.coerce.date(),
	}),
});

const about = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		order: z.number(),
		image: z.string().optional(),
	}),
});

export const collections = { blog, projects, media, about };
