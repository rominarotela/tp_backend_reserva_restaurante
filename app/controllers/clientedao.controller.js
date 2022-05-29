const db = require("../models");
const {response} = require("express");
const Clientes = db.Clientes;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.factura) {
    //     res.status(400).send({
    //         message: "Debe enviar numero de factura!"
    //     });
    //     return;
    // }
    // crea un nuevo cliente
    const cliente = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido
    };
    console.log("----------->  log: Creando un nuevo cliente...", cliente)
    // Guardamos a la base de datos
    Clientes.create(cliente)
        .then(data => {
            res.send(data);
            console.log("----------->  log: Nuevo cliente creado con éxito.")
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ha ocurrido un error al crear un cliente."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("----------->  log: Buscando cliente con id: ", id)
    Clientes.findByPk(id)
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "----------->  Error al obtener cliente con id=" + id
            });
        });
};

exports.findOneCedula = (req, res) => {
    const cedula = req.params.cedula;
    console.log("----------->  log: Buscando cliente con cédula: ", cedula)
    Clientes.findAll({ where: { cedula: cedula }})
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "----------->  Error al obtener cliente con cédula=" + cedula
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { cliente: { [Op.iLike]: `%${nombre}%` } } : null;
    console.log("----------->  log: Preparando lista de clientes.")
    Clientes.findAll({ where: condition })
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  Ocurrio un error al obtener los clientes."
            });
        });
};

