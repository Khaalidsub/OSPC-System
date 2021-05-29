import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class CreateReferenceDocumentInput{
  @Field()
  fileName: string;
  @Field()
  originalName: string;
  @Field()
  type: string;
}

@InputType()
export class CreateQuestionInput {
  @Field(() => String, { description: '' })
  title: string;
  @Field(() => String, { description: '' })
  body: string;
  @Field(() => String)
  subject: string;
  @Field(() => [CreateReferenceDocumentInput],{ nullable: true})
  references?:CreateReferenceDocumentInput[];
}
