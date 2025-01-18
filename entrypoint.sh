#!/bin/sh

# Rodar as migrações antes de iniciar o app
echo "Executando migrações..."
node-pg-migrate -m infra/migrations up

# Iniciar o servidor
echo "Iniciando o servidor..."
npm run start
