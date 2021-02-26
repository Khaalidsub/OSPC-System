import { Module } from '@nestjs/common';
import { QuestionService } from './forum.service';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerService } from './answer.service';
import { AnswersResolver } from './answer.resolver';
import { QuestionsResolver } from './question.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Answer.name, schema: AnswerSchema },
    ]),
  ],
  providers: [
    QuestionsResolver,
    QuestionService,
    AnswerService,
    AnswersResolver,
  ],
})
export class ForumModule {}
