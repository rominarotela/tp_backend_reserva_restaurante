// Aqui se agrega todas las rutas a las vistas utilizadas
const restaurante = require("../controllers/restaurantedao.controller");
module.exports = app => {
    const restaurante = require("../controllers/restaurantedao.controller.js");
    var router = require("express").Router();
    router.post("/", restaurante.create);
    router.get("/", restaurante.findAll);
    app.use('/reservar_restaurante', router);
};