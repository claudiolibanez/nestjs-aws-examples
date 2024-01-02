interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseTemplateDto {
  file: string;
  variables: ITemplateVariables;
}
