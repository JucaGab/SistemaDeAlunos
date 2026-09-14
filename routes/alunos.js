// routes/alunos.js
const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.listar);
router.get('/novo', alunoController.formNovo);
router.get('/:id/editar', alunoController.formEditar);
router.get('/:id', alunoController.consultar);

router.post('/', alunoController.cadastrar);
router.put('/:id', alunoController.alterar);
router.delete('/:id', alunoController.excluir);

module.exports = router;
