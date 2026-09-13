create table if not exists blog_reaction (
	post_id text not null,
	visitor_id uuid not null,
	reaction_type text not null check (reaction_type in ('like', 'dislike')),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	primary key (post_id, visitor_id)
);

create index if not exists blog_reaction_post_type_idx
	on blog_reaction (post_id, reaction_type);
