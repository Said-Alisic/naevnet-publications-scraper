<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

MFKN Nævneneshus API publications scraper built with NestJS.

## Setup

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

- Open an API testing tool, such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the GraphQL Mutations and Queries

#### `scrapePublications`

- Run the below mutation to send a request to the GraphQL API and schedule a _job_ in **Redis** that will scrape the MFKN Nævneneshus API for `publications` data

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

- Run the below query to send a request to the GraphQL API to fetch a `publication` by its original `id` field in the MFKN Nævneneshus API

```json
{
  "query": "query ($publicationId: String!) { fetchPublication(publicationId: $publicationId) { id highlights type categories jnr title abstract published_date date is_board_ruling is_brought_to_court authority body documents { file title } } }",
  "variables": {
    "publicationId": "e2beb7d0-7c45-4b92-aad8-f129485e62f4"
  }
}
```

- Alternatively, use the below query to retrieve only partial `publication` data

```json
{
  "query": "query ($publicationId: String!) { fetchPublication(publicationId: $publicationId) { id highlights type jnr title abstract authority body } }",
  "variables": {
    "publicationId": "a4eea5fe-a1aa-4715-bd6a-cad4c464dcd1"
    // "publicationId": "e2beb7d0-7c45-4b92-aad8-f129485e62f4"
  }
}
```

#### `fetchPublications`

- Run the below query to send a request to the GraphQL API to fetch `publications` from the database using pagination

```json
{
  "query": "query ($filter: FetchPublicationsInput, $page: Int, $limit: Int) { fetchPublications(filter: $filter, page: $page, limit: $limit) { type jnr title abstract published_date date is_board_ruling is_brought_to_court authority } }",
  "variables": {
    "page": 2,
    "limit": 5
  }
}
```

- Alternatively, use the below query to fetch `publications` from the database using both pagination and filtering

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

## Considerations

### Architecture

#### Libraries

...

#### GraphQL

...

#### Database

...

### Production Preparation

#### Security

...

#### Deployments

...
