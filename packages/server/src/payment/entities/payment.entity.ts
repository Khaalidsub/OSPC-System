import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class Payment {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
export enum TopUp{
  xsmall = 5, //2
  small = 10, //5
  medium = 20, //9
  large = 50, // 20
  xlarge = 75, //30
  xxlarge = 100 //35
}
registerEnumType(TopUp,{
  name:'TopUp',
})