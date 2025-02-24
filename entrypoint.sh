#!/bin/sh

# Rodar as migrações antes de iniciar o app
echo "Executando migrações..."
npm run prisma:migration init
npm run prisma:generate
npm run prisma:seed

# Iniciar o servidor
echo "Iniciando o servidor..."
npm run start
