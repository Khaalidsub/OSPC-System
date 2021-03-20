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
import { Lesson } from 'coach/entities/lesson.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
    private scheduleRegistry: SchedulerRegistry,
    private eventEmitter: EventEmitter2,
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
  @OnEvent('chat.opened')
  async handleChatOpened(payload: Chat) {
    try {
      // cron job to close the chat
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @OnEvent('lesson.booked')
  async handleLessonBooked(payload: Lesson) {
    try {
      //check if there is a chat
      const [result] = await this.chatsService.findChatByUsers([
        payload.coach,
        payload.student,
      ]);
      //create if it does not
      if (result) {
        await this.chatsService.create({
          chat_time: payload.time_start,
          users: [payload.coach, payload.student],
        });
      }
      //update if does exist
      await this.chatsService.update(result.id, {
        ...result,
        chat_time: payload.date,
        duration: 1,
      });
      // cron job when to open and update chat
      //! Probably will not work
      //! code felt cute, might delete itself later
      const callback = async () => {
        console.log('this chat has been called', result.id);

        const chat = await this.chatsService.update(result.id, {
          isOpen: true,
        });
        this.eventEmitter.emit('chat.opened', chat);
      };

      const interval = setInterval(callback, payload.date);
      this.scheduleRegistry.addInterval(payload.id, interval);
      console.log('interval has been updated');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
