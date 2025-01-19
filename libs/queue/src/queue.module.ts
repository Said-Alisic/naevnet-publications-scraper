import { Module } from '@nestjs/common';
import { PublicationsQueue } from './services/publications-queue.service';
import { CoreModule } from '@libs/core';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'libs/database/src';

@Module({
  imports: [CoreModule, HttpModule, DatabaseModule],
  providers: [PublicationsQueue],
  exports: [PublicationsQueue],
})
export class QueueModule { }
