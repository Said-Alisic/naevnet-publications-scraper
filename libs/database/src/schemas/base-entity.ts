import { HasDefault, NotNull, sql } from 'drizzle-orm';
import { PgUUIDBuilderInitial, uuid } from 'drizzle-orm/pg-core';

export const baseEntity: {
  id: HasDefault<NotNull<PgUUIDBuilderInitial<'id'>>>;
} = {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
};
