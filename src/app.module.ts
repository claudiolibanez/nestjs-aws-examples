import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from 'src/config/env';

import { MailModule } from 'src/modules/mail/mail.module';
// import { SESModule } from 'src/modules/ses/ses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),

    // Mail Module
    MailModule,

    // AWS Modules
    // SESModule,
  ],
})
export class AppModule {}
