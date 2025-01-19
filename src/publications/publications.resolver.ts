import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { Publication } from '@libs/graphql/graphql';
import { PublicationsService } from 'libs/database/src';
import { FetchPublicationsInput, ScrapePublicationsPayloadInput } from './publications.dto';
import { PublicationsQueue } from '@libs/queue';

@Resolver('Publications')
@Injectable()
export class PublicationsResolver {
  constructor(private readonly publicationsQueue: PublicationsQueue, private readonly publicationsService: PublicationsService) { }

  @Mutation('scrapePublications')
  async scrapePublications(
    @Args('payload', { type: () => ScrapePublicationsPayloadInput }) payload: ScrapePublicationsPayloadInput,
  ): Promise<{ name: string; id: string; data: any }> {
    try {
      // Schedule the scraping job and return its details
      const job = await this.publicationsQueue.scheduleScraping(payload);

      return job;
    } catch (error) {
      console.error('Failed to schedule scraping job:', error);
      throw new Error('Failed to schedule scraping job.');
    }
  }

  @Query('fetchPublication')
  async fetchPublication(
    @Args('publicationId', { type: () => String }) publicationId: string,
  ): Promise<Publication> {
    try {
      return await this.publicationsService.selectPublication({ publicationId });
    }
    catch (error) {
      throw new Error('Failed to fetch publication: ' + error.message);
    }
  }

  @Query('fetchPublications')
  async fetchPublications(
    @Args('filter', { type: () => FetchPublicationsInput, nullable: true }) filter?: FetchPublicationsInput,
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 }) page: number = 1,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 }) limit: number = 10
  ): Promise<Publication[]> {
    try {
      const { authority, isBoardRuling, isBroughtToCourt, title } = filter || {};

      return await this.publicationsService.selectPublications({
        filter: {
          authority,
          isBoardRuling,
          isBroughtToCourt,
          title,
        },
        page,
        limit
      });
    } catch (error) {
      throw new Error('Failed to fetch publications: ' + error.message);
    }
  }

}
