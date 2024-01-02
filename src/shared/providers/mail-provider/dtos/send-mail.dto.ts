import { IParseTemplateDto } from 'src/shared/providers/mail-template-provider/dtos/parse-template.dto';

interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMailDto {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseTemplateDto;
}
