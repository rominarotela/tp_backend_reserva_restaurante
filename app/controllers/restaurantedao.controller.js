const db = require("../models");
const Restaurantes = db.Restaurantes;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // crea un restaurante
    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
    };
    console.log("----------->  log: Creando un nuevo restaurante...", restaurante)
    // Guardamos a la base de datos
    Restaurantes.create(restaurante)
        .then(data => {
            console.log("----------->  log: Nuevo restaurante creado con éxito.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ha ocurrido un error al registrar un restaurante."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("----------->  log: Buscando restaurante con id: ", id)
    Restaurantes.findByPk(id)
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "----------->  Error al obtener venta con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;
    console.log("----------->  log: Preparando lista de restaurante.")
    Restaurantes.findAll({ where: condition })
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ocurrio un error al obtener datos de los restaurantes."
            });
        });
};

exports.updateOne = async (req, res) => {
    try {
        let { id } = req.params;
        console.log("----------->  log: Actualizando restaurante con id: ", id)
        await Restaurantes.update(req.body, {
            where: { id_restaurante: id }
        });
        return res.status(200).json({
            message: "----------->  log: Restaurante actualizado con éxito."
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "----------->  log: Error al intentar actualizar restaurante."
        });
    }
}

exports.deleteOne = async (req, res) =>  {
    const { id } = req.params;
    console.log("----------->  log: Borrando restaurante con id: ", id)
    await Restaurantes.destroy({ where: { id_restaurante: id }});

    return res.status(200).json({
        message: "----------->  Restaurante eliminado.",
    });
}