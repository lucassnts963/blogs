#!/bin/sh

# Rodar as migrações antes de iniciar o app
echo "Executando migrações..."
npm run prisma:migration init
npm run prisma:migration:deploy

# Iniciar o servidor
echo "Iniciando o servidor..."
SKIP_DB_DURING_BUILD=false npm run start
