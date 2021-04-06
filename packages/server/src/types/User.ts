import { Field, ObjectType } from '@nestjs/graphql';
import { SubjectSpecialization } from 'coach/entities/coach.entity';
import { Lesson } from 'coach/entities/lesson.entity';

@ObjectType()
export class CoachLessons {
  @Field(() => String, { name: 'id' })
  _id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field(() => [Lesson])
  lessons: Lesson[];
  @Field()
  lessons_taken: number;
  @Field(() => SubjectSpecialization, { name: 'subjectSpecialization' })
  subjectspecializations: SubjectSpecialization;
}
