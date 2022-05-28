const restaurante = require("../controllers/mesadao.controller");

module.exports = app => {
    var router = require("express").Router();
    router.get("/", restaurante.findAll);
    router.get("/:id", restaurante.findOne);
    app.use('/api/seleccion', router);
};