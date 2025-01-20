<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Description

MFKN Nævneneshus API publications scraper built with NestJS.

# Setup

### Prepare Environment Variables

- Create new `.env` file in the root folder
  > See `.example.env` for example values

### Install Docker

- Install [Docker Desktop](https://www.docker.com/get-started/)
- Install [docker-compose](https://formulae.brew.sh/formula/docker-compose) (MacOS brew installation)

### Running the app

```bash
$ pnpm install

$ docker-compose

$ npx drizzle-kit push

$ pnpm run start:dev
```

### API testing

Open an API testing tool, such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the GraphQL Mutations and Queries

#### `scrapePublications`

Run the below mutation to send a request to the GraphQL API and schedule a _job_ in **Redis** that will scrape the MFKN Nævneneshus API for `publications` data

> ⚠️ Publications data must be scraped before using the `fetchPublication` or `fetchPublications` queries, in order to populate the database with some `publications` data to fetch with the queries

```json
{
  "query": "mutation ($payload: ScrapePublicationsPayloadInput!) { scrapePublications(payload: $payload) { name id data { categories query sort types skip size } } }",
  "variables": {
    "payload": {
      "categories": [],
      "query": "",
      "sort": "Score",
      "types": [],
      "skip": 0,
      "size": 100
    }
  }
}
```

#### `fetchPublication`

Run the below query to send a request to the GraphQL API to fetch a `publication` by its original `id` field in the MFKN Nævneneshus API

```json
{
  "query": "query ($publicationId: String!) { fetchPublication(publicationId: $publicationId) { id highlights type categories jnr title abstract published_date date is_board_ruling is_brought_to_court authority body documents { file title } } }",
  "variables": {
    "publicationId": "e2beb7d0-7c45-4b92-aad8-f129485e62f4"
  }
}
```

Alternatively, use the below query to retrieve only partial `publication` data

```json
{
  "query": "query ($publicationId: String!) { fetchPublication(publicationId: $publicationId) { id highlights type jnr title abstract authority body } }",
  "variables": {
    "publicationId": "a4eea5fe-a1aa-4715-bd6a-cad4c464dcd1"
  }
}
```

#### `fetchPublications`

Run the below query to send a request to the GraphQL API to fetch `publications` from the database using pagination

```json
{
  "query": "query ($filter: FetchPublicationsInput, $page: Int, $limit: Int) { fetchPublications(filter: $filter, page: $page, limit: $limit) { type jnr title abstract published_date date is_board_ruling is_brought_to_court authority } }",
  "variables": {
    "page": 2,
    "limit": 5
  }
}
```

Alternatively, use the below query to fetch `publications` from the database using both pagination and filtering

```json
{
  "query": "query ($filter: FetchPublicationsInput, $page: Int, $limit: Int) { fetchPublications(filter: $filter, page: $page, limit: $limit) { type jnr title abstract published_date date is_board_ruling is_brought_to_court authority } }",
  "variables": {
    "filter": {
      "authority": "",
      "isBoardRuling": true,
      "isBroughtToCourt": false,
      "title": "Fredericia"
    },
    "page": 10,
    "limit": 5
  }
}
```

# Considerations

## Architecture

### Folder Structure

The main source code for setting up the GraphQL API is located in the `src` folder, while the `libs` folder contains the database connector, business services, scheduler, and interfaces. Database migrations are tracked in the `drizzle` folder using the `drizzle-kit` dependency.

#### `libs`

- **Core:**  
  The `core` folder contains the `CoreModule`, which enables the API to read environment variables from the `.env` file.

- **Database:**  
  The `database` library provides the database connection module, schemas and inferred types using Drizzle ORM, and database services for data persistence.

- **GraphQL:**  
  The `graphql` folder contains the GraphQL API schema and TypeScript interfaces for the GraphQL API resolvers.

- **Queue:**  
  The `queue` library contains the `QueueModule`, which establishes the connection between the API and Redis. It also provides the `PublicationsQueue` service for scheduling jobs in the Redis queue using `bullmq`.

### GraphQL

The GraphQL API resolvers are stored in the `src` folder, along with their respective DTOs. For example, the `PublicationsResolver` is located in the `publications` folder and includes Mutation and Query endpoints. These endpoints handle:

- Scheduling publication scraping processes.
- Fetching a publication by its ID (`publicationId` field in the database).
- Fetching publications using pagination and filtering.

**Future Improvements:**  
The GraphQL-related folders could be consolidated under a `graphql` directory in the `src` folder. Additionally, DTOs for each resolver could be moved to a dedicated library in the `libs` folder for better organisation.

### Database

Data is persisted in a PostgreSQL database, which is deployed using Docker. The API connects to the database using the Drizzle ORM, providing a lightweight, type-safe layer between SQL and NestJS. Drizzle is easy to adopt for developers familiar with raw SQL and also includes the `drizzle-kit` CLI, which simplifies database migration management by generating automatic snapshots and migration files.

- The `publications` table stores all publication data scraped from the MFKN Nævneneshus API, excluding document-related data.
- The `documents` table stores data for documents related to publications. However, the logic for saving documents to the database is not implemented; this table exists to illustrate the relationship between `publications` and `documents`.
- The `publicationDocuments` table maps `documents` to `publications`. While adding a `publicationId` field to the `documents` table might simplify the schema, it is unclear whether a document can relate to multiple publications or other entities. This uncertainty necessitates the current design.

### Scraping MFKN Nævneneshus API

The `scrapePublications()` GraphQL mutation schedules jobs in the Redis queue to scrape publication data from the MFKN Nævneneshus API and store it in the database. Using a queue prevents the mutation endpoint from becoming a bottleneck, especially when processing large scraping tasks involving thousands of publications.

The queue system provides:

- **Scalability:** Better horizontal scaling and concurrency management.
- **Fault Tolerance:** Enhanced error handling and retry mechanisms.

The `scrapePublications()` mutation mirrors the parameters of the MFKN Nævneneshus API's publications endpoint, making it easier to specify and fetch the required publication data.

## Production Preparation

### Security

Currently, the GraphQL API lacks security, allowing anyone to schedule scraping processes. This poses significant risks in a production environment, such as enabling external users to overload the Redis queue by scheduling excessive scraping jobs.

**Solutions:**

- Implement authentication tokens to restrict unauthorised access.
- Use role-based access control to limit API access based on user roles, ensuring only authorised users can call specific endpoints.

### External API Issues

Scraping an external API introduces potential challenges:

- **Rate Limiting:** Frequent scraping may trigger rate limits or flag the GraphQL API as a threat, potentially leading to a permanent block.
- **Solution:** Adhere to the external API's rate limits and implement retry mechanisms for failed requests.

### Scraping Process

To enhance the scraping process:

- **Monitor Queued Jobs:** Monitoring helps prevent overloading the queue and provides insight into failed jobs, facilitating improvements.
- **Track Job Metadata:** Store job-related data in the database for better analysis.
- **Implement Timeouts:** Introduce timeouts for small batch jobs to prevent them from stalling, especially if another job with identical parameters is already running.
