var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController');
const cadastroController = require('../controllers/cadastroController');
const cadastroColaboradorController = require('../controllers/cadastroColaboradorController');
const cadastroEmpresaController = require('../controllers/cadastroEmpresaController');
const cadastroContratoController = require('../controllers/cadastroContratoController');
const contratoController = require('../controllers/contratoController');
const authController = require('../controllers/authController');
const auth = require("../middlewares/auth");
const { route } = require('./users');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get("/", authColaboradorController.create);

router.get("/", authController.create);
router.get("/login", authController.create);
router.post("/login", authController.store);
router.get("/sair", authController.destroy);

router.get('/cadastro', cadastroController.index);

router.get('/cadastro/colaborador', cadastroColaboradorController.index);
router.post('/cadastro/colaborador', cadastroColaboradorController.store);

router.get('/cadastro/empresa', cadastroEmpresaController.index);
router.post('/cadastro/empresa', cadastroEmpresaController.store);

router.get('/cadastro/contrato', auth, cadastroContratoController.index);
router.post('/cadastro/contrato', auth, cadastroContratoController.store);



router.get('/colaborador', auth, (req,res) => res.render('colaborador'));


router.get('/empresa', auth, (req,res) => res.render('empresa'));

router.get('/empresa/colaboradores', auth, contratoController.index);

router.get('/contratos', auth, (req,res) => res.render('contratos'));

router.get('/teste', (req,res) => res.render('teste'));


module.exports = router;
