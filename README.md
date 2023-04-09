# **Projeto Cadastro de Contatos**

Este é um projeto para o gerenciamento de contatos.

## Como rodar o projeto

## Abra dois terminais, um para executar o backend e outro para o frontend. Certifique-se de ter as dependências instaladas e o arquivo .env preenchido corretamente antes de executar o projeto.

### Backend

No terminal, navegue até a pasta do projeto e execute o comando npm i para instalar as dependências.

- Preencha o arquivo .env seguindo como base o arquivo .envexample.
- No terminal, navegue até a pasta do projeto e execute o comando npm i para instalar as dependências.
- Execute o comando npm run migrate para rodar as migrações do banco de dados.
- Execute o comando npm run dev para iniciar o servidor.
- O servidor estará rodando na porta 8080.

### Frontend

- No terminal, navegue até a pasta do projeto e execute o comando npm i para instalar as dependências.
- Execute o comando npm start para iniciar o servidor do frontend.
- O servidor estará rodando na porta 3000.

# **API ROUTES**

## **User Route /user**

---

## 1. Login User

- POST api/login
- Authorization: None
- Content-type: application/json

Request:

```json
{
  "email": "johndoe@mail.com",
  "password": "something123456"
}
```

---

## 2. Create User

- POST api/users
- Authorization: None
- Content-type: application/json
- Password deve ter o mínimo de 8 dígitos

Request:

```json
{
  "name": "John Doe",
  "email": "johndoe@mail.com",
  "phone": "31 3013132132",
  "password": "something123456"
}
```

Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@mail.com",
  "password": "You shall never know.",
  "isActive": true,
  "phone": "31 3013132132",
  "createdAt": "2023-04-08T01:22:13.848Z",
  "contacts": []
}
```

---

## 2.1 List User

- GET api/users
- Authorization: Bearer Token
- Content-type: application/json
- Empty body

Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@mail.com",
  "password": "",
  "isActive": true,
  "phone": "31 3013132132",
  "createdAt": "2023-04-08T01:22:13.848Z",
  "contacts": [
    {
      "id": 52,
      "name": "Somer Boder",
      "email": "somerboder@mail.com",
      "phone": "21 99672 7139"
    },
    {
      "id": 53,
      "name": "Another Two",
      "email": "anothertwo@mail.com",
      "phone": "21 99666 7669"
    }
  ]
}
```

---

## 2.2 Update User

- PATCH api/users
- Authorization: Bearer Token
- Content-type: application/json

Request:

```json
{
  "name": "newKenzie",
  "email": "newEmail@mail.com",
  "phone": "99000000"
}
```

---

## 2.3 Delete User

- DELETE api/users
- Authorization: Bearer Token
- Content-type: application/json
- Empty body

---

<br>

## **Contact Route /contacts**

---

## 3. Create Contact

- POST /contacts/
- Authorization: Bearer Token
- Content-type: application/json

Request:

```json
{
  "name": "Somer Boder",
  "email": "somerboder@mail.com",
  "phone": "21 99672 7139"
}
```

Response

```json
{
  "name": "Somer Boder",
  "email": "somerboder@mail.com",
  "phone": "21 99672 7139",
  "owner": "1",
  "id": 52
}
```

---

## 3.1 Delete Contact

- DELETE api/contacts
- Authorization: Bearer Token
- Content-type: application/json
- Empty body

---
