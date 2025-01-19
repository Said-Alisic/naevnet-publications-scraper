import { Queue, Worker, Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { ScrapePublicationsPayloadInput } from '@libs/graphql/graphql';
import { PublicationsService } from 'libs/database/src';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { MFKN_NAEVNENESHUS_API_URL } from '@libs/constants/api-urls.constant';

@Injectable()
export class PublicationsQueue {
  private scrapeQueue: Queue;
  private worker: Worker;

  constructor(
    private readonly publicationsService: PublicationsService,
    private readonly httpService: HttpService,
  ) {
    this.scrapeQueue = new Queue('scrapePublications', {
      connection: {
        name: process.env.REDIS_QUEUE || 'redis',
        host: process.env.REDIS_URL || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || '',
      },
    });
  }

  async initializeWorker() {
    // Initialize worker only when needed
    if (!this.worker) {
      this.worker = new Worker(
        'scrapePublications',
        async (job: Job<ScrapePublicationsPayloadInput>) => {
          try {
            await this.scrapePublications(job.data);
          } catch (error) {
            console.error(`Error processing job ${job.id}:`, error);
          }
        },
        {
          connection: {
            name: process.env.REDIS_QUEUE || 'redis',
            host: process.env.REDIS_URL || 'localhost',
            port: parseInt(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || '',
          },
        },
      );
      console.log('Scraping worker initialized.');
    }
  }

  async scheduleScraping(payload: ScrapePublicationsPayloadInput, delayInMs = 100): Promise<{
    name: string;
    id: string;
    data: any;
  }> {
    await this.initializeWorker();

    const job = await this.scrapeQueue.add('scrapeJob', payload, { delay: delayInMs });

    return {
      name: job.name,
      id: job.id,
      data: job.data
    };
  }

  private async scrapePublications(payload: ScrapePublicationsPayloadInput) {
    const url = MFKN_NAEVNENESHUS_API_URL + '/search';

    const response = await lastValueFrom(
      this.httpService.post(url, payload),
    );

    const insertValues = response.data.publications.map((publication) => ({
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
    }));

    await this.publicationsService.insertPublications({ data: insertValues });
  }
}
