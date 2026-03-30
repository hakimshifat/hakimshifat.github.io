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

const experience = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		company: z.string().optional(), // For open-source: project name
		description: z.string(),
		location: z.string().optional(),
		// type: z.enum(['full-time', 'part-time', 'contract', 'internship', 'open-source', 'freelance', 'research', ' ']).default(' '),
		type: z.string().optional(),
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
		current: z.boolean().default(false),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
		// Open-source contribution specific fields
		// contributionType: z.enum(['merge-request', 'pull-request', 'issue', 'documentation', 'bug-report', 'code-review', 'maintenance', 'feature', ' ']).default(' '),
		contributionType: z.string().optional(),
		projectRepo: z.string().optional(), // GitHub/GitLab repo URL
		prLink: z.string().optional(), // Specific PR/MR link
		prNumber: z.string().optional(), // PR/MR number for display
		maintainers: z.array(z.string()).optional(), // Maintainers you worked with
		impact: z.string().optional(), // Brief impact statement (e.g., "Merged upstream", "500+ downloads")
	}),
});

export const collections = { blog, projects, media, about, experience };
