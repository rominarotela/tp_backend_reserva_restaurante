// Aqui se agrega todas las rutas a las vistas utilizadas
const restaurante = require("../controllers/restaurantedao.controller");
const mesa = require("../controllers/mesadao.controller");
const reserva = require("../controllers/reservadao.controller");
const cliente = require("../controllers/clientedao.controller");
module.exports = app => {
    // const restaurante = require("../controllers/restaurantedao.controller.js");
    var router = require("express").Router();
    // router.post("/", restaurante.create);
    // router.get("/", restaurante.findAll);
    app.use('/reservar_restaurante', router);
    router.get("/:restaurante", mesa.findMesaByRestaurante);
    router.get("/:restaurante/:mesa", cliente.findOne);
    app.use('/index', router);
};