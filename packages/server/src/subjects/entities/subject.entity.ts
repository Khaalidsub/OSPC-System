import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IDepartment, ISubject } from '@common/interfaces';
import { Department } from 'departments/entities/department.entity';
export type SubjectDocument = Subject & Document;
@ObjectType()
@Schema()
export class Subject implements ISubject {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Department.name })
  department: IDepartment;
  @Field(() => String, { description: 'Example field (placeholder)' })
  @Prop()
  name: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  @Prop()
  description: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
