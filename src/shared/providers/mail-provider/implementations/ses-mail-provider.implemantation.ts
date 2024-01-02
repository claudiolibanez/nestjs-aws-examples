import * as nodemailer from 'nodemailer';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as aws from '@aws-sdk/client-ses';

import { Env } from 'src/config/env';

import { ISendMailDto } from 'src/shared/providers/mail-provider/dtos/send-mail.dto';

import { IMailProvider } from 'src/shared/providers/mail-provider/models/mail-provider.model';

import { IMailTemplateProvider } from 'src/shared/providers/mail-template-provider/models/mail-template-provider.model';

export class SESMailProviderImpl implements IMailProvider {
  private readonly client: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService<Env, true>,
    private readonly mailTemplateProvider: IMailTemplateProvider,
  ) {
    const ses = new aws.SESClient({
      region: this.configService.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.client = nodemailer.createTransport({
      SES: { ses, aws },
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

      await this.client.sendMail({
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
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
