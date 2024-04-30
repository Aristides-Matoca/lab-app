# Lab-app 1.0.0 by: Aristides Matoca
#### Back-end API de Gerenciamento de Escolas

### Tecnologias Utilizadas

    - body-parser
    - express
    - sqlite3
    - nodemon
    - multer
    - swagger-ui-express
    - xlsx
    
### Iniciando o Desenvolvimento
## Pré-requisitos

    Node.js v18+ instalado
    Yarn, npm, pnpm, bun

## Passos para Executar Localmente
# Clone o repositorio

``` bash
git clone https://github.com/Aristides-Matoca/lab-app.git
cd lab-app
```

# Instale as dependencias

```bash
npm install
# or
yarn
```

# Execute localmente

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Estrutura de Pastas

``` bash
.
|-- src/ 
|   |-- config/
|   |-- controller/
|   |-- routes/
|   |-- app.js
|-- escola.bd
|-- package.json
|-- province.json
|-- README.md
|-- swagger.json
```


Abra [http://localhost:5005/api-docs/#/](http://localhost:5005/api-docs/#/) no seu browser para ver a documentação dos endpoints.
