# Etapa 1: Construção
FROM node:20 AS builder

WORKDIR /usr/src/app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Copie o arquivo de variáveis de ambiente
COPY .env.production .env.production

# Execute o build da aplicação Next.js
RUN npm run build

# Etapa 2: Execução
FROM node:20

WORKDIR /usr/src/app

# Copie os arquivos necessários
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/infra/prisma/schema.prisma ./infra/prisma/schema.prisma
COPY --from=builder /usr/src/app/infra/prisma/seed.js ./infra/prisma/seed.js

COPY --from=builder /usr/src/app/.env.production .env.production
COPY --from=builder /usr/src/app/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

EXPOSE 3000

CMD ["npm", "run", "start"]
