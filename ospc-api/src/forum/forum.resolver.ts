import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './forum.service';
import { CreateQuestionInput } from './dto/create-forum.input';
import { UpdateQuestionInput } from './dto/update-forum.input';
import { IQuestion } from './types';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser, GqlAuthGuard } from 'src/auth/guards/graph-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => IQuestion)
export class ForumResolver {
  constructor(private readonly questionService: QuestionService) {}

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
  answerQuestion(
    @CurrentUser() user: User,
    @Args('updateQuestionInput') UpdateQuestionInput: UpdateQuestionInput,
  ) {
    try {
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  voteAnswer() {}
  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  approveAnswer() {}

  @Query(() => [IQuestion], { name: 'forum' })
  findAll() {
    return this.questionService.findAll();
  }

  @Query(() => IQuestion, { name: 'forum' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.questionService.findOne(id);
  }

  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionService.update(
      updateQuestionInput.id,
      updateQuestionInput,
    );
  }

  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  updateAnswer() {}

  @Mutation(() => IQuestion)
  @UseGuards(GqlAuthGuard)
  removeQuestion(@Args('id', { type: () => String }) id: string) {
    return this.questionService.remove(id);
  }
}
