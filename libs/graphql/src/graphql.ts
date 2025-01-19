
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface PublicationsRequestInput {
    categories: CategoryInput[];
    query: string;
    sort: string;
    types: string[];
    skip: number;
    size: number;
}

export interface CategoryInput {
    id: string;
    title: string;
}

export interface ScrapePublicationsPayload {
    categories: string[];
    query: string;
    sort: string;
    types: string[];
    skip: number;
    size: number;
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

export interface PublicationResponse {
    totalCount: number;
    elapsedMilliseconds: number;
    categoryCounts: CategoryCount[];
    publications: Publication[];
}

export interface Category {
    id: string;
    title: string;
}

export interface IMutation {
    scrapePublications(payload: ScrapePublicationsPayload): PublicationResponse | Promise<PublicationResponse>;
}

export interface IQuery {
    fetchPublication(publicationId: string): Publication | Promise<Publication>;
}

type Nullable<T> = T | null;
