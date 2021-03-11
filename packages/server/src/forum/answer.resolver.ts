import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';
import { CurrentUser, GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import {
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { CreateAnswerInput } from './dto/create-answer.input';
import { Answer } from './entities/answer.entity';
import { SentryInterceptor } from '../Sentry';
@UseInterceptors(SentryInterceptor)
@Resolver(() => Answer)
export class AnswersResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => Answer)
  @UseGuards(GqlAuthGuard)
  async answerQuestion(
    @CurrentUser() user: User,
    @Args('updateAnswerInput') createAnswerInput: CreateAnswerInput,
  ) {
    try {
      const createAnswer = await this.answerService.create({
        ...createAnswerInput,
        user: user,
      } as any);

      return createAnswer.execPopulate();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Mutation(() => Answer)
  @UseGuards(GqlAuthGuard)
  async voteAnswer(
    @CurrentUser() user: User,
    @Args('vote') vote: boolean,
    @Args('answer') answerId: string,
  ) {
    try {
      return this.answerService.update(answerId, {
        $inc: { votes: vote ? +1 : -1 },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Answer)
  @UseGuards(GqlAuthGuard)
  async approveAnswer(@CurrentUser() user: User, @Args('id') id: string) {
    try {
      const { question } = await this.answerService.findById(id);
      await this.validateApprovedByQuestionMaker(user, question.user.id);
      return this.answerService.update(id, {
        isApproved: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async validateApprovedByQuestionMaker(user: User, questionId: string) {
    if (questionId !== user.id) {
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Query(() => [Answer], { name: 'answers' })
  findAll() {
    return this.answerService.findAll();
  }

  @Query(() => Answer, { name: 'answer' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.answerService.findById(id);
  }

  @Mutation(() => Answer)
  @UseGuards(GqlAuthGuard)
  async updateAnswer(
    @CurrentUser() user: User,
    @Args('id') id: string,
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
  ) {
    try {
      const { question } = await this.answerService.findById(id);

      await this.validateApprovedByQuestionMaker(user, question.user.id);
      return this.answerService.update(id, updateAnswerInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
