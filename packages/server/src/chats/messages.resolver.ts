import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Subscription,
  Context,
} from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message, MessageDocument } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { PubSub } from 'apollo-server-express';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private readonly MessagesService: MessagesService,


  ) {}

  @Mutation(() => Message)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @Context('pubSub') pubSub: PubSub,
  ) {
    try {
      const message = await this.MessagesService.create(createMessageInput);
      pubSub.publish(`onMessageSent:${message.chat}`, { onMessageSent: message });
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [Message], {  })
  findAll() {
    return this.MessagesService.findAll();
  }
  @Query(() => [Message], { name: 'messages' })
  chatMessages(@Args('id') id: string){
    return this.MessagesService.findByQuery({chat:id})
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
  @Subscription(() => Message)
  onMessageSent(@Args('id', { type: () => String}) chatId: string,@Context('pubSub') pubSub: PubSub) {
    return pubSub.asyncIterator(`onMessageSent:${chatId}`);
  }

  @ResolveField()
  async chat(@Parent() messageDocument: MessageDocument) {
    const message = await messageDocument.populate('chat').execPopulate()
    return message.chat
  }

  @ResolveField()
  async sender(@Parent() messageDocument: MessageDocument) {
    const message = await messageDocument.populate('sender').execPopulate()
    return message.sender
  }
}
