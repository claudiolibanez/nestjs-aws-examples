import { Controller, Post } from '@nestjs/common';

import { MailService } from 'src/modules/mail/services/mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  public async sendEmail() {
    await this.mailService.sendEmail();
  }
}
