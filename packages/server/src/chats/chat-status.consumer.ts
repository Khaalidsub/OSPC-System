import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Job } from "bull";
import { ChatsService } from "./chats.service";

@Processor('chatStatus')
export class ChatStatusConsumer{
    private readonly logger = new Logger(ChatStatusConsumer.name);
    constructor(private eventEmitter: EventEmitter2,private chatService:ChatsService){}
    @Process()
    async updateChatStatus(job:Job<{chatId:string,status:boolean}>){
        try {
            console.log('processing data',job.data);
            this.logger.log('Processing data...')
            const {chatId,status} = job.data
            const chat = await this.chatService.update(chatId,{isOpen: status});
            this.logger.log(`Chat with the id of ${chat.id} has been updated`)
       if (status) {
           this.eventEmitter.emit('chat.isOpened',chat)
       }else{
           this.eventEmitter.emit('chat.isCloded',chat)
       }
        } catch (error) {
            console.log(error);
            
        }
    }
}