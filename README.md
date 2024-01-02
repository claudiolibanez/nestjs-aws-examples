# NestJS - Send Email

### Passo 1: Acesso ao Console da AWS

1. Acesse o [Console da AWS](https://aws.amazon.com/pt/).
2. Faça login na sua conta da AWS.

### Passo 2: Navegar até o IAM Console

1. No Console da AWS, vá para o serviço "IAM" clicando no ícone "Services" e digitando "IAM" na barra de pesquisa.
2. Clique em "IAM" para acessar o console do IAM.

### Passo 3: Criar um Grupo de Usuários

1. No painel de navegação à esquerda, clique em "Groups" e, em seguida, clique em "Create group".
2. Dê um nome para o grupo, por exemplo, "SESGroup".
3. Pesquise e adicione a política "AmazonSESFullAccess" ao grupo para conceder acesso total ao serviço SES.
4. Clique em "Create group".

### Passo 4: Criar um Usuário

1. No painel de navegação à esquerda, clique em "Users" e depois em "Add user".
2. Insira um nome de usuário, marque a opção "Programmatic access" e clique em "Next: Permissions".
3. Adicione o usuário ao grupo criado no Passo 3 e clique em "Next: Tags" e, em seguida, em "Next: Review".
4. Revise as configurações e clique em "Create user".

<!-- ### Passo 5: Copiar Credenciais de Acesso -->

<!-- 1. Após a criação do usuário, você verá uma página de confirmação. Clique em "Show" ao lado de "Secret access key" e anote as credenciais de acesso. -->

<!-- ### Passo 6: Configurar as Credenciais Locais (Opcional) -->

<!-- Para facilitar o uso das credenciais em seu ambiente local, configure o AWS CLI. Execute o seguinte comando no terminal: -->

<!-- ```bash
$ aws configure
``` -->

<!-- Insira as credenciais de acesso quando solicitado. -->

<!-- ### Passo 7: Configurar Política Personalizada (Opcional) -->

<!-- Se você deseja restringir ainda mais as permissões do usuário, é possível criar uma política personalizada. Crie uma política no Console do IAM e anexe-a ao usuário criado. -->

<!-- Aqui está um exemplo de uma política JSON para conceder acesso apenas ao SES: -->

<!-- ```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ses:SendEmail",
      "Resource": "*"
    }
  ]
}
``` -->

<!-- ### Passo 8: Testar o Acesso ao SES -->

<!-- Para testar se as configurações estão corretas, você pode usar a AWS CLI ou um SDK para a linguagem de programação de sua escolha. Por exemplo, para enviar um e-mail usando a AWS CLI: -->

<!-- ```bash
$ aws ses send-email --from you@example.com --destination ToAddresses=recipient@example.com --message "Subject={Data=Test,Charset=utf-8},Body={Text={Data=This is a test email,Charset=utf-8},Html={Data=<html><body><p>This is a test email</p></body></html>,Charset=utf-8}}"
``` -->

<!-- Lembre-se de substituir os endereços de e-mail pelos valores apropriados. -->

Esse tutorial fornece as etapas básicas para criar um usuário IAM com acesso ao SES. Certifique-se de revisar e adaptar as permissões de acordo com as necessidades específicas do seu caso.