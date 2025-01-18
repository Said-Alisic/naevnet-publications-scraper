import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicationsModule } from './publications/publications.module';
import { CoreModule } from '@libs/core';
import { DatabaseModule } from 'libs/database/src';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.gql', './**/*.graphql', '../libs/**/*.gql', '../libs/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'libs/graphql/src/graphql.ts'),
      },
    }),
    PublicationsModule,
    CoreModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
