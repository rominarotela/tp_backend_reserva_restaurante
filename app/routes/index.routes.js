// Aqui se agrega todas las rutas a las vistas utilizadas
const restaurante = require("../controllers/restaurantedao.controller");
const mesa = require("../controllers/mesadao.controller");
const reserva = require("../controllers/reservadao.controller");
const cliente = require("../controllers/clientedao.controller");
module.exports = app => {
    var router = require("express").Router();
    app.use('/reservar_restaurante', router);
    router.get("/:restaurante", mesa.findMesaByRestaurante);
    // router.post("/:restaurante/:mesa/:cedula", cliente.findOneCedula);
    router.get("/:restaurante/:mesa/:cedula", cliente.findOneCedula);
    app.use('/index', router);
};