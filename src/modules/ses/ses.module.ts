import { Module } from '@nestjs/common';

import { mailTemplateProvider } from 'src/shared/providers/mail-template-provider/mail-template-provider';

import { SESService } from 'src/modules/ses/services/ses.service';

@Module({
  providers: [SESService, mailTemplateProvider],
  exports: [SESService],
})
export class SESModule {}
