import { Inject, Injectable } from '@nestjs/common';
import { DrizzleProvider } from '../../drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../../schemas';
import { PublicationsInsert, PublicationsSelect } from '../../types';
import { and, eq, ilike, or } from 'drizzle-orm';

@Injectable()
export class PublicationsService {

  pg: PostgresJsDatabase<typeof schema>

  constructor(@Inject(DrizzleProvider) private drizzle: DrizzleProvider) {
    this.pg = this.drizzle.getDbInstance();
  }

  async insertPublications(params: { data: PublicationsInsert[] }): Promise<PublicationsInsert[]> {
    const { data } = params;

    const query = this.pg.insert(schema.publications).values(data);

    return await query.returning();
  }

  async selectPublication(params: { id?: string, publicationId?: string, title?: string }): Promise<PublicationsSelect> {
    const { id, publicationId, title } = params;

    // Collect conditions dynamically
    const conditions = [];

    if (id) {
      conditions.push(eq(schema.publications.id, id));
    }

    if (publicationId) {
      conditions.push(eq(schema.publications.publicationId, publicationId));
    }

    if (title) {
      conditions.push(eq(schema.publications.title, title));
    }

    const query = this.pg.select().from(schema.publications).where(or(...conditions));

    const res = await query;

    if (res.length <= 0) {
      throw new Error('Publication not found');
    }

    // drizzle `select()` always returns an array of elements, even when a single element is found, 
    // so we get the first element in the response array
    return res[0];
  }

  async selectPublications(params: {
    filter?: {
      authority?: string;
      isBoardRuling?: boolean;
      isBroughtToCourt?: boolean;
      title?: string;
    }
    page?: number;
    limit?: number;
  }): Promise<PublicationsSelect[]> {
    const {
      filter: {
        authority,
        isBoardRuling,
        isBroughtToCourt,
        title },
      page = 1,
      limit = 10
    } = params;

    // Collect conditions dynamically
    const conditions = [];

    if (authority) {
      conditions.push(eq(schema.publications.authority, authority));
    }

    if (typeof isBoardRuling === 'boolean') {
      conditions.push(eq(schema.publications.is_board_ruling, isBoardRuling));
    }

    if (typeof isBroughtToCourt === 'boolean') {
      conditions.push(eq(schema.publications.is_brought_to_court, isBroughtToCourt));
    }

    if (title) {
      conditions.push(ilike(schema.publications.title, `%${title}%`));
    }

    const query = this.pg
      .select()
      .from(schema.publications)
      .where(and(...conditions))
      .limit(limit)
      .offset((page - 1) * limit);

    const res = await query;

    if (res.length <= 0) {
      throw new Error('Publications not found');
    }

    return res;
  }

}
