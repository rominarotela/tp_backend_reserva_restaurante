const {updateOne, deleteOne} = require("../controllers/categoriadao.controller");
module.exports = app => {
    const categoria = require("../controllers/categoriadao.controller.js");
    var router = require("express").Router();
    router.post("/", categoria.create);
    router.get("/", categoria.findAll);
    router.get("/:id", categoria.findOne);
    router.put('/:id', updateOne);
    router.delete('/:id', deleteOne);
    app.use('/api/categoria', router);
};