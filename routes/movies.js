const express = require('express');
const router = express.Router();

const controller = require('../controllers/movies');

/* GET users listing. */ 
//el orden de los controladores afecta la ejecucion (como tenemos controladores se hacen las rutas correspondientes para hacer match)
router.post('/',controller.create);

router.get('/',controller.list);

router.put('/:id',controller.replace);

router.patch('/actor',controller.addActor);//primero iran las rutas estaticas 

router.patch('/:id',controller.update);

router.delete('/:id',controller.destroy);

router.get('/:id',controller.index);






module.exports = router;

//middle wear de enrutamiento  ' /'porque que metodo que rutay

















