<h1 align="center" style="font-weight: bold;">Rebobinei API 🎬</h1>

<p align="center">
  <a href="#tech">Technologies</a> • 
  <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a>
</p>

<p align="center">
    <b>A complete API for movie reviews and listing, integrated with TMDB.</b>
</p>

<p align="center">
     <a href="https://rebobinei-api.vercel.app/docs">📖 Swagger Documentation</a>
</p>

<h2 id="tech">💻 Technologies</h2>

- NodeJS
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- Zod
- TMDB API

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- [NodeJS](https://nodejs.org/en/download)
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/) (Optional, but recommended for database)
- [TMDB Account](https://www.themoviedb.org/) (For API Key)

<h3>Cloning</h3>

```bash
git clone https://github.com/luizfbn/rebobinei-api.git
```

<h3>Config .env variables</h3>

Use the `.env.example` as reference to create your configuration file `.env`

<h3>Starting</h3>

You can run it using Docker (recommended) or locally.

Via Docker:

```bash
cd rebobinei-api
npm run compose:dev
```

Locally:

```bash
cd rebobinei-api
npm install
npm run db:dev # Runs migrations and seed
npm run dev
```

<h2 id="routes">📍 API Endpoints</h2>

Below are the main routes. Full documentation is available at `/docs`.

| route                                   | description                             |
| --------------------------------------- | --------------------------------------- |
| <kbd>POST /auth/login</kbd>             | user authentication                     |
| <kbd>POST /users</kbd>                  | creates a new user                      |
| <kbd>GET /movies/search?q={movie}</kbd> | searches movies via TMDB                |
| <kbd>GET /movies/:id</kbd>              | retrieves specific movie details        |
| <kbd>GET /movies/:id/reviews</kbd>      | retrieves a list of reviews for a movie |
| <kbd>POST /movies/:id/reviews</kbd>     | creates a movie review                  |
