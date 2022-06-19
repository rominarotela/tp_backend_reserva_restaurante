const {updateOne, deleteOne} = require("../controllers/productodao.controller");
module.exports = app => {
    const producto = require("../controllers/productodao.controller.js");
    var router = require("express").Router();
    router.post("/", producto.create);
    router.get("/", producto.findAll);
    router.get("/:id", producto.findOne);
    router.put('/:id', updateOne);
    router.delete('/:id', deleteOne);
    app.use('/api/producto', router);
};