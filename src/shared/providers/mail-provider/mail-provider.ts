import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import mainConfig from 'src/config/mail';

import { IMailProvider } from 'src/shared/providers/mail-provider/models/mail-provider.model';

import { SESMailProviderImpl } from 'src/shared/providers/mail-provider/implementations/ses-mail-provider.implemantation';
import { EtherealMailProvider } from 'src/shared/providers/mail-provider/implementations/ethereal-mail-provider.implementation';

import { MailTemplateProviderToken } from 'src/shared/providers/mail-template-provider/mail-template-provider';

import { IMailTemplateProvider } from 'src/shared/providers/mail-template-provider/models/mail-template-provider.model';

const mailProviderDataSource = {
  ethereal: 'ethereal',
  ses: 'ses',
};

export const MailProviderToken = 'MailProvider';

@Injectable()
export class MailProvider {
  constructor(
    public readonly configService: ConfigService,
    @Inject(MailTemplateProviderToken)
    public readonly mailTemplateProvider: IMailTemplateProvider,
  ) {}
}

export const provideMailFactory = (mailProvider: MailProvider) => {
  switch (mainConfig.driver) {
    case mailProviderDataSource.ethereal:
      return new EtherealMailProvider(mailProvider.mailTemplateProvider);
    case mailProviderDataSource.ses:
      return new SESMailProviderImpl(
        mailProvider.configService,
        mailProvider.mailTemplateProvider,
      );
    default:
      return new EtherealMailProvider(mailProvider.mailTemplateProvider);
  }
};

export const mailProvider = [
  {
    provide: MailProviderToken,
    useFactory: (mailProvider: MailProvider): IMailProvider =>
      provideMailFactory(mailProvider),
    inject: [MailProvider],
  },
  MailProvider,
];
