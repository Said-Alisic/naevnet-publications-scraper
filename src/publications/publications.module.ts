import { Module } from '@nestjs/common';
import { PublicationsResolver } from './publications.resolver';
import { DatabaseModule } from 'libs/database/src';
import { QueueModule } from '@libs/queue';

@Module({
  imports: [DatabaseModule, QueueModule],
  providers: [PublicationsResolver],
})
export class PublicationsModule { }
