#!/bin/sh

# Rodar as migrações antes de iniciar o app
echo "Executando migrações..."
npm run prisma:generate
npm run prisma:migration init
npm run prisma:migration:deploy
npm run prisma:seed

# Iniciar o servidor
echo "Iniciando o servidor..."
npm run start
