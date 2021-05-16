import { ArgsType, Field } from "@nestjs/graphql"

@ArgsType()
export class BaseArgs{
    @Field({nullable:true})
    page?:number
    @Field({nullable:true})
    limit?:number

}