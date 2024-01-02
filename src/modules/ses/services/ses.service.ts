import { ConfigService } from '@nestjs/config';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

import { Env } from 'src/config/env';

import { ISendMailDto } from 'src/shared/providers/mail-provider/dtos/send-mail.dto';

import { MailTemplateProviderToken } from 'src/shared/providers/mail-template-provider/mail-template-provider';

import { IMailTemplateProvider } from 'src/shared/providers/mail-template-provider/models/mail-template-provider.model';

@Injectable()
export class SESService {
  private readonly region: string;
  private readonly ses: SESClient;

  constructor(
    private readonly configService: ConfigService<Env, true>,
    @Inject(MailTemplateProviderToken)
    private readonly mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.region = this.configService.getOrThrow('AWS_REGION');
    this.ses = new SESClient({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDto): Promise<void> {
    try {
      const template = await this.mailTemplateProvider.parse(templateData);

      const createSendEmailCommand = new SendEmailCommand({
        Destination: {
          ToAddresses: [to.email],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: template,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
        Source: from.email,
      });

      await this.ses.send(createSendEmailCommand);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
