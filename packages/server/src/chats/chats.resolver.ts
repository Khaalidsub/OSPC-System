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
import { Lesson, LessonDocument } from 'coach/entities/lesson.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
    private scheduleRegistry: SchedulerRegistry,
    private eventEmitter: EventEmitter2,
    @InjectQueue('chatStatus') private chatStatusQueue: Queue
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

  @OnEvent('lesson.booked')
  async handleLessonBooked(payload: LessonDocument) {
    try {
      console.log('lesson booked', payload);

      //check if there is a chat
      let [result] = await this.chatsService.findChatByUsers([
        payload.coach,
        payload.student,
      ]);
      console.log('result', result);

      //create if it does not
      if (!result) {
        result = await this.chatsService.create({
          chat_time: payload.time_start, // not needed anymore
          users: [payload.coach, payload.student],
        });
      } else {
        //update if does exist
        await this.chatsService.update(result.id, {
          ...result,
          chat_time: payload.date,
          duration: 1,
        });
      }
      // cron job when to open and update chat
      //! Probably will not work
      //! code felt cute, might delete itself later
      // const callback = async () => {
      //   console.log('this chat has been called', result.id);

      //   const chat = await this.chatsService.update(result.id, {
      //     isOpen: true,
      //   });
      //   this.eventEmitter.emit('chat.opened', chat);
      // };

      // const interval = setTimeout(callback, payload.date);
      // this.scheduleRegistry.addTimeout(payload._id, interval);
      this.chatStatusQueue.add(
      {
      chatId: result.id,
      status:true,

      },{delay:payload.date})
      console.log('interval has been updated');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @OnEvent('chat.isOpened')
  async handleChatOpened(payload:ChatDocument){
    try {
      console.log('Chat is opened');
      this.chatStatusQueue.add(
        {
        chatId: payload.id,
        status:false,
  
        },{delay:60*60*1000})
    } catch (error) {
      console.log(error);
      
    }
  }
}
