#!/bin/sh
set -e

echo "Applying migrations..."
npx prisma migrate deploy

echo "Seeding database..."
node dist/database/seed/run.js

echo "Starting application..."
exec node dist/main.js
