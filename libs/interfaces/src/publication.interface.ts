import { Document } from "./document.interface";

export interface Publication {
  id: string;
  highlights: string[];
  type: string;
  categories: string[];
  jnr: string[];
  title: string;
  abstract?: string;
  publishedDate: string;
  date: string;
  isBoardRuling: boolean;
  isBroughtToCourt: boolean;
  authority: string;
  body?: string;
  documents?: Document[];
}
