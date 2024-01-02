import * as nodemailer from 'nodemailer';
import { InternalServerErrorException } from '@nestjs/common';

import { ISendMailDto } from 'src/shared/providers/mail-provider/dtos/send-mail.dto';

import { IMailProvider } from 'src/shared/providers/mail-provider/models/mail-provider.model';

import { IMailTemplateProvider } from 'src/shared/providers/mail-template-provider/models/mail-template-provider.model';

export class EtherealMailProvider implements IMailProvider {
  private client?: nodemailer.Transporter;

  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    nodemailer.createTestAccount((error, account) => {
      if (error) {
        throw new InternalServerErrorException(error.message);
      }

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDto): Promise<void> {
    const template = await this.mailTemplateProvider.parse(templateData);

    const message = await this.client!.sendMail({
      from: {
        name: from.name,
        address: from.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: template,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
