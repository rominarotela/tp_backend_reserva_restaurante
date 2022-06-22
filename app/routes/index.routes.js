// Aqui se agrega todas las rutas a las vistas utilizadas
const restaurante = require("../controllers/restaurantedao.controller");
const mesa = require("../controllers/mesadao.controller");
const reserva = require("../controllers/reservadao.controller");
const cliente = require("../controllers/clientedao.controller");
const consumo = require("../controllers/consumodao.controller");
const producto = require("../controllers/productodao.controller");
module.exports = app => {
    var router = require("express").Router();
    app.use('/reservar_restaurante', router);
    router.get("/:restaurante", mesa.findMesaByRestaurante);
    // router.post("/:restaurante/:mesa/:cedula", cliente.findOneCedula);
    router.get("/:restaurante/:mesa/:cedula", cliente.findOneCedula);
    router.post("/:restaurante/:mesa/:cliente/create", reserva.createForm);
    // router.post("/:restaurante/:mesa/:cliente/reserva/addConsumo", consumo.addConsumoForm);
    router.post("/:restaurante/:mesa/:cliente/reserva/addConsumo", consumo.findConsumo);
    router.post("/:mesa/:cliente/list_productos", producto.findAll);
    // router.post("/:nombre/:precio_venta/addConsumoCliente", detalle.findAll);
    app.use('/index', router);
};