import { Inject, Injectable } from '@nestjs/common';
import { DrizzleProvider } from './drizzle.provider';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schemas';

@Injectable()
export class DatabaseService {
  constructor(@Inject(DrizzleProvider) private drizzle: DrizzleProvider) { }

  pg(): PostgresJsDatabase<typeof schema> {
    return this.drizzle.getDbInstance();
  }
}
