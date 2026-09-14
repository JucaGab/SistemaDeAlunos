// models/aluno.js
// Armazenamento em ARRAY (memoria). Depois isso vira um model do Sequelize:
// cada funcao aqui equivale a um metodo do Sequelize (create, findAll, findByPk, update, destroy)

let alunos = [];
let proximoId = 1;

function listar() {
  return alunos;
}

function buscarPorId(id) {
  return alunos.find((aluno) => aluno.id === Number(id));
}

function criar({ nome, ra, email, senha }) {
  const novoAluno = {
    id: proximoId++,
    nome,
    ra,
    email,
    senha,
  };
  alunos.push(novoAluno);
  return novoAluno;
}

function atualizar(id, { nome, ra, email, senha }) {
  const aluno = buscarPorId(id);
  if (!aluno) return null;

  aluno.nome = nome ?? aluno.nome;
  aluno.ra = ra ?? aluno.ra;
  aluno.email = email ?? aluno.email;
  aluno.senha = senha ?? aluno.senha;

  return aluno;
}

function deletar(id) {
  const index = alunos.findIndex((aluno) => aluno.id === Number(id));
  if (index === -1) return false;

  alunos.splice(index, 1);
  return true;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};
