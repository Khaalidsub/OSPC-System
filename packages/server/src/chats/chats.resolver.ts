import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  ResolveProperty,
  Root,
  Parent,
} from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { User } from 'users/entities/user.entity';
import { UsersService } from 'users/users.service';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Chat)
  createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    return this.chatsService.create(createChatInput);
  }

  @Query(() => [Chat], { name: 'chats' })
  findAll() {
    return this.chatsService.findAll();
  }

  @Query(() => Chat, { name: 'chat' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.chatsService.findOne(id);
  }

  @Mutation(() => Chat)
  updateChat(@Args('updateChatInput') updateChatInput: UpdateChatInput) {
    return this.chatsService.update(updateChatInput.id, updateChatInput);
  }

  @Mutation(() => Chat)
  removeChat(@Args('id', { type: () => String }) id: string) {
    return this.chatsService.remove(id);
  }
  @ResolveField('users', () => [User])
  async getUsers(@Parent() chat: Chat) {
    return this.usersService.findByIds(chat.users as string[]);
  }
}
