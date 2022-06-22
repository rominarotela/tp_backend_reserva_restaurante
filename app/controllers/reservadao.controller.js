const db = require("../models");
const Reservas = db.Reservas;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // crea una reserva
    const reserva = {
        restaurante: req.body.restaurante,
        mesa: req.body.mesa,
        fecha: req.body.fecha,
        cliente: req.body.cliente,
        cantidad_mesa: req.body.cantidad_mesa,
    };
    console.log("----------->  log: Creando una nueva reserva...", reserva)
    // Guardamos a la base de datos
    Reservas.create(reserva)
        .then(data => {
            console.log("----------->  log: Nueva reserva creada con éxito.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ha ocurrido un error al crear una reserva."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("----------->  log: Buscando reserva con id: ", id)
    Reservas.findByPk(id)
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "----------->  log: Error al obtener reserva con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;
    console.log("----------->  log: Preparando lista de reserva.")
    Reservas.findAll({ where: condition })
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ocurrio un error al obtener datos de las reservas."
            });
        });
};

exports.createForm = (req, res) => {

    // crea una reserva
    const reserva = {
        restaurante: req.params.restaurante,
        mesa: req.params.mesa,
        fecha: Date.now(),
        cliente: req.params.cliente,
        cantidad_mesa: req.body.cantidad_mesa,
    };
    console.log("----------->  log: Creando una nueva reserva...", reserva)
    // Guardamos a la base de datos
    Reservas.create(reserva)
        .then(data => {
            console.log("----------->  log: Nueva reserva creada con éxito.")
            res.render("confirmado", {restaurante:reserva.restaurante, mesa:reserva.mesa, cliente:reserva.cliente});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ha ocurrido un error al crear una reserva."
            });
        });
};

