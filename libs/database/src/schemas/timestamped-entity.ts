import { HasDefault } from 'drizzle-orm';
import { PgTimestampBuilderInitial, timestamp } from 'drizzle-orm/pg-core';

export const timestampedEntity: {
  createdAt: HasDefault<PgTimestampBuilderInitial<'createdAt'>>;
  updatedAt: HasDefault<PgTimestampBuilderInitial<'updatedAt'>>;
} = {
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
};
