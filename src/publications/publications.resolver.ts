import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { MFKN_NAEVNENESHUS_API_URL } from '@libs/constants/api-urls.constant';
import { Publication, PublicationResponse } from '@libs/graphql/graphql';
import { DatabaseService } from 'libs/database/src';
import { publications } from 'libs/database/src/schemas';
import { eq } from 'drizzle-orm';

@Resolver('Publications')
@Injectable()
export class PublicationsResolver {
  constructor(private readonly httpService: HttpService, private readonly databaseService: DatabaseService) { }


  // TODO: Implement the scraping logic here
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
      // Send the POST request to the external API
      const response = await lastValueFrom(
        this.httpService.post<PublicationResponse>(url, payload),
      );

      const scrapedPublications = response.data.publications;

      const insertValues = scrapedPublications.map((publication) => {
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

      await this.databaseService.pg().insert(publications).values(insertValues);

      return response.data;
    } catch (error) {
      throw new Error('Failed to scrape publications: ' + error.message);
    }
  }

  // TODO: Implement the fetching from database logic here
  @Query('fetchPublication')
  async fetchPublication(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Publication> {

    try {
      const res = await this.databaseService.pg().select().from(publications).where(eq(publications.publicationId, id));

      if (res.length === 0) {
        throw new Error('Publication not found');
      }

      // drizzle `select()` always returns an array of elements, even when a single element is found, 
      // so we get the first element in the response array
      const publication: Publication = res[0]

      return publication;
    }
    catch (error) {
      throw new Error('Failed to fetch publication: ' + error.message);
    }
  }
}
