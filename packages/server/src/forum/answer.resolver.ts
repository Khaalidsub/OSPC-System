import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
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
import { Answer, AnswerDocument } from './entities/answer.entity';
import { SentryInterceptor } from '../Sentry';
import { QuestionService } from './forum.service';
import { UsersService } from 'users/users.service';
@UseInterceptors(SentryInterceptor)
@Resolver(() => Answer)
export class AnswersResolver {
  constructor(
    private readonly answerService: AnswerService,
    private readonly questionService: QuestionService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Answer)
  @UseGuards(GqlAuthGuard)
  async answerQuestion(
    @CurrentUser() user: User,
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
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
      const answer = await this.answerService.findById(id);
      const completeQuestion = await this.question(answer);
      await this.validateApprovedByQuestionMaker(user, completeQuestion.user);
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
  findByQuestion(@Args('id', { type: () => String }) id: string) {
    return this.answerService.findByQuery({ question: id });
  }

  // @Query(() => [Answer], { name: 'answers' })
  // findAll() {
  //   return this.answerService.findAll();
  // }

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
      const answer = await this.answerService.findById(id);
      const completeQuestion = await this.question(answer);
      await this.validateApprovedByQuestionMaker(user, completeQuestion.user);
      return this.answerService.update(id, updateAnswerInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  async question(@Parent() answer: AnswerDocument): Promise<any> {
    const result = await answer.populate('question').execPopulate();
    return result.question;
  }

  @ResolveField()
  async user(@Parent() answer: AnswerDocument) {
    const result = await answer.populate('user').execPopulate();
    return result.user;
  }
}
