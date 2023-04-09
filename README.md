# **API ROUTES**

## **User Route /user**

---

## 1. Login User

- POST /login
- Authorization: None
- Content-type: application/json

Request:

```json
{
  "name": "Kenzie",
  "password": "1234"
}
```

---

## 2. Create User

- POST /users
- Authorization: None
- Content-type: application/json

Request:

```json
{
  "name": "Kenzie",
  "email": "kenzie@gmail.com",
  "password": "1234",
  "phone": "2740028922"
}
```

Response:

```json
{
  "id": "13d7ef1d-614f-42d1-a9a3-4bc0e8f8cae5",
  "name": "Kenzie",
  "email": "kenzie@gmail.com",
  "phone": "2740028922",
  "createdAt": "2023-01-31T15:44:28.679Z"
}
```

---

## 2.1 List User

- GET /users/account
- Authorization: Bearer Token
- Content-type: application/json
- Empty body

Response:

```json
{
  "id": "13d7ef1d-614f-42d1-a9a3-4bc0e8f8cae5",
  "name": "Kenzinho",
  "email": "kenzinho@gmail.com",
  "phone": "2740028922",
  "createdAt": "2023-01-31T15:44:28.679Z",
  "contacts": []
}
```

---

## 2.2 Update User

- PATCH /users/account
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

- DELETE /users/account
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
  "name": "Contact",
  "email": "contact@mail.com",
  "phone": "2899999999"
}
```

Response

```json
{
  "name": "Contact",
  "email": "contact@mail.com",
  "phone": "2899999999",
  "users": {
    "id": "13d7ef1d-614f-42d1-a9a3-4bc0e8f8cae5",
    "name": "Kenzinho",
    "email": "kenzienho@mail.com",
    "phone": "2740028922",
    "createdAt": "2023-01-31T15:44:28.679Z",
    "contacts": []
  },
  "id": "f6bb914c-f642-4401-9f36-4598d261dd09",
  "createdAt": "2023-02-06T21:22:33.206Z"
}
```

---

## 3.1 List Contact

- GET /contacts/
- Authorization: Bearer Token
- Content-type: application/json
- Empty body

Response:

```json
[
  {
    "id": "f6bb914c-f642-4401-9f36-4598d261dd09",
    "name": "Contact",
    "email": "contact@mail.com",
    "phone": "2899999999",
    "createdAt": "2023-02-06T21:22:33.206Z"
  }
]
```

---

## 3.2 Update Contact

- PATCH /contacts/:contactId
- Authorization: Bearer Token
- Content-type: application/json

Request:

```json
{
  "name": "newContact"
}
```

---

## 3.3 Delete Contact

- DELETE /contacts/:contactId
- Authorization: Bearer Token
- Content-type: application/json
- Empty body

---

<br>

# **Possible Errors**

- If you do not pass the token in the "Authorization" field

#### Status `401 - UNAUTHORIZED` - "Missing authorization token"

```json
{
  "message": "Missing authorization token"
}
```

- Create a user with existing email

#### Status `409 - CONFLICT` - Email already exists

```json
{
  "message": "This email already exists"
}
```

- Login with incorrect email or password

#### Status `403 - FORBIDDEN` - "Invalid user or password"

```json
{
  "message": "Invalid user or password"
}
```