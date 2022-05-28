const {updateOne, deleteOne} = require("../controllers/restaurantedao.controller");
module.exports = app => {
    const restaurante = require("../controllers/restaurantedao.controller.js");
    var router = require("express").Router();
    router.post("/", restaurante.create);
    router.get("/", restaurante.findAll);
    router.get("/:id", restaurante.findOne);
    router.put('/:id', updateOne);
    router.delete('/:id', deleteOne);
    app.use('/api/restaurante', router);
};
