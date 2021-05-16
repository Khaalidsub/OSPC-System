import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({isAbstract:true  })
export class BasePaginate {
  @Field({nullable: true})
  totalDocs: number;
  @Field({nullable: true})
  limit: number;
  @Field({nullable: true})
  totalPages: number;
  @Field({nullable: true})
  hasNextPage: boolean;
  @Field({nullable: true})
  hasPrevPage: boolean;
  @Field({nullable: true})
  page: number;
  @Field({nullable: true})
  nextPage: number;
  @Field({nullable: true})
  prevPage: number;
  @Field({nullable: true})
  pagingCounter: number;
}
