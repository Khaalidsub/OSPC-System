import {
  ObjectType,
  Field,
  ID,
  InputType,
  createUnionType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IDepartment, ISubject } from '@common/interfaces';
import { Department } from 'departments/entities/department.entity';
export type SubjectDocument = Subject & Document;
@ObjectType()
@Schema()
@InputType('SubjectInputType')
export class Subject implements ISubject {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;
  @Field(() => Department, { description: 'Example field (placeholder)' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Department.name })
  department: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  @Prop({ unique: true })
  name: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  @Prop()
  description: string;
  @Field(() => Number)
  coaches: number;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
// @Field(() =>)
// export class SubjectsByDepartment{
//   @Field(() =>[Subject])
//   subjects: Subject[]
// }
