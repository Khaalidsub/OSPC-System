import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuestionService } from './forum.service';
import { CreateQuestionInput } from './dto/create-forum.input';
import { UpdateQuestionInput } from './dto/update-forum.input';
import { IAnswer, IQuestion } from './types';
import { User } from '../users/entities/user.entity';
import { CurrentUser, GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { CreateAnswerInput } from './dto/create-answer.input';

@Resolver(() => IQuestion)
export class ForumResolver {
  constructor(
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService,
  ) {}

  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  makeQuestion(
    @CurrentUser() user: User,
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionService.create(createQuestionInput);
  }
  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  async answerQuestion(
    @CurrentUser() user: User,
    @Args('updateAnswerInput') createAnswerInput: CreateAnswerInput,
    @Args('questionId') questionId: string,
  ) {
    try {
      const createAnswer = await this.answerService.create({
        ...createAnswerInput,
        user: user,
      } as IAnswer);

      return this.questionService.update(questionId, {
        $push: { answers: createAnswer },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  async voteAnswer(
    @CurrentUser() user: User,
    @Args('vote') vote: boolean,
    @Args('answer') answerId: string,
  ) {
    try {
      return this.answerService.update(answerId, { votes: vote ? +1 : -1 });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  approveAnswer(
    @CurrentUser() user: User,
    @Args('answer') answerId: string,
    @Args('question') questionId: string,
  ) {
    try {
      return this.questionService.update(questionId, {
        correctAnswer: answerId,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [IQuestion], { name: 'questions' })
  findAll() {
    return this.questionService.findAll();
  }

  @Query(() => IQuestion, { name: 'question' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.questionService.findOne(id);
  }

  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    try {
      return this.questionService.update(
        updateQuestionInput.id,
        updateQuestionInput,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  updateAnswer(
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
  ) {
    try {
      return this.answerService.update(updateAnswerInput.id, updateAnswerInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  removeQuestion(@Args('id', { type: () => String }) id: string) {
    return this.questionService.remove(id);
  }
}
