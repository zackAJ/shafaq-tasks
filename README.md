# Shafaq Tasks

## Setup for local dev

### Backend
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
composer run dev
```
Your app should be running on [https://localhost:8000](https://localhost:8000)

### Frontend
```bash
cd frontend
npm i
npm run dev
```

Your app should be running on [https://localhost:3000](https://localhost:3000)

## API testing and documentation with Bruno
Bruno is an open source offline API client that supports sharing via git. With Bruno, you can document and also test the endpoint on the fly while staying up to date with git.

- Install Bruno from [https://www.usebruno.com/](https://www.usebruno.com/)
- Import `/bruno/shafaq` collection
![image](https://github.com/user-attachments/assets/04f77465-bb08-44c2-825f-a15dff9367f6)
- Change environment to local
![image](https://github.com/user-attachments/assets/40d06d4a-d273-4837-88d4-889042177aad)

- Before making your register or login, make sure to call the `auth/csrf` request first

## Testing
```bash
composer test
```

## Deployment

- Vercel for both backend and frontend
- PostgreSQL database from Xata

## Premium feature simulation

### Note
For billing, I went with Laravel Cashier. In a real web app where I would have the same domain for both backend and frontend, I would use sessions and cookies for auth.
The checkout flow would be as follows:

1. User clicks on link and it triggers GET request `/subscription-checkout`
2. The API would redirect to the checkout page

Since I'm hosting with Vercel public domains I can't use server-side cookies on the frontend and I can't redirect the user, therefore I went with sending the link in a JSON response.

> [!IMPORTANT]
> Use fake sandbox credit card number for checkout: `4242 4242 4242 4242`

### Plan

- [x] Setup
  - [x] Install and setup Laravel Cashier with Stripe
  - [x] Hook in my dev sandbox account
  - [x] Create a subscription plan for shafaq-premium
  - [x] Use `stripe cli` to receive webhooks in dev (as a Docker container for better DX)
  - [x] Add Stripe route to allowed origins

- [x] Backend
  - [x] Make tests as I go
  - [x] Make the checkout route
  - [x] Make a billing service interface
  - [x] Make a Stripe/Paddle billing service implementation
  - [x] Make a fake implementation for testing ? or research best way to do it (if I have time)
  - [x] Make a subscription middleware to protect premium routes
  - [x] Update User resource to include isSubscribed boolean info

- [x] Frontend
  - [x] Design a premium popup component and add it to auth layout
  - [x] Add subscription status to the header of the page
  - [x] Add a store for UI, that handles triggering the popup
  - [x] Mark buttons or elements that are premium with data-attribute for tracking
  - [x] Make a `premiumCheck` utility, that takes a user and handle function, if user is subscribed call the handle. else show premium popup
  - [x] Add a success/failure payment page

- [x] Come up with a premium feature

- [x] Deployment
  - [x] Run migrations
  - [x] Setup webhook URL in Stripe dashboard to point to production URL

### Docs
Steps to use Stripe in local development:

1. Create a Stripe account and use Test sandbox mode
2. Get these credentials and add them to your .env, refer to Laravel Cashier and Stripe docs

```
# stripe

STRIPE_KEY=your-stripe-key
STRIPE_SECRET=your-stripe-secret
```

3. Launch Stripe CLI and copy the webhook secret from the output

```bash
cd backend
docker compose up --build
 ✔ Container stripe-cli  Recreated                                                                                                                                     0.1s
# Attaching to stripe-cli
# stripe-cli  | Checking for new versions...
# stripe-cli  |
# stripe-cli  | Getting ready...
# stripe-cli  | Ready! You are using Stripe API Version [2025-02-24.acacia]. Your webhook signing secret is whsec_***** (^C to quit)
```

```
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

4. Create a basic product (subscription) and add the ID to .env

```
STRIPE_SUBSCRIPTION_PRICE_ID=price_test
```

## Todo
- [x] Refactor Button duplication to primary button 
- [x] Fix update task form reseting after validation error
- [ ] Add UI notifications
