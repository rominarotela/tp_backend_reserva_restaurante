const db = require("../models");
const Consumos = db.Consumos;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // crea un consumo
    const consumo = {
        restaurante: req.body.restaurante,
        mesa: req.body.mesa,
        cliente: req.body.cliente,
        cantidad_mesa: req.body.cantidad_mesa,
        estado: req.body.estado,
        fecha_creacion: req.body.fecha_creacion,
        fecha_cierre: req.body.fecha_cierre,
    };
    console.log("----------->  log: Creando un nuevo consumo...", consumo)
    // Guardamos a la base de datos
    Consumos.create(consumo)
        .then(data => {
            console.log("----------->  log: Nuevo consumo creado con éxito.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ha ocurrido un error al crear un consumo."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("----------->  log: Buscando consumo con id: ", id)
    Consumos.findByPk(id)
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "----------->  log: Error al obtener consumo con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;
    console.log("----------->  log: Preparando lista de consumo.")
    Consumos.findAll({ where: condition })
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ocurrio un error al obtener datos de los consumos."
            });
        });
};

exports.createForm = (req, res) => {

    // crea un consumo
    const consumo = {
        restaurante: req.params.restaurante,
        mesa: req.params.mesa,
        fecha: Date.now(),
        cliente: req.params.cliente,
        cantidad_mesa: req.body.cantidad_mesa,
    };
    console.log("----------->  log: Creando un nuevo consumo...", consumo)
    // Guardamos a la base de datos
    Consumos.create(consumo)
        .then(data => {
            console.log("----------->  log: Nuevo consumo creado con éxito.")
            res.render("confirmado");
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ha ocurrido un error al crear un consumo."
            });
        });
};

