import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { UsersService } from 'users/users.service';
import { ChatsService } from './chats.service';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly MessagesService: MessagesService,
    private readonly usersService: UsersService,
    private readonly chatService: ChatsService,
  ) {}

  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.MessagesService.create(createMessageInput);
  }

  @Query(() => [Message], { name: 'messages' })
  findAll() {
    return this.MessagesService.findAll();
  }

  @Query(() => Message, { name: 'message' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.MessagesService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args('id') id: string,
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.MessagesService.update(id, updateMessageInput);
  }

  @Mutation(() => Message)
  removeMessage(@Args('id', { type: () => String }) id: string) {
    return this.MessagesService.remove(id);
  }

  @ResolveField()
  chat(@Parent() message: Message) {
    return this.chatService.findById(message.chat as string);
  }

  @ResolveField()
  sender(@Parent() message: Message) {
    return this.usersService.findById(message.sender as string);
  }
}
