import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ScrapePublicationsPayload {
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
