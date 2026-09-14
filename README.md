# CRUD de Alunos (Node.js + Express + Handlebars)

Sistema com cadastrar, alterar, consultar e excluir alunos, guardando os
dados num **array em memoria** (models/aluno.js).

Campos do aluno: `id`, `nome`, `ra`, `email`, `senha`.

## Como rodar

```bash
npm install
npm run dev
```

Depois abra http://localhost:3000/alunos

Se nao tiver o nodemon instalado globalmente, `npm run dev` ja usa a
dependencia local. Para rodar sem nodemon: `npm start`.

## Estrutura

```
crud-alunos/
  app.js                       -> configura o Express, Handlebars e rotas
  models/aluno.js              -> "banco de dados" em array + funcoes CRUD
  controllers/alunoController.js -> logica de cada rota
  routes/alunos.js             -> define as rotas /alunos
  views/                       -> telas em Handlebars (listar, form, detalhe)
  public/css/estilo.css        -> estilo basico
```

## Rotas

| Metodo | Rota               | Acao                     |
|--------|---------------------|--------------------------|
| GET    | /alunos              | Lista todos os alunos    |
| GET    | /alunos/novo         | Formulario de cadastro   |
| GET    | /alunos/:id          | Consulta um aluno        |
| GET    | /alunos/:id/editar   | Formulario de edicao     |
| POST   | /alunos              | Cadastra um aluno        |
| PUT    | /alunos/:id          | Atualiza um aluno        |
| DELETE | /alunos/:id          | Exclui um aluno          |

PUT e DELETE sao simulados nos formularios HTML usando o pacote
`method-override` (`?_method=PUT` / `?_method=DELETE`), ja que forms
HTML so mandam GET ou POST de verdade.

## Migrando para Sequelize (ORM)

A ideia de deixar o array isolado em `models/aluno.js` e justamente
para trocar por Sequelize sem mexer em controllers/rotas/views.

1. Instalar dependencias:
   ```bash
   npm install sequelize sqlite3
   ```
   (sqlite3 e mais simples para o projeto da faculdade; pode trocar por
   mysql2/pg se o professor pedir outro banco)

2. Criar a configuracao do Sequelize (`config/database.js`) e o model
   real (`models/Aluno.js`) com os mesmos campos:

   ```js
   const { DataTypes } = require('sequelize');
   const sequelize = require('../config/database');

   const Aluno = sequelize.define('Aluno', {
     nome: { type: DataTypes.STRING, allowNull: false },
     ra: { type: DataTypes.STRING, allowNull: false, unique: true },
     email: { type: DataTypes.STRING, allowNull: false, unique: true },
     senha: { type: DataTypes.STRING, allowNull: false },
   });

   module.exports = Aluno;
   ```

3. Trocar as funcoes do `models/aluno.js` (array) pelas equivalentes do
   Sequelize dentro do controller:

   | Array (atual)         | Sequelize                          |
   |------------------------|-------------------------------------|
   | `Aluno.listar()`       | `await Aluno.findAll()`             |
   | `Aluno.buscarPorId(id)`| `await Aluno.findByPk(id)`          |
   | `Aluno.criar(dados)`   | `await Aluno.create(dados)`         |
   | `Aluno.atualizar(id, dados)` | `await aluno.update(dados)`   |
   | `Aluno.deletar(id)`    | `await aluno.destroy()`             |

4. Como os controllers passam a usar `await`, transformar as funcoes do
   controller em `async function`.

5. Ponto para discutir com a dupla: usar hash de senha (ex. `bcrypt`)
   antes de salvar no banco, em vez de salvar a senha em texto puro
   como esta no array agora.
