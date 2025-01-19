import { Module } from '@nestjs/common/decorators/modules';
import { PublicationsService } from './services/publications/publications.service';
import { CoreModule } from '@libs/core';
import { DrizzleProvider } from './drizzle.provider';

@Module({
  imports: [CoreModule],
  providers: [PublicationsService, DrizzleProvider],
  exports: [PublicationsService, DrizzleProvider],
})
export class DatabaseModule { }
