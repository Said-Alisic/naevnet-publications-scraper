
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
    publishedDate: string;
    date: string;
    isBoardRuling: boolean;
    isBroughtToCourt: boolean;
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

export interface IQuery {
    getPublications(): PublicationResponse | Promise<PublicationResponse>;
}

type Nullable<T> = T | null;
