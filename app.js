// app.js
const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');

const alunosRoutes = require('./routes/alunos');

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true })); // ler dados de formularios (req.body)
app.use(express.json());
app.use(methodOverride('_method')); // permite usar PUT/DELETE em forms HTML
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => res.redirect('/alunos'));
app.use('/alunos', alunosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
