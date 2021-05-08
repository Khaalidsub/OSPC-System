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
import { Chat, ChatDocument } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { User } from 'users/entities/user.entity';
import { UsersService } from 'users/users.service';
import { PubSub } from 'apollo-server-express';
import { LessonDocument } from 'coach/entities/lesson.entity';
import { OnEvent } from '@nestjs/event-emitter';

import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Logger } from '@nestjs/common';
import { CurrentUser } from 'auth/guards/graph-auth.guard';

@Resolver(() => Chat)
export class ChatsResolver {
  private readonly logger = new Logger(ChatsResolver.name);
  constructor(
    private readonly chatsService: ChatsService,

    @InjectQueue('chatStatus') private chatStatusQueue: Queue,
  ) {}

  @Mutation(() => Chat)
  async createChat(
    @Args('createChatInput') createChatInput: CreateChatInput,
    @Context('pubSub') pubSub: PubSub,
  ) {
    try {
      const chat = await this.chatsService.create(createChatInput);
      chat.users.forEach(user => {
        pubSub.publish(`onChatCreate:${user}`, {
          onChatCreate: chat,
        });
      })

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
  onChatCreate(@CurrentUser() user: User, @Context('pubSub') pubSub: PubSub) {
    return pubSub.asyncIterator(`onChatCreate:${user.id}`);
  }

  @Mutation(() => Chat)
  removeChat(@Args('id', { type: () => String }) id: string) {
    return this.chatsService.remove(id);
  }
  @ResolveField('users', () => [User])
  async getUsers(@Parent() chatDocument: ChatDocument) {
    
    const chat = await chatDocument.populate('users').execPopulate()
    
    return chat.users;
  }

  @OnEvent('lesson.booked')
  async handleLessonBooked(payload: LessonDocument) {
    try {
      this.logger.log(`Chat is being Updated on lesson ${payload.id}....`);

      let [result] = await this.chatsService.findChatByUsers([
        payload.coach,
        payload.student,
      ]);

      if (!result) {
        result = await this.chatsService.create({
          users: [payload.coach, payload.student],
        });
      } else {
        //update if does exist
        await this.chatsService.update(result.id, {
          ...result,
        });
      }
      this.chatStatusQueue.add(
        {
          chatId: result.id,
          status: true,
        },
        
        { delay: payload.date - Date.now() ,attempts:5,removeOnComplete:true },
      );
    } catch (error) {
      this.logger.error(error.message);

      throw new Error(error.message);
    }
  }

  @OnEvent('chat.isOpened')
  async handleChatOpened(payload: ChatDocument) {
    try {
      this.logger.log(`Chat with the id ${payload.id} has been opened`);
      this.chatStatusQueue.add(
        {
          chatId: payload.id,
          status: false,
        },
        { delay: 60 * 60 * 1000 ,attempts:5,removeOnComplete:true },
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(error.message);
    }
  }
}
