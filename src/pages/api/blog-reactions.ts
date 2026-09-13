import type { APIRoute } from 'astro';
import {
	getReactionSummary,
	isReactionType,
	toggleReaction,
} from '../../lib/blogReactions';

export const prerender = false;

const visitorCookieName = 'wf_blog_reaction_id';
const maxPostIdLength = 160;
const postIdPattern = /^[a-z0-9][a-z0-9/_-]*$/i;

const json = (body: unknown, init?: ResponseInit) =>
	new Response(JSON.stringify(body), {
		...init,
		headers: {
			'content-type': 'application/json',
			'cache-control': 'no-store',
			...init?.headers,
		},
	});

const isUuid = (value: string) =>
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const getPostId = (request: Request) => {
	const postId = new URL(request.url).searchParams.get('post');

	if (!postId || postId.length > maxPostIdLength || !postIdPattern.test(postId)) {
		return null;
	}

	return postId;
};

const getVisitorId = (Astro: Parameters<APIRoute>[0]) => {
	const existing = Astro.cookies.get(visitorCookieName)?.value;

	if (existing && isUuid(existing)) {
		return existing;
	}

	const visitorId = crypto.randomUUID();
	Astro.cookies.set(visitorCookieName, visitorId, {
		httpOnly: true,
		sameSite: 'lax',
		secure: import.meta.env.PROD,
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
	});

	return visitorId;
};

export const GET: APIRoute = async (Astro) => {
	const postId = getPostId(Astro.request);

	if (!postId) {
		return json({ error: 'Missing post identifier.' }, { status: 400 });
	}

	try {
		return json(await getReactionSummary(postId, getVisitorId(Astro)));
	} catch (error) {
		console.error('Unable to load blog reactions.', error);
		return json({ error: 'Unable to load reactions.' }, { status: 503 });
	}
};

export const POST: APIRoute = async (Astro) => {
	const postId = getPostId(Astro.request);

	if (!postId) {
		return json({ error: 'Missing post identifier.' }, { status: 400 });
	}

	let body: unknown;
	try {
		body = await Astro.request.json();
	} catch (_) {
		return json({ error: 'Invalid JSON body.' }, { status: 400 });
	}

	const reaction = typeof body === 'object' && body ? Reflect.get(body, 'reaction') : null;

	if (!isReactionType(reaction)) {
		return json({ error: 'Invalid reaction.' }, { status: 400 });
	}

	try {
		return json(await toggleReaction(postId, getVisitorId(Astro), reaction));
	} catch (error) {
		console.error('Unable to update blog reaction.', error);
		return json({ error: 'Unable to update reaction.' }, { status: 503 });
	}
};
