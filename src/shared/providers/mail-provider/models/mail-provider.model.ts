import { ISendMailDto } from 'src/shared/providers/mail-provider/dtos/send-mail.dto';

export interface IMailProvider {
  sendMail(data: ISendMailDto): Promise<void>;
}
