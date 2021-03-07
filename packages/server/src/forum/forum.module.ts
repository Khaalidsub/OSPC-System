import { Module } from '@nestjs/common';
import { QuestionService } from './forum.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerService } from './answer.service';
import { AnswersResolver } from './answer.resolver';
import { QuestionsResolver } from './question.resolver';
import { Answer, AnswerSchema } from './entities/answer.entity';
import { Question, QuestionSchema } from './entities/forum.entity';

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
