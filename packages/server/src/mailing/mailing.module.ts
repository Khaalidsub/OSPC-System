import {
  Module,
} from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { MailingConsumer } from './mailing.event';
@Module({
  providers: [
    MailingConsumer,
    {
      provide: 'MailingService',
      useClass: MailService,
    },
  ],
})
export class MailingModule  {

}
