// controllers/alunoController.js
const Aluno = require('../models/aluno');

// GET /alunos -> lista todos (renderiza view)
function listar(req, res) {
  const alunos = Aluno.listar();
  res.render('alunos/listar', { alunos });
}

// GET /alunos/novo -> formulario de cadastro
function formNovo(req, res) {
  res.render('alunos/form', { aluno: null, acao: '/alunos', metodo: 'POST' });
}

// GET /alunos/:id/editar -> formulario de edicao
function formEditar(req, res) {
  const aluno = Aluno.buscarPorId(req.params.id);
  if (!aluno) return res.redirect('/alunos');
  res.render('alunos/form', {
    aluno,
    acao: `/alunos/${aluno.id}?_method=PUT`,
    metodo: 'POST',
  });
}

// GET /alunos/:id -> consultar um aluno
function consultar(req, res) {
  const aluno = Aluno.buscarPorId(req.params.id);
  if (!aluno) return res.redirect('/alunos');
  res.render('alunos/detalhe', { aluno });
}

// POST /alunos -> cadastrar
function cadastrar(req, res) {
  const { nome, ra, email, senha } = req.body;
  Aluno.criar({ nome, ra, email, senha });
  res.redirect('/alunos');
}

// PUT /alunos/:id -> alterar
function alterar(req, res) {
  const { nome, ra, email, senha } = req.body;
  Aluno.atualizar(req.params.id, { nome, ra, email, senha });
  res.redirect('/alunos');
}

// DELETE /alunos/:id -> excluir
function excluir(req, res) {
  Aluno.deletar(req.params.id);
  res.redirect('/alunos');
}

module.exports = {
  listar,
  formNovo,
  formEditar,
  consultar,
  cadastrar,
  alterar,
  excluir,
};
