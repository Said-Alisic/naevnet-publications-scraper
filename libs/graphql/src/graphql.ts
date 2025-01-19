
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CategoryInput {
    id: string;
    title: string;
}

export interface ScrapePublicationsPayloadInput {
    categories: string[];
    query: string;
    sort: string;
    types: string[];
    skip: number;
    size: number;
}

export interface FetchPublicationsInput {
    authority?: Nullable<string>;
    isBoardRuling?: Nullable<boolean>;
    isBroughtToCourt?: Nullable<boolean>;
    title?: Nullable<string>;
    page?: Nullable<number>;
    limit?: Nullable<number>;
}

export interface CategoryCount {
    category: string;
    count: number;
}

export interface Document {
    file: string;
    title: string;
}

export interface Publication {
    id: string;
    highlights: string[];
    type: string;
    categories: string[];
    jnr: string[];
    title: string;
    abstract?: Nullable<string>;
    published_date: string;
    date: string;
    is_board_ruling: boolean;
    is_brought_to_court: boolean;
    authority: string;
    body?: Nullable<string>;
    documents?: Nullable<Document[]>;
}

export interface FetchPublicationsResponse {
    totalCount: number;
    elapsedMilliseconds: number;
    categoryCounts: CategoryCount[];
    publications: Publication[];
}

export interface ScrapePublicationsJobData {
    categories: string[];
    query: string;
    sort: string;
    types: string[];
    skip: number;
    size: number;
}

export interface ScrapePublicationsResponse {
    name: string;
    id: string;
    data: ScrapePublicationsJobData;
}

export interface IMutation {
    scrapePublications(payload: ScrapePublicationsPayloadInput): ScrapePublicationsResponse | Promise<ScrapePublicationsResponse>;
}

export interface IQuery {
    fetchPublication(publicationId: string): Publication | Promise<Publication>;
    fetchPublications(filter?: Nullable<FetchPublicationsInput>, page?: Nullable<number>, limit?: Nullable<number>): Publication[] | Promise<Publication[]>;
}

type Nullable<T> = T | null;
