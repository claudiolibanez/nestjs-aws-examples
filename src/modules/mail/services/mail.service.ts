import * as path from 'node:path';
import { Inject, Injectable } from '@nestjs/common';

import mailConfig from 'src/config/mail';

import { MailProviderToken } from 'src/shared/providers/mail-provider/mail-provider';

import { IMailProvider } from 'src/shared/providers/mail-provider/models/mail-provider.model';

@Injectable()
export class MailService {
  constructor(
    @Inject(MailProviderToken)
    private readonly mailProvider: IMailProvider,
  ) {}

  public async sendEmail() {
    const template = path.resolve(__dirname, '..', 'views', 'email_test.hbs');

    const from = {
      name: mailConfig.defaults.from.name,
      email: mailConfig.defaults.from.email,
    };

    const to = {
      name: 'Claudio Libanez',
      email: 'claudiolibanez@gmail.com',
    };

    await this.mailProvider.sendMail({
      from: {
        name: from.name,
        email: from.email,
      },
      to: {
        name: to.name,
        email: to.email,
      },
      subject: 'Development - Send Email Test',
      templateData: {
        file: template,
        variables: {
          name: to.name,
        },
      },
    });
  }
}
