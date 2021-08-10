import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { MailService } from '@sendgrid/mail';
import { UserDocument } from 'users/entities/user.entity';
const sgMail = require('@sendgrid/mail');
@Injectable()
export class MailingConsumer implements OnApplicationBootstrap {
  private readonly logger = new Logger(MailingConsumer.name);
  constructor(@Inject('MailingService') private mailingService: MailService) {}

    onApplicationBootstrap() {
        this.logger.log('Mailing Consumer is ready');
        this.logger.log(`${process.env.SENDGRID_API_KEY}`)
        this.mailingService.setApiKey(process.env.SENDGRID_API_KEY);
  }

  @OnEvent('coach.created')
  async onCreateCoach({ email, name }: UserDocument) {
      // update to use try catch

    this.mailingService.send({
      from: 'khaalidsubaan@gmail.com',
      to: email,
      subject: 'Pending Coach Application',
      text: `Hello ${name}, Thank you for your application. We are looking into your coach application`,
      html:
        `<p>Hello ${name}, Thank you for your application.</p><p>We are looking into your coach application</p>`,
    });
    this.logger.log(`Email Sent : ${email}`)
  }
  @OnEvent('coach.approved')
  async onApproveCoach({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'khaalidsubaan@gmail.com',
      to: email,
      subject: 'Coach Application Status',
      text: `Hello ${name}, Thank you for your application. We are looking into your coach application`,
      html:
        `<p>Hello ${name}, Thank you for your application.</p><p>We are looking into your coach application</p>`,
    });
    this.logger.log(`Email Sent : ${email}`)

  }
  @OnEvent('coach.rejected')
  async onRejectCoach({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'khaalidsubaan@gmail.com',
      to: email,
      subject: 'Coach Application Status',
      text: `Hello ${name}, Thank you for your application.We are sorry to say that your application has been rejected`,
      html:
        `<p>Hello ${name}, Thank you for your application.</p><p>We are sorry to say that your application has been rejected</p>`,
    });
    this.logger.log(`Email Sent : ${email}`)

  }

  @OnEvent('user.created')
  async onCreateUser({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'khaalidsubaan@gmail.com',
      to: email,
      subject: 'Pending Student Application',
      text: `Hello ${name}, Thank you for your application. We are looking into your application and will get back to you `,
      html:
        `<p>Hello ${name}, Thank you for your application.</p><p> We are looking into your application and will get back to you</p>`,
    });
    this.logger.log(`Email Sent : ${email}`)

  }

  @OnEvent('user.rejected')
  async onRejectUser({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'khaalidsubaan@gmail.com',
      to: email,
      subject: 'Student Application Status',
      text: `Hello ${name}, Thank you for your application. We are sorry to say that your application has been rejected`,
      html:
        `<p>Hello ${name}, Thank you for your application.</p><p>We are sorry to say that your application has been rejected</p>`,
    });
    this.logger.log(`Email Sent : ${email}`)

  }

  @OnEvent('user.approved')
  async onApproveUser({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'khaalidsubaan@gmail.com',
      to: email,
      subject: 'Student Application Status',
      text: `Hello ${name}, Thank you for your application. We are  happily to say, we approved your application`,
      html:
        `<p>Hello ${name}, Thank you for your application.</p><p>We are happily to say , we approved your application</p>`,
    });
    this.logger.log(`Email Sent : ${email}`)

  }
}
