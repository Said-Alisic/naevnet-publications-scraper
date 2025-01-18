import { documents, publications, publicationDocuments } from "../schemas";

// Insert types
export type PublicationsInsert = typeof publications.$inferInsert;
export type DocumentsInsert = typeof documents.$inferInsert;
export type PublicationDocumentsInsert = typeof publicationDocuments.$inferInsert;


// Select types
export type PublicationsSelect = typeof publications.$inferSelect;
export type DocumentsSelect = typeof documents.$inferSelect;
export type PublicationDocumentsSelect = typeof publicationDocuments.$inferSelect;


// Update types
export type PublicationsUpdate = typeof publications.$inferUpdate;
export type DocumentsUpdate = typeof documents.$inferUpdate;
export type PublicationDocumentsUpdate = typeof publicationDocuments.$inferUpdate;

