import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

import database from "infra/database.js";

export async function GET(request) {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  const pendingMigrations = await migrationRunner({
    ...defaultMigrationOptions,
  });
  await dbClient.end();

  return Response.json(pendingMigrations, {
    status: 200,
  });
}

export async function POST(request) {
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  const migratedMigrations = await migrationRunner({
    ...defaultMigrationOptions,
    dryRun: false,
  });
  await dbClient.end();

  if (migratedMigrations.length > 0) {
    return Response.json(migratedMigrations, {
      status: 201,
    });
  }

  return Response.json(migratedMigrations, {
    status: 200,
  });
}
