# Usar uma imagem oficial do Node.js como base
FROM node:16-alpine

# Definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Instalar Python e ferramentas de build necessárias para compilar módulos nativos
RUN apk add --no-cache python3 make g++ && \
    if [ ! -e /usr/bin/python ]; then ln -s /usr/bin/python3 /usr/bin/python; fi

# Copiar os arquivos de definição de pacotes para o diretório de trabalho
COPY package*.json ./

# Instalar todas as dependências do projeto
RUN npm install

# Copiar todo o conteúdo do diretório local para o diretório de trabalho no container
COPY . .

# Rebuild SQLite3 specifically for the current environment
RUN npm rebuild sqlite3 --build-from-source

# Expor a porta que a aplicação usará
EXPOSE 5005

# Comando para rodar a aplicação
CMD ["node", "src/app.js"]
