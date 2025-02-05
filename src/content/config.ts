import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
			heroImage: z.string().optional(),
			snippet: z.string().optional()
  }),
});

export const collections = {
  blog: blogCollection,
};
