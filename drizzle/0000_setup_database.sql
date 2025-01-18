CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"documentId" uuid NOT NULL,
	"body" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "publications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"publicationId" uuid NOT NULL,
	"highlights" varchar(500)[] NOT NULL,
	"type" varchar(250) NOT NULL,
	"categories" varchar(250)[] NOT NULL,
	"jnr" varchar(250)[] NOT NULL,
	"title" text NOT NULL,
	"abstract" varchar,
	"published_date" varchar(50) NOT NULL,
	"date" varchar(50) NOT NULL,
	"is_board_ruling" boolean NOT NULL,
	"is_brought_to_court" boolean NOT NULL,
	"authority" varchar NOT NULL,
	"body" varchar NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
