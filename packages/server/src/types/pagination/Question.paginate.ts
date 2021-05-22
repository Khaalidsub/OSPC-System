import { Field, ObjectType } from "@nestjs/graphql";
import { Question } from "forum/entities/forum.entity";
import { BasePaginate } from "./Base.paginate";

export const questionLabels = {
    docs:'questions'
}
@ObjectType()
export class QuestionConnection extends BasePaginate{
    @Field(() =>[Question],{nullable:true})
    questions:Question[]
}