import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';
import { Subject } from 'subjects/entities/subject.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IQuestion } from '@common/interfaces';
import { Document } from 'mongoose';
export type QuestionDocument = Question & Document;
@ObjectType()
@Schema()
export class Question implements IQuestion {
  @Field(() => ID)
  id: string;
  @Prop()
  @Field(() => String)
  question: string;
  @Field(() => Subject)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: Subject;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
