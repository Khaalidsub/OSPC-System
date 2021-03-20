import { CreateChatInput } from './create-chat.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Chat } from '../entities/chat.entity';

@InputType()
export class UpdateChatInput extends PartialType(Chat, InputType) {}
