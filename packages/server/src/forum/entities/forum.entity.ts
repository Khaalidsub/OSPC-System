import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';
import { Subject } from 'subjects/entities/subject.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IQuestion } from '@common/interfaces';
import { Document } from 'mongoose';
export type QuestionDocument = Question & Document;

@ObjectType()
@InputType('ReferenceDocumentInputType')
export class ReferenceDocument{
  @Field()
  @Prop()
  fileName: string;
  @Field()
  @Prop()
  originalName: string;
  @Field()
  @Prop()
  type: string;
}
@ObjectType()
@Schema({ timestamps: true })
@InputType('QuestionInputType')
export class Question implements IQuestion {
  @Field(() => ID)
  id: string;
  @Prop()
  @Field(() => String)
  title: string;
  @Prop()
  @Field(() => String)
  body: string;
  @Field(() => Subject)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: string;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string;
  @Field(()=>[ReferenceDocument],{nullable: true})
  @Prop({ childSchemas: [ReferenceDocument] })
  references:ReferenceDocument[];
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field()
  answers: number;
}



export const QuestionSchema = SchemaFactory.createForClass(Question);
