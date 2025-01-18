import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PublicationsResolver } from './publications.resolver';
import { DatabaseModule } from 'libs/database/src';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [PublicationsResolver],
})
export class PublicationsModule { }
