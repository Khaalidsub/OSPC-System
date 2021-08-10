import {
  Module,
} from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
@Module({
  providers: [
    {
      provide: 'MailingService',
      useClass: MailService,
    },
  ],
})
export class MailingModule  {

}
