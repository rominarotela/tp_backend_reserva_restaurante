const {updateOne, deleteOne} = require("../controllers/mesadao.controller");
module.exports = app => {
    const mesa = require("../controllers/mesadao.controller.js");
    var router = require("express").Router();
    router.post("/", mesa.create);
    router.get("/", mesa.findAll);
    router.get("/:id", mesa.findOne);
    router.put('/:id', updateOne);
    router.delete('/:id', deleteOne);
    app.use('/api/mesa', router);
};