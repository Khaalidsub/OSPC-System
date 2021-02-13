import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuestionService } from './forum.service';
import { CreateQuestionInput } from './dto/create-forum.input';
import { UpdateQuestionInput } from './dto/update-forum.input';
import { User } from '../users/entities/user.entity';
import { CurrentUser, GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Question } from './entities/forum.entity';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly questionService: QuestionService) {}

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

  @Query(() => [Question], { name: 'questions' })
  findAll() {
    return this.questionService.findAll();
  }

  @Query(() => Question, { name: 'question' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.questionService.findById(id);
  }

  @Mutation(() => Question)
  @UseGuards(GqlAuthGuard)
  async updateQuestion(
    @CurrentUser() user: User,
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    try {
      const question = await this.questionService.findById(
        updateQuestionInput.id,
      );

      await this.validateApprovedByQuestionMaker(user, question.user.id);
      return await this.questionService.update(
        updateQuestionInput.id,
        updateQuestionInput,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => Question)
  @UseGuards(GqlAuthGuard)
  removeQuestion(@Args('id', { type: () => String }) id: string) {
    return this.questionService.remove(id);
  }
}
