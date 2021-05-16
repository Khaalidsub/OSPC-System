import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class BasePaginate {
  @Field()
  totalDocs: number;
  @Field()
  limit: number;
  @Field()
  totalPages: number;
  @Field()
  hasNextPage: boolean;
  @Field()
  hasPrevPage: boolean;
  @Field()
  page: number;
  @Field()
  nextPage: number;
  @Field()
  prevPage: number;
  @Field()
  pagingCounter: number;
}
