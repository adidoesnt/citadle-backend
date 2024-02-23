# Citadle
## Introduction
This is the backend for Citadle, a Wordle like game for guessing the names of cities.

## Setup
To get started, you will need the following in your .env file:
```bash
NODE_ENV=
PORT=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
API_NINJA_KEY=
API_NINJA_URL=
REST_COUNTRIES_URL=
MIN_CITY_POPULATION=
MIN_COUNTRY_POPULATION=
CRON_EXPRESSION=
CRON_TIMEZONE=
FRONTEND_URL=
```

## Development
To start the development server run:
```bash
bun run dev

# or

bun run start
```

To check server health, navigate to /health.  
To see the API docs, navigate to /docs.

## Acknowledgements
This project was created with [Bun](https://bun.sh) and [Elysia](https://elysiajs.com/).