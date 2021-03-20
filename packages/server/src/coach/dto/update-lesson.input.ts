import { InputType, PartialType, Field, ID } from '@nestjs/graphql';
import { Lesson } from 'coach/entities/lesson.entity';
import { CreateLessonInput } from './create-lesson.input';

@InputType()
export class UpdateLessonInput extends PartialType(Lesson, InputType) {}
