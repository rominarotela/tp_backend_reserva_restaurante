const consumo = require("../controllers/consumodao.controller");
module.exports = app => {
    const consumo = require("../controllers/consumodao.controller.js");
    var router = require("express").Router();
    router.post("/", consumo.create);
    router.get("/", consumo.findAll);
    router.get("/:id", consumo.findOne);
    app.use('/api/consumo', router);
};