import { Inject, Injectable } from '@nestjs/common';
// import { VerificationChannel } from '@ospc/common';

import { Twilio } from 'twilio';
import { VerificationChannel } from './types';

@Injectable()
export class TwilioService {
  constructor(@Inject('TwilioClient') private client: Twilio) {}

  requestCode(
    to: string,
    verificationChannel: VerificationChannel = VerificationChannel.sms,
  ) {
    return this.client.verify
      .services(process.env.TWILIO_SERVICE)
      .verifications.create({ to, channel: verificationChannel });
  }
  verifyCode(code: string, to: string) {
    return this.client.verify
      .services(process.env.TWILIO_SERVICE)
      .verificationChecks.create({ to, code: code });
  }
}