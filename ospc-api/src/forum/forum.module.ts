import { Module } from '@nestjs/common';
import { QuestionService } from './forum.service';
import { ForumResolver } from './forum.resolver';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  providers: [ForumResolver, QuestionService],
})
export class ForumModule {}
