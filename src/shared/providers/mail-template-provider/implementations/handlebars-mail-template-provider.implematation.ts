import * as fs from 'node:fs';
import handlebars from 'handlebars';

import { IParseTemplateDto } from 'src/shared/providers/mail-template-provider/dtos/parse-template.dto';

import { IMailTemplateProvider } from 'src/shared/providers/mail-template-provider/models/mail-template-provider.model';

export class HandlebarsMailTemplateProviderImpl
  implements IMailTemplateProvider
{
  public async parse({ file, variables }: IParseTemplateDto): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
