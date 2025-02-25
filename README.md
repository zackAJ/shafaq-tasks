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
    [x] Install and setup Laravel Cashier with stripe
    [x] Hook in my dev sandbox account
    [x] Create a subscription plan for shafaq-premium
    [x] Use `stripe cli` to receive webhooks in devl (as a docker container for better DX)
    [x] Add stripe route to allowed origins

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
    [ ] Add a success/failure payment page

[ ] Deployment
    [ ] run migrations
    [ ] Setup webhook url in stripe dashboard to point to production url


### Docs
Steps to use stripe in local development:

1- Create a stripe account and use Test sandbox mode
2- Get these credentials and add them to your .env, refer to laravel cashier and stripe docs (pretend this is a link)[]

```
# stripe

STRIPE_KEY=your-stripe-key
STRIPE_SECRET=your-stripe-secret
```

3- Launch stripe cli and copy the webhook secret form the output

```bash
docker compose up --build
 ✔ Container stripe-cli  Recreated                                                                                                                                     0.1s
# Attaching to stripe-cli
# stripe-cli  | Checking for new versions...
# stripe-cli  |
# stripe-cli  | Getting ready...
# stripe-cli  | Ready! You are using Stripe API Version [2025-02-24.acacia]. Your webhook signing secret is whsec_fcb45dc0aea978647f1564b2d600fe025d74b53038401d4e5d124f5abf94260c (^C to quit)
```

```
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

4- Create a basic product (subscription) and add the id to .env

```
STRIPE_SUBSCRIPTION_PRODUCT_ID=prod_your-product-id
```

