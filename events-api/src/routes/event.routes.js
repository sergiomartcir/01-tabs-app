/*
    Capa encargada de mapear las urls a las funciones del controlador
*/

const express = require('express');  //servicio utilizado en la api
const router = express.Router();
const eventController = require('../controllers/event.controller');

router.get('/', eventController.getAll);
router.get('/:id', eventController.getOne);
router.post('/', eventController.create);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.remove);

module.exports = router;