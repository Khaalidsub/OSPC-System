import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { IDepartment } from '@common/interfaces';
export type DepartmentDocument = Department & Document;
@ObjectType()
@Schema()
@InputType('DepartmentInputType')
export class Department implements IDepartment {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  @Prop({ unique: true })
  name: string;
  @Prop()
  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  @Field(() => User, { description: 'Example field (placeholder)' })
  moderator: string;
  @Field(() => Number)
  subjects: number;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
