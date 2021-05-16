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
@ArgsType()
export class QuestionArgs extends BaseArgs {
    @Field(()=>QuestionSort,{nullable:true})
    sort?:QuestionSort


}

