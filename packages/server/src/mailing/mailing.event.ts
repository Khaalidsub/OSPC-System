import { Inject, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { MailService } from '@sendgrid/mail';
import { UserDocument } from 'users/entities/user.entity';
const sgMail = require('@sendgrid/mail');

export class MailingConsumer implements OnModuleInit {
  private readonly logger = new Logger(MailingConsumer.name);
  constructor(@Inject('MailingService') private mailingService: MailService) {}
  onModuleInit() {
    this.mailingService.setApiKey(process.env.SENDGRID_API_KEY);
  }

  @OnEvent('coach.created')
  async onCreateCoach({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'sbkhaalid2@graduate.utm.my',
      to: email,
      subject: 'Pending Coach Application',
      text: `Hello ${name}, Thank you for your application. We are looking into your coach appliction`,
      html:
        '<p>Hello ${name}, Thank you for your application.</p><p>We are looking into your coach appliction</p>',
    });
  }
  @OnEvent('coach.approved')
  async onApproveCoach({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'sbkhaalid2@graduate.utm.my',
      to: email,
      subject: 'Coach Application Status',
      text: `Hello ${name}, Thank you for your application. We are looking into your coach appliction`,
      html:
        '<p>Hello ${name}, Thank you for your application.</p><p>We are looking into your coach appliction</p>',
    });
  }
  @OnEvent('coach.rejected')
  async onRejectCoach({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'sbkhaalid2@graduate.utm.my',
      to: email,
      subject: 'Coach Application Status',
      text: `Hello ${name}, Thank you for your application. We are looking into your coach appliction`,
      html:
        '<p>Hello ${name}, Thank you for your application.</p><p>We are looking into your coach appliction</p>',
    });
  }

  @OnEvent('user.created')
  async onCreateUser({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'sbkhaalid2@graduate.utm.my',
      to: email,
      subject: 'Pending Student Application',
      text: `Hello ${name}, Thank you for your application. We are sorry to say that your application has been rejected`,
      html:
        '<p>Hello ${name}, Thank you for your application.</p><p>We are sorry to say that your application has been rejected</p>',
    });
  }

  @OnEvent('user.rejected')
  async onRejectUser({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'sbkhaalid2@graduate.utm.my',
      to: email,
      subject: 'Student Application Status',
      text: `Hello ${name}, Thank you for your application. We are sorry to say that your application has been rejected`,
      html:
        '<p>Hello ${name}, Thank you for your application.</p><p>We are sorry to say that your application has been rejected</p>',
    });
  }

  @OnEvent('user.approved')
  async onApproveUser({ email, name }: UserDocument) {
    this.mailingService.send({
      from: 'sbkhaalid2@graduate.utm.my',
      to: email,
      subject: 'Student Application Status',
      text: `Hello ${name}, Thank you for your application. We are  happily to say, we approved your application`,
      html:
        '<p>Hello ${name}, Thank you for your application.</p><p>We have happily to say , we approved your application</p>',
    });
  }
}
