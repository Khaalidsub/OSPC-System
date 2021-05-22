import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { QuestionService } from './forum.service';
import { CreateQuestionInput } from './dto/create-forum.input';
import { UpdateQuestionInput } from './dto/update-forum.input';
import { User } from 'users/entities/user.entity';
import { CurrentUser, GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import {
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Question, QuestionDocument } from './entities/forum.entity';
import { SentryInterceptor } from '../Sentry';
import { UsersService } from 'users/users.service';
import { AnswerService } from './answer.service';
import { QuestionArgs, QuestionConnection } from 'types';
@UseInterceptors(SentryInterceptor)
@Resolver(() => Question)
export class QuestionsResolver {
  constructor(
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Question)
  @UseGuards(GqlAuthGuard)
  async makeQuestion(
    @CurrentUser() user: User,
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    try {
      const createdQuestion = await this.questionService.create({
        ...createQuestionInput,
        user: user.id,
      } as any);
      return createdQuestion.execPopulate();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async validateApprovedByQuestionMaker(user: User, questionId: string) {
    if (questionId !== user.id) {
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Query(() => QuestionConnection, { name: 'questions' })
  findAll(@Args({type:()=>QuestionArgs}) questionArgs:QuestionArgs) {
    // console.log(questionArgs);
     
    return this.questionService.findAll(questionArgs)
  }

  @Query(() => Question, { name: 'question' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.questionService.findById(id);
  }

  @Mutation(() => Question)
  @UseGuards(GqlAuthGuard)
  async updateQuestion(
    @CurrentUser() user: User,
    @Args('id') id: string,
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    try {
      const question = await this.questionService.findById(id);

      await this.validateApprovedByQuestionMaker(user, question.user);
      return await this.questionService.update(id, updateQuestionInput);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Question)
  @UseGuards(GqlAuthGuard)
  removeQuestion(@Args('id', { type: () => String }) id: string) {
    return this.questionService.remove(id);
  }
  @ResolveField()
  async user(@Parent() question: QuestionDocument) {
    const result = await question.populate('user').execPopulate();
    return result.user;
  }
  @ResolveField()
  async subject(@Parent() question: QuestionDocument) {
    const result = await question.populate('subject').execPopulate();
    return result.subject;
  }

  @ResolveField(() => Number, { defaultValue: 0, nullable: true })
  async answers(@Parent() question: QuestionDocument) {
    const [result] = await this.answerService.countAnswers(question.id);
    // console.log(result);

    return result?.answers || 0;
  }
}
