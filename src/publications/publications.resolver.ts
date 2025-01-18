import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { MFKN_NAEVNENESHUS_API_URL } from '@libs/constants/api-urls.constant';
import { Publication, PublicationResponse } from '@libs/graphql/graphql';
import { PublicationsService } from 'libs/database/src';


@Resolver('Publications')
@Injectable()
export class PublicationsResolver {
  constructor(private readonly httpService: HttpService, private readonly publicationsService: PublicationsService) { }


  // TODO: Implement scheduler logic here
  @Mutation('scrapePublications')
  async scrapePublications(): Promise<PublicationResponse> {
    const url = MFKN_NAEVNENESHUS_API_URL + '/search';

    const payload = {
      categories: [],
      query: '',
      sort: 'Score',
      types: [],
      skip: 2,
      size: 1,
    };

    try {
      // Send request to the MFKN API
      const response = await lastValueFrom(
        this.httpService.post<PublicationResponse>(url, payload),
      );

      // Transform the scraped data into the format that the database service expects
      const insertValues = response.data.publications.map((publication) => {
        return {
          publicationId: publication.id,
          highlights: publication.highlights,
          type: publication.type,
          categories: publication.categories,
          jnr: publication.jnr,
          title: publication.title,
          abstract: publication.abstract,
          published_date: publication.published_date,
          date: publication.date,
          is_board_ruling: publication.is_board_ruling,
          is_brought_to_court: publication.is_brought_to_court,
          authority: publication.authority,
          body: publication.body,
        };
      })

      await this.publicationsService.insertPublications({ data: insertValues });

      return response.data;
    } catch (error) {
      throw new Error('Failed to scrape publications: ' + error.message);
    }
  }

  // TODO: Implement the fetching from database logic here
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
}
