import { IParseTemplateDto } from 'src/shared/providers/mail-template-provider/dtos/parse-template.dto';

export interface IMailTemplateProvider {
  parse(data: IParseTemplateDto): Promise<string>;
}
