# Shafaq Tasks

## Setup for local dev

### backend
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
composer run dev
```

### frontend
```bash
cd frontend
npm i
npm run dev
```

## Api testing and documentation with Bruno
Bruno is an open source offline api client that supports sharing via git, with bruno you can document and also test the endpoint on the fly being up to date with git.

- Install bruno and open [https://www.usebruno.com/]
- Import `/bruno/shafaq` collection
![image](https://github.com/user-attachments/assets/04f77465-bb08-44c2-825f-a15dff9367f6)
- change environment to local
![image](https://github.com/user-attachments/assets/40d06d4a-d273-4837-88d4-889042177aad)

- before making you register or login make sure to call the `auth/csrf` request first

## Testing
```bash
composer test
```
