import { Process, Processor } from "@nestjs/bull";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Job } from "bull";
import { ChatsService } from "./chats.service";

@Processor('chatStatus')
export class ChatStatusConsumer{
    constructor(private eventEmitter: EventEmitter2,private chatService:ChatsService){}
    @Process()
    async updateChatStatus(job:Job<{chatId:string,status:boolean}>){
        try {
            console.log('processing data',job.data);
            const {chatId,status} = job.data
            const chat = await this.chatService.update(chatId,{isOpen: status});
       if (status) {
           this.eventEmitter.emit('chat.isOpened',chat)
       }
        } catch (error) {
            console.log(error);
            
        }
    }
}