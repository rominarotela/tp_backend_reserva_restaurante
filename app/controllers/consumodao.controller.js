const db = require("../models");
const Consumos = db.Consumos;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    const consumo = {
        restaurante: req.body.restaurante,
        mesa: req.body.mesa,
        cliente: req.body.cliente,
        estado: req.body.estado,
    };
    consumo.fecha_creacion = new Date()
    console.log("----------->  log: Creando un nuevo consumo...", consumo)
    // Guardamos a la base de datos
    Consumos.create(consumo)
        .then(data => {
            res.send(data);
            console.log("----------->  log: Nuevo consumo creado con éxito.")
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
                message: "----------->  Error al obtener consumo con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { consumo: { [Op.iLike]: `%${nombre}%` } } : null;
    console.log("----------->  log: Preparando lista de consumos.")
    Consumos.findAll({ where: condition })
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  Ocurrio un error al obtener los consumos."
            });
        });
};

exports.updateOne = async (req, res) => {
    try {
        let {id} = req.params;
        console.log("----------->  log: Actualizando categoría con id: ", id)
        await Consumos.update(req.body, {
            where: {id: id}
        });
        return res.status(200).json({
            message: "----------->  log: Categoria actualizada con éxito."
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "----------->  log: Error al intentar actualizar consumo."
        });
    }
}

exports.deleteOne = async (req, res) => {
    const {id} = req.params;
    console.log("----------->  log: Borrando consumo con id: ", id)
    await Consumos.destroy({where: {id: id}});

    return res.status(200).json({
        message: "----------->  Categoria eliminada.",
    });
}

exports.addConsumoForm = (req, res) => {

    // crea un consumo
    const consumo = {
        restaurante: req.params.restaurante,
        mesa: req.params.mesa,
        cliente: req.params.cliente,
        estado: true,
        fecha_creacion: Date.now(),
    };
    console.log("----------->  log: Creando un nuevo consumo...", consumo)
    // Guardamos a la base de datos
    Consumos.create(consumo)
        .then(data => {
            console.log("----------->  log: Nuevo consumo creado con éxito.")
            res.render("list_consumo", {consumo: consumo});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ha ocurrido un error al crear un consumo."
            });
        });
};