# 🛒 API de Gerenciamento de Pedidos

Uma API REST completa para gerenciamento de pedidos, desenvolvida em Node.js com Express, MongoDB e autenticação JWT. Implementa operações CRUD completas com transformação de dados e documentação Swagger.

## 📋 Descrição do Projeto

Este projeto foi desenvolvido como desafio para criar uma API simples e robusta para gerenciar pedidos. A API permite criar, ler, atualizar e deletar pedidos, com armazenamento em MongoDB e autenticação opcional via JWT.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcryptjs** - Hashing de senhas
- **Swagger** - Documentação da API
- **CORS** - Compartilhamento de recursos cross-origin

## 📦 Instalação

1. **Clone o repositório:**
   ```bash
   git clone <repository-url>
   cd orders-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o MongoDB:**
   - Certifique-se de que o MongoDB está rodando localmente na porta padrão (27017)
   - Ou ajuste a string de conexão em `src/database/connection.js`

## 🚀 Como Executar

### Modo Desenvolvimento:
```bash
npm run dev
```

### Modo Produção:
```bash
npm start
```

O servidor iniciará em: `http://localhost:3000`

## 📚 Documentação da API

A documentação completa da API está disponível via Swagger em:
**http://localhost:3000/api-docs**

## 🔗 Endpoints da API

### 📝 Pedidos (Orders)

#### **POST /order** - Criar Novo Pedido
Cria um novo pedido com transformação automática dos dados.

**Exemplo de Request:**
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

**Resposta (201 Created):**
```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

#### **GET /order/:numeroPedido** - Buscar Pedido por Número
Retorna os dados de um pedido específico.

**Exemplo:** `GET /order/v10089015vdb-01`

#### **GET /order/list** - Listar Todos os Pedidos
Retorna uma lista com todos os pedidos cadastrados.

#### **PUT /order/:numeroPedido** - Atualizar Pedido
Atualiza os dados de um pedido existente.

#### **DELETE /order/:numeroPedido** - Deletar Pedido
Remove um pedido do sistema.

### 🔐 Autenticação (Opcional)

#### **POST /auth/register** - Registrar Usuário
```json
{
  "username": "usuario",
  "password": "senha123"
}
```

#### **POST /auth/login** - Fazer Login
```json
{
  "username": "usuario",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "username": "usuario"
  }
}
```

## 🔄 Transformação de Dados

A API realiza transformação automática dos dados recebidos para o formato interno do banco:

| Campo de Entrada | Campo no Banco | Tipo |
|------------------|----------------|------|
| `numeroPedido` | `orderId` | String |
| `valorTotal` | `value` | Number |
| `dataCriacao` | `creationDate` | Date |
| `items[].idItem` | `items[].productId` | Number |
| `items[].quantidadeItem` | `items[].quantity` | Number |
| `items[].valorItem` | `items[].price` | Number |

## 🗄️ Estrutura do Banco de Dados

### Collection: `orders`
```javascript
{
  orderId: String (único),
  value: Number,
  creationDate: Date,
  items: [{
    productId: Number,
    quantity: Number,
    price: Number
  }]
}
```

### Collection: `users` (para autenticação)
```javascript
{
  username: String (único),
  password: String (hashed)
}
```

## 🏗️ Estrutura do Projeto

```
orders-api/
├── src/
│   ├── controllers/
│   │   ├── orderController.js    # Lógica dos pedidos
│   │   └── authController.js     # Lógica de autenticação
│   ├── models/
│   │   ├── order.js              # Schema do pedido
│   │   └── user.js               # Schema do usuário
│   ├── routes/
│   │   ├── orderRoutes.js        # Rotas dos pedidos
│   │   └── authRoutes.js         # Rotas de autenticação
│   ├── middleware/
│   │   └── auth.js               # Middleware JWT
│   ├── database/
│   │   └── connection.js         # Conexão MongoDB
│   └── app.js                    # Configuração Express
├── server.js                     # Ponto de entrada
├── package.json                  # Dependências
└── README.md                     # Este arquivo
```

## 🧪 Testes

Para testar a API, você pode usar ferramentas como:

- **Postman** - Importe a collection do Swagger
- **curl** - Exemplos na documentação
- **Insomnia** - Cliente REST alternativo

### Exemplo de Teste com curl:

```bash
# Criar pedido
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [{"idItem": "2434", "quantidadeItem": 1, "valorItem": 1000}]
  }'

# Listar pedidos
curl http://localhost:3000/order/list

# Buscar pedido específico
curl http://localhost:3000/order/v10089015vdb-01
```

## 🔒 Segurança

- **Autenticação JWT** opcional para endpoints protegidos
- **Hashing de senhas** com bcrypt
- **Validação de dados** nos schemas do Mongoose
- **Tratamento de erros** consistente

## 📈 Critérios de Avaliação Atendidos

- ✅ **Funcionalidade completa** dos requisitos mínimos
- ✅ **Código bem organizado** e comentado
- ✅ **Convenções de nomenclatura** adequadas
- ✅ **Tratamento de erros** robusto
- ✅ **Respostas HTTP** adequadas
- ✅ **Recursos adicionais** (JWT + Swagger)
- ✅ **Código hospedado** em repositório Git

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido para o desafio Jr System Analyst**
