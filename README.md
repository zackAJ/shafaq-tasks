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
you're app should be running on (https://localhost:8000)[https://localhost:8000]

### frontend
```bash
cd frontend
npm i
npm run dev
```

you're app should be running on (https://localhost:3000)[https://localhost:3000]

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

## Deployment

- Vercel for both backend and frontend.
- Postgresql data base from xata.

## Premium feature simulation

### Requirements
- Simulate integration with a payment gateway (e.g., a mock payment form) to
“unlock” premium features, such as marking a task as “priority” or accessing
extra task details.

### Plan

[ ] Setup
    [ ] Install Laravel Cachier with stripe or paddle and setup
    [ ] Hook in my dev sandbox account
    [ ] Create a subscription plan for shafaq-premium
    [ ] Use `expose` to receive webhooks in dev
    [ ] Add stripe route to allowed origins

[ ] Backend
    [ ] Make tests as I go
    [ ] Make a billing service interface
    [ ] Make a stripe/paddle billing service implementation
    [ ] Make a fake implementation for testing ? of research best way to do it (if I have time)
    [ ] Make the checkout route
    [ ] Make a subscription middleware to protect premium routes
    [ ] Update User resource to include isSubscribed boolean info

[ ] Frontend
    [ ] Design a premium popup component
    [ ] Add subscription status to the header of the page
    [ ] Mark buttons or elements that are premium with data-attribute for tracking and marketing purposes
    [ ] Make a `premiumCheck` utility, that takes a user and handle function, if user is subscribed call the handle. else show premium popup

[ ] Deployment
    [ ] run migrations
    [ ] Setup webhook url in stripe dashboard to point to production url

