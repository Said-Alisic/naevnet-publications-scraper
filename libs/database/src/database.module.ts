import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { CoreModule } from '@libs/core';
import { DrizzleProvider } from './drizzle.provider';

@Module({
  imports: [CoreModule],
  providers: [DatabaseService, DrizzleProvider],
  exports: [DatabaseService, DrizzleProvider],
})
export class DatabaseModule {}
