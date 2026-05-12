import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

export const isPublishedPost = (post: BlogPost, now = new Date()) =>
	post.data.pubDate.valueOf() <= now.valueOf();

export const byNewestPost = (a: BlogPost, b: BlogPost) =>
	b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

export const getPublishedPosts = (posts: BlogPost[], now = new Date()) =>
	posts.filter((post) => isPublishedPost(post, now)).sort(byNewestPost);
