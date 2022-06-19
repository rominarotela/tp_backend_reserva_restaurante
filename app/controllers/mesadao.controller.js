const db = require("../models");
const Mesas = db.Mesas;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // crea una mesa
    const mesa = {
        nombre_mesa: req.body.nombre_mesa,
        restaurante: req.body.restaurante,
        posicion_x: req.body.posicion_x,
        posicion_y: req.body.posicion_y,
        nro_piso: req.body.nro_piso,
        capacidad: req.body.capacidad,
        ocupado: req.body.ocupado,
    };
    console.log("----------->  log: Creando una nueva mesa...", mesa)
    // Guardamos a la base de datos
    Mesas.create(mesa)
        .then(data => {
            console.log("----------->  log: Nueva mesa creada con éxito.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ha ocurrido un error al crear una mesa."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("----------->  log: Buscando mesa con id: ", id)
    Mesas.findByPk(id)
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
            res.send({ data: 'json' })

        })
        .catch(err => {
            res.status(500).send({
                message: "----------->  log: Error al obtener mesa con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? {nombre: {[Op.iLike]: `%${nombre}%`}} : null;
    console.log("----------->  log: Preparando lista de mesas.")
    Mesas.findAll({where: condition})
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ocurrio un error al obtener datos lista de mesas."
            });
        });
};

exports.updateOne = async (req, res) => {
    try {
        let {id} = req.params;
        console.log("----------->  log: Actualizando mesa con id: ", id)
        await Mesas.update(req.body, {
            where: {id: id}
        });
        return res.status(200).json({
            message: "----------->  log: Mesa actualizada con éxito."
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "----------->  log: Error al intentar actualizar mesa."
        });
    }
}

exports.deleteOne = async (req, res) => {
    const {id} = req.params;
    console.log("----------->  log: Borrando mesa con id: ", id)
    await Mesas.destroy({where: {id: id}});

    return res.status(200).json({
        message: "----------->  Mesa eliminada.",
    });
}

exports.findMesaByRestaurante = async (req, res) => {
    let {restaurante} = req.params;
    console.log("----------->  log: Listando mesas del restaurante con id: ", restaurante);
    await Mesas.findAll({ where: {restaurante: restaurante}})
    .then(data => {
        console.log("----------->  log: Las Mesas fueron listadas con éxito.")
        data = JSON.stringify(data);
        data = JSON.parse(data);
        let mesas = [];
        data.forEach(element => {
            mesas.push({
                nombre_mesa:  element.nombre_mesa,
                restaurante: element.restaurante,
                posicion_x: element.posicion_x,
                posicion_y: element.posicion_y,
                nro_piso: element.nro_piso,
                capacidad: element.capacidad,
                id: element.id
            });
        });
        res.render("list_mesas", {mesas: mesas, tam: mesas.length})
        console.log("----------->  log: Las mesas son:", mesas)
        // res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "----------->  log: Error al intentar listar las mesas."
        });
    });
}