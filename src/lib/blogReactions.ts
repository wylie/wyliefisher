import { neon } from '@neondatabase/serverless';

export type ReactionType = 'like' | 'dislike';

export type ReactionSummary = {
	likeCount: number;
	dislikeCount: number;
	currentReaction: ReactionType | null;
};

const reactionTypes = new Set<ReactionType>(['like', 'dislike']);

export const isReactionType = (value: unknown): value is ReactionType =>
	typeof value === 'string' && reactionTypes.has(value as ReactionType);

const getSql = () => {
	const databaseUrl = import.meta.env.DATABASE_URL ?? process.env.DATABASE_URL;

	if (!databaseUrl) {
		throw new Error('DATABASE_URL is required for blog reactions.');
	}

	return neon(databaseUrl);
};

const toCount = (value: unknown) => Number(value ?? 0);

export const getReactionSummary = async (
	postId: string,
	visitorId: string,
): Promise<ReactionSummary> => {
	const sql = getSql();
	const [counts, current] = await Promise.all([
		sql`
			select reaction_type, count(*)::int as total
			from blog_reaction
			where post_id = ${postId}
			group by reaction_type
		`,
		sql`
			select reaction_type
			from blog_reaction
			where post_id = ${postId}
				and visitor_id = ${visitorId}::uuid
			limit 1
		`,
	]);

	return {
		likeCount: toCount(counts.find((row) => row.reaction_type === 'like')?.total),
		dislikeCount: toCount(counts.find((row) => row.reaction_type === 'dislike')?.total),
		currentReaction: isReactionType(current[0]?.reaction_type) ? current[0].reaction_type : null,
	};
};

export const toggleReaction = async (
	postId: string,
	visitorId: string,
	reactionType: ReactionType,
): Promise<ReactionSummary> => {
	const sql = getSql();
	const existing = await sql`
		select reaction_type
		from blog_reaction
		where post_id = ${postId}
			and visitor_id = ${visitorId}::uuid
		limit 1
	`;

	if (existing[0]?.reaction_type === reactionType) {
		await sql`
			delete from blog_reaction
			where post_id = ${postId}
				and visitor_id = ${visitorId}::uuid
		`;
	} else {
		await sql`
			insert into blog_reaction (post_id, visitor_id, reaction_type)
			values (${postId}, ${visitorId}::uuid, ${reactionType})
			on conflict (post_id, visitor_id)
			do update set
				reaction_type = excluded.reaction_type,
				updated_at = now()
		`;
	}

	return getReactionSummary(postId, visitorId);
};
