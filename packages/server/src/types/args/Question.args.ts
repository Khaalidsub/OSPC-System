import { ArgsType, Field, InputType } from "@nestjs/graphql"
import { BaseArgs, Sort } from "types";
@InputType()
export class  QuestionSort{
    @Field(() =>Sort,{nullable:true})
    createdAt?: Sort
    @Field(() =>Sort,{nullable:true})
    updatedAt?: Sort
    @Field(() =>Sort,{nullable:true})
    title?: Sort
}

@InputType()
export class QuestionSearch{
    @Field(() =>String,{nullable:true})
    title?: String
}
@ArgsType()
export class QuestionArgs extends BaseArgs {
    @Field(()=>QuestionSort,{nullable:true})
    sort?:QuestionSort
    @Field(()=>QuestionSearch,{nullable:true})
    query?: QuestionSearch

}

