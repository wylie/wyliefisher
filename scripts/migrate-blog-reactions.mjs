import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	console.error('DATABASE_URL is required.');
	process.exit(1);
}

const sql = neon(databaseUrl);
const migration = await readFile(new URL('../db/migrations/001_blog_reactions.sql', import.meta.url), 'utf8');

const statements = migration
	.split(';')
	.map((statement) => statement.trim())
	.filter(Boolean);

for (const statement of statements) {
	await sql.query(statement);
}

console.log('Blog reactions migration complete.');
