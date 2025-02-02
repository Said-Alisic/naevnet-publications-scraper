import { pgTable, text, boolean, varchar, uuid } from "drizzle-orm/pg-core";
import { baseEntity } from "./base-entity";
import { timestampedEntity } from "./timestamped-entity";

export const documents = pgTable('documents', {
  ...baseEntity,
  documentId: uuid('documentId').notNull(),
  title: text('body').notNull(),
  ...timestampedEntity,
});

export const publications = pgTable('publications', {
  ...baseEntity,
  publicationId: uuid('publicationId').notNull(),
  highlights: varchar('highlights', { length: 500 }).array(),
  type: varchar('type', { length: 250 }).notNull(),
  categories: varchar('categories', { length: 250 }).array(),
  jnr: varchar('jnr', { length: 250 }).array(),
  title: text('title').notNull(),
  abstract: varchar('abstract'),
  published_date: varchar('published_date', { length: 50 }).notNull(),
  date: varchar('date', { length: 50 }).notNull(),
  is_board_ruling: boolean('is_board_ruling'),
  is_brought_to_court: boolean('is_brought_to_court'),
  authority: varchar('authority'),
  body: varchar('body').notNull(),
  ...timestampedEntity,
});

export const publicationDocuments = pgTable('publicationDocuments', {
  publicationId: uuid('publicationId').notNull(),
  documentId: uuid('documentId').notNull(),
  ...timestampedEntity,
});

