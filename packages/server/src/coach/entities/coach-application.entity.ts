import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'users/entities/user.entity';
export type CoachApplicationDocument = CoachApplication & Document;
@ObjectType()
@Schema({ timestamps: true })
export class CoachApplication {
  @Field()
  id: string;
  @Field()
  @Prop({})
  description: string;
  @Field(() => [String], { nullable: true })
  @Prop({ null: true })
  urls: string[];
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string;
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
export const CoachApplicationSchema = SchemaFactory.createForClass(
  CoachApplication,
);
