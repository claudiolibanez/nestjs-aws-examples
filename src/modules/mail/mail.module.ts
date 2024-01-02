import { Module } from '@nestjs/common';

import { mailTemplateProvider } from 'src/shared/providers/mail-template-provider/mail-template-provider';

import { MailController } from 'src/modules/mail/controllers/mail.controller';

import { MailService } from 'src/modules/mail/services/mail.service';

import { mailProvider } from 'src/shared/providers/mail-provider/mail-provider';

@Module({
  imports: [],
  providers: [MailService, ...mailProvider, mailTemplateProvider],
  controllers: [MailController],
})
export class MailModule {}
