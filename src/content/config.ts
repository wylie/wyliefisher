import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		heroImage: image(),
		tags: z.array(z.string()),
		snippet: z.string().optional()
  }),
});

const projectCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
		heroImage: image(),
		tags: z.array(z.string()),
		snippet: z.string().optional(),
		url: z.string().optional(),
		link: z.string().optional(),
		order: z.number().optional(),
  }),
});

export const collections = {
  project: projectCollection,
  blog: blogCollection
};
