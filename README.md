## Application Demo

https://insurance-finder.vercel.app/

Application has be been designed using mobile first approach. However, feel free to test out the tablet / desktop look and feel.


## Demo

https://user-images.githubusercontent.com/7235671/186063628-e5a2007b-a2b8-4c7a-b93c-698370c4ec32.mp4


## Database Schema


<img width="1028" alt="Schema" src="https://user-images.githubusercontent.com/7235671/186064081-2eacd87e-6d58-4a22-bc3c-4e78830f363c.png">


## Technology Stack

- [Next.Js](https://nextjs.org/)
- Backend uses serverless API routes (Node.JS)
- Added social authentication using Github using [NextAuth](https://next-auth.js.org/)
- Typescript ORM using [Prisma](https://www.prisma.io/)
- SQL database used from [PlanetScale](https://planetscale.com/)
- Styling using [Styled Components](https://styled-components.com/)
- Deployed to [Vercel](https://vercel.com)
- Unit testing using [Jest](https://jestjs.io/) and [React testing lib](https://testing-library.com/docs/react-testing-library/intro/)
- For the sake of demo, local db and production db is the same.

## Assumptions

- A user can see only his insurance plans
- A user can create as many insurance plans under his name
- Plans are sorted on home page based on `startDate`
- Every plan as a base price. Total price is calculated as per duration in number of weeks multiplied by base price
- Payment flow I'm assuming always works (No payment service like Stripe added)


## To connect to local database
0. Ensure values in `.env` are correct
1. `pscale auth login`
2. `pscale connect npkumar main --port 3309`
3. `npx prisma studio` use this to populate any plans (I've skipped seeding, migrations to save time)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

Check [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
