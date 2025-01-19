import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ScrapePublicationsPayloadInput {
  @Field(() => [String])
  categories: string[];

  @Field(() => String)
  query: string;

  @Field(() => String)
  sort: string;

  @Field(() => [String])
  types: string[];

  @Field(() => Number)
  skip: number;

  @Field(() => Number)
  size: number;
}


@InputType()
export class FetchPublicationsInput {
  @Field({ nullable: true })
  authority?: string;

  @Field({ nullable: true })
  isBoardRuling?: boolean;

  @Field({ nullable: true })
  isBroughtToCourt?: boolean;

  @Field({ nullable: true })
  title?: string;
}