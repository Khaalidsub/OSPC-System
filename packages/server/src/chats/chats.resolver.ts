import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  ResolveProperty,
  Root,
  Parent,
  Context,
  Subscription,
} from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { User } from 'users/entities/user.entity';
import { UsersService } from 'users/users.service';
import { PubSub } from 'apollo-server-express';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Chat)
  async createChat(
    @Args('createChatInput') createChatInput: CreateChatInput,
    @Context('pubSub') pubSub: PubSub,
  ) {
    try {
      const chat = await this.chatsService.create(createChatInput);
      pubSub.publish('onChatCreate', {
        onChatCreate: chat,
      });
      return chat;
    } catch (error) {
      throw new Error(error.message);
    }
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
  @Subscription(() => Chat)
  onChatCreate(@Context('pubSub') pubSub: PubSub) {
    return pubSub.asyncIterator('onChatCreate');
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
