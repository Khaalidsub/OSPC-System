import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class StudentMetrics{
    @Field(() =>ID,{name: "id"})
    _id: string
    @Field({nullable: true})
    lessons:number
    @Field({nullable: true})
    answers:number
    @Field({nullable: true})
    questions:number
}