import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const writing=defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/writing'}),schema:z.object({title:z.string(),cn:z.string(),tags:z.array(z.string()),category:z.string(),year:z.string(),readTime:z.string(),summary:z.string(),source:z.string(),published:z.string(),status:z.literal('archive-note')})});
const projects=defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/projects'}),schema:z.object({title:z.string(),subtitle:z.string(),cn:z.string(),type:z.string(),period:z.string(),role:z.string(),tags:z.array(z.string()),summary:z.string(),links:z.array(z.tuple([z.string(),z.string().url()])),order:z.number()})});
export const collections={writing,projects};
