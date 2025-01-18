import { Injectable } from '@nestjs/common';
import { Logger } from 'drizzle-orm';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as schema from './schemas';

@Injectable()
export class DrizzleProvider {
  private readonly db: PostgresJsDatabase<typeof schema>; // Change 'any' to the actual type of your drizzle instance

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    // const logger = new DefaultLogger({ writer: new DrizzleQueryLogger() });

    // Disable prefetch as it is not supported for "Transaction" pool mode
    const client = postgres(connectionString, { prepare: false });
    this.db = drizzle(client, { schema, logger: new DrizzleQueryLogger() });
  }

  getDbInstance(): PostgresJsDatabase<typeof schema> {
    return this.db;
  }
}

class DrizzleQueryLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    // Define ANSI escape codes for color
    const goldColor = '\x1b[33m'; // Gold color
    const resetColor = '\x1b[0m'; // Reset color

    // Construct the log message with color
    const logMessage = `${goldColor}Drizzle Logger:${resetColor} ${query}`;

    // Print the log message to the console
    console.log(logMessage);
    // console.log(logMessage, { params });
  }
}
