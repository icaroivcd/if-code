FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que o servidor de desenvolvimento do Vite usa
EXPOSE 5173

# Comando para iniciar a aplicação em modo de desenvolvimento
# Ajustado para usar "npm run dev" conforme seu package.json
CMD ["npm", "run", "dev"]
