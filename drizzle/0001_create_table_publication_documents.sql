CREATE TABLE "publicationDocuments" (
	"publicationId" uuid NOT NULL,
	"documentId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
