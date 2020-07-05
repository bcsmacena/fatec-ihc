var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController');
const cadastroController = require('../controllers/cadastroController');
const cadastroColaboradorController = require('../controllers/cadastroColaboradorController');
const cadastroEmpresaController = require('../controllers/cadastroEmpresaController');
const cadastroContratoController = require('../controllers/cadastroContratoController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', loginController.index);

router.get('/cadastro', cadastroController.index);

router.get('/cadastro/colaborador', cadastroColaboradorController.index);
router.post('/cadastro/colaborador', cadastroColaboradorController.store);

router.get('/cadastro/empresa', cadastroEmpresaController.index);
router.post('/cadastro/empresa', cadastroEmpresaController.store);

router.get('/cadastro/contrato', cadastroContratoController.index);
router.post('/cadastro/contrato', cadastroContratoController.store);


router.get('/colaborador', (req,res) => res.render('colaborador'));
router.get('/empresa', (req,res) => res.render('empresa'));
router.get('/empresa/colaboradores', (req,res) => res.render('empresa/colaboradores'));

router.get('/contratos', (req,res) => res.render('contratos'));

router.get('/teste', (req,res) => res.render('teste'));


module.exports = router;
