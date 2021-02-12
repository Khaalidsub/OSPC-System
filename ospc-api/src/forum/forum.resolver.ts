import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ForumService } from './forum.service';
import { CreateQuestionInput } from './dto/create-forum.input';
import { UpdateQuestionInput } from './dto/update-forum.input';
import { IQuestion } from './types';

@Resolver(() => IQuestion)
export class ForumResolver {
  constructor(private readonly forumService: ForumService) {}

  @Mutation(() => IQuestion)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.forumService.create(createQuestionInput);
  }

  @Query(() => [IQuestion], { name: 'forum' })
  findAll() {
    return this.forumService.findAll();
  }

  @Query(() => IQuestion, { name: 'forum' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.forumService.findOne(id);
  }

  @Mutation(() => IQuestion)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.forumService.update(
      updateQuestionInput.id,
      updateQuestionInput,
    );
  }

  @Mutation(() => IQuestion)
  removeQuestion(@Args('id', { type: () => String }) id: string) {
    return this.forumService.remove(id);
  }
}
