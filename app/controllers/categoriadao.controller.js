const db = require("../models");
const Categorias = db.Categorias;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    const categoria = {
        nombre: req.body.nombre,
    };
    console.log("----------->  log: Creando una nueva categoria...", categoria)
    // Guardamos a la base de datos
    Categorias.create(categoria)
        .then(data => {
            res.send(data);
            console.log("----------->  log: Nueva categoria creada con éxito.")
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ha ocurrido un error al crear una categoria."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("----------->  log: Buscando categoria con id: ", id)
    Categorias.findByPk(id)
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "----------->  Error al obtener categoria con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { categoria: { [Op.iLike]: `%${nombre}%` } } : null;
    console.log("----------->  log: Preparando lista de categorias.")
    Categorias.findAll({ where: condition })
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  Ocurrio un error al obtener las categorias."
            });
        });
};

exports.updateOne = async (req, res) => {
    try {
        let {id} = req.params;
        console.log("----------->  log: Actualizando categoría con id: ", id)
        await Categorias.update(req.body, {
            where: {id: id}
        });
        return res.status(200).json({
            message: "----------->  log: Categoria actualizada con éxito."
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "----------->  log: Error al intentar actualizar categoria."
        });
    }
}

exports.deleteOne = async (req, res) => {
    const {id} = req.params;
    console.log("----------->  log: Borrando categoria con id: ", id)
    await Categorias.destroy({where: {id: id}});

    return res.status(200).json({
        message: "----------->  Categoria eliminada.",
    });
}