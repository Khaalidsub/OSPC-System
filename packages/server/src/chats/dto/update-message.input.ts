import { InputType, PartialType } from '@nestjs/graphql';
import { Message } from '../entities/message.entity';

@InputType()
export class UpdateMessageInput extends PartialType(Message, InputType) {}
