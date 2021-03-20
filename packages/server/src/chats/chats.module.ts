import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsResolver } from './chats.resolver';
import { Chat, ChatSchema } from './entities/chat.entity';
import { MessageSchema, Message } from './entities/message.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { UsersModule } from 'users/users.module';
import { UsersService } from 'users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    UsersModule,
  ],
  providers: [ChatsResolver, ChatsService, MessagesResolver, MessagesService],
})
export class ChatsModule {}
