<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


# *`nestjs_todo_api`*

Simple **NestJS API** for todos. Uses **PostgreSQL**, **JWT auth**.

## swagger ui

```
/api
```

## setup

- install dependencies:
  
```bash
npm install
```

- create `.env` file:
  
```env
DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
DIRECT_URL="your_direct_url"
JWT_SECRET="your_random_secret_key"
```

- start server:
```bash
npm run start:dev
```

## endpoints

### auth
- login: `POST /auth/login`:
  
  body:
  ```json
  {
    "email": "test@test.com",
    "password": "123"
  }
  ```
  
  returns:
  ```json
  {
    "access_token": "##",
    "refresh_token": "##"
  }
  ```

- refresh access token: `POST /auth/refresh`
  
  Body:
  ```json
  {
    "refresh_token": "your_token"
  }
  ```

  returns:
  ```json
  {
    "access_token": "##",
  }
  ```

- register new user: `POST /auth/register`:
  
  body:
  ```json
  {
    "username": "username",
    "email": "test@test.com",
    "password": "123"
  }
  ```
  
  returns: `created user`

---

### todos
- `GET /todos` - get all todos  
- `POST /todos` - create new todo
  
  Body:
  ```json
  { "title": "Buy milk", "completed": false }
  ```
  
- `PUT /todos/:id` - update todo  
- `DELETE /todos/:id` - delete todo

---

### users
- `GET /users` - get all users 
- `POST /todos/:id` - get a user 
- `PUT /todos/update` - update the loged user `password`/`email`/`username`
- `DELETE /todos/delete` - delete the loged user

## testing
```bash
npm test
```

