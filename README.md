# Digital Business Card

GraphQL-визитка: **TypeScript · Node.js · NestJS · Prisma · GraphQL (Apollo) · PostgreSQL · Docker**.

## Запуск с нуля

```bash
docker compose up --build
```

Откройте **http://localhost:3000/graphql** — Apollo Sandbox.
При старте контейнер сам применяет миграции (`prisma migrate deploy`) и заполняет БД (идемпотентный сид).

Свои ссылки (опционально) задаются переменными окружения:
`PROFILE_GITHUB_URL`, `PROFILE_LINKEDIN_URL`, `REPOSITORY_URL`.

## Пример запроса

```graphql
query {
  profile {
    name
    title
    description
    links { label url }
    skills { name category }
    experience { company position startDate endDate isCurrent achievements }
    projects { name url technologies }
  }
}
```

## Локальная разработка

```bash
cp .env.example .env
docker compose up -d db          # только БД (добавьте ports: "5432:5432" при необходимости)
npm install && npm run build
npm run db:init                  # миграции + сид
npm run start:dev
```

## Архитектура

```
src/
  prisma/       PrismaService/Module (глобальный доступ к БД)
  profile/      модель, сервис, resolver корня графа (Query.profile)
  skills/       модель + сервис
  experience/   модель + сервис + resolver (achievements, isCurrent)
  projects/     модель + сервис
  graphql/      DataLoader'ы (по одному на запрос) и контекст
  database/seed данные визитки и идемпотентный сидинг
prisma/         schema.prisma и SQL-миграции
```

* **Слои:** resolver (только GraphQL) → service (доступ к данным через Prisma) → PostgreSQL.
* **N+1 исключён:** вложенные поля резолвятся через DataLoader. Запрос профиля со всеми
  вложенностями — максимум 6 SQL-запросов (profile, links, skills, experience, achievements,
  projects), независимо от числа записей, и только для запрошенных полей.
* **Инициализация:** `docker-entrypoint.sh` → миграции → сид → старт приложения.
* **Деплой (Render/Railway):** Docker-образ + managed PostgreSQL, переменная `DATABASE_URL`.
