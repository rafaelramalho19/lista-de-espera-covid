# Lista de Espera Covid

## O que é
- É uma aplicação node que verifica a tua data de nascimento e avisa-te por email (opcional) quando as inscrições para a vacinação abrirem.

## Configuração

- Duplica o `.env.example` para `.env`
```bash
cp .env.example .env
```

- Modifica os valores para os pretendidos, exemplo:
  
```bash
DAY="5"
MONTH="12"
YEAR="1998"
```

- Se quiseres notificações por email, o melhor a fazer é algo tipo isto:
```bash
TARGET_EMAIL="example_email@gmail.com"

HOST_SMTP="smtp.fastmail.com"
FROM_EMAIL="example_email@fast-email.com"
FROM_EMAIL_PASSWORD="i129i1912"
```

Para criares uma password no fastmail basta ires ao site (https://www.fastmail.com/) e depois criares uma password de app (https://www.fastmail.help/hc/en-us/articles/360058752854) com permissões para SMTP

## Instalar dependências

```bash
npm install
# ou
yarn
```

## Correr o script

```bash
npm start
# ou
yarn start
```
