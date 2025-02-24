# Etapa 1: Construção
FROM node:20 AS builder

# Diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Execute o build da aplicação Next.js
RUN npm run build

# Etapa 2: Execução
FROM node:20

# Diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos gerados pelo build e as dependências de produção
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/infra/migrations ./infra/migrations
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

# Exponha a porta 3000
EXPOSE 3000

# Comando padrão
CMD ["npm", "run", "start"]