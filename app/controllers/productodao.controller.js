const db = require("../models");
const Productos = db.Productos;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    const producto = {
        nombre: req.body.nombre,
        precio_venta: req.body.precio_venta,
        categoria: req.body.categoria,
    };
    console.log("----------->  log: Creando un nuevo producto...", producto)
    // Guardamos a la base de datos
    Productos.create(producto)
        .then(data => {
            res.send(data);
            console.log("----------->  log: Nuevo producto creado con éxito.")
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  log: Ha ocurrido un error al crear un producto."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("----------->  log: Buscando producto con id: ", id)
    Productos.findByPk(id)
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "----------->  Error al obtener producto con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { producto: { [Op.iLike]: `%${nombre}%` } } : null;
    console.log("----------->  log: Preparando lista de productos.")
    Productos.findAll({ where: condition })
        .then(data => {
            console.log("----------->  log: Busqueda exitosa.")
            data = JSON.stringify(data);
            data = JSON.parse(data);
            let productos = [];
            data.forEach(element => {
                productos.push({
                    nombre:  element.nombre,
                    precio_venta: element.precio_venta,
                    categoria: element.categoria,
                    id: element.id
                });
            });
            // res.send(data);
            res.render('list_productos', {productos: productos});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "----------->  Ocurrio un error al obtener los productos."
            });
        });
};

exports.updateOne = async (req, res) => {
    try {
        let {id} = req.params;
        console.log("----------->  log: Actualizando categoría con id: ", id)
        await Productos.update(req.body, {
            where: {id: id}
        });
        return res.status(200).json({
            message: "----------->  log: Categoria actualizada con éxito."
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "----------->  log: Error al intentar actualizar producto."
        });
    }
}

exports.deleteOne = async (req, res) => {
    const {id} = req.params;
    console.log("----------->  log: Borrando producto con id: ", id)
    await Productos.destroy({where: {id: id}});

    return res.status(200).json({
        message: "----------->  Categoria eliminada.",
    });
}