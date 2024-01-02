import { HandlebarsMailTemplateProviderImpl } from 'src/shared/providers/mail-template-provider/implementations/handlebars-mail-template-provider.implematation';
import { IMailTemplateProvider } from 'src/shared/providers/mail-template-provider/models/mail-template-provider.model';

import mainConfig from 'src/config/mail';

const mailTemplateDataSource = {
  handlebars: 'handlebars',
};

export const MailTemplateProviderToken = 'MailTemplateProvider';

export function provideMailTemplateFactory() {
  switch (mainConfig.mailTemplate) {
    case mailTemplateDataSource.handlebars:
      return new HandlebarsMailTemplateProviderImpl();
  }
}

export const mailTemplateProvider = {
  provide: MailTemplateProviderToken,
  useFactory: (): IMailTemplateProvider => provideMailTemplateFactory(),
};
