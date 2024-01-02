import 'dotenv/config';

interface IMailConfig {
  driver: 'ethereal' | 'ses';

  mailTemplate: 'handlebars';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_PROVIDER || 'ethereal',

  mailTemplate: process.env.MAIL_TEMPLATE_PROVIDER || 'handlebars',

  defaults: {
    from: {
      name: process.env.MAIL_DEFAULT_NAME_FROM || '',
      email: process.env.MAIL_DEFAULT_EMAIL_FROM || '',
    },
  },
} as IMailConfig;
