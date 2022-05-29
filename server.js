const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const hbs = require("express-handlebars");
const app = express();

const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:9091"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// css
app.use(express.static('public'));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Bienvenido Node backend 2020"});
});

// new route
app.engine('.hbs', hbs.engine({
    defaultLayout: 'default',
    extname: '.hbs'
}))

app.set('view engine', '.hbs');

app.get('/login', (req, res) => {
    res.render('login')
})

// seleccion
app.get('/restaurantes', (req, res, next) => {
    res.render('restaurantes')
})


app.get('/list_restaurantes', (req, res, next) => {
    res.render('list_restaurantes')
})

app.post('/list_restaurantes', (req, res, next) => {
    res.render('list_restaurantes', {nombre: req.body.nombre, direccion: req.body.direccion})
})


app.get('/restaurantes', (req, res, next) => {
    console.log("req.body", req.data)
    res.render('restaurantes')
})

app.post('/restaurantes', (req, res, next) => {
    console.log("req.body", req.data)
    res.render('restaurantes', {nombre: req.body.nombre, direccion: req.body.direccion})
})

app.get('/list_mesas', (req, res) => {
    console.log("/list_mesas", req.data)
    res.render('list_mesas', {nombre_mesa: req.body.nombre_mesa, capidad: req.body.capidad})
})

app.post('/list_mesas', (req, res) => {
    console.log("/list_mesas", req.data)
    res.render('list_mesas', {nombre_mesa: req.body.nombre_mesa, capidad: req.body.capidad})
})

// Post - Busca si el cliente existe y si no crea el cliente
app.post('/index/:restaurante/:mesa/busqueda', (req, res) => {
    // console.log("post", req.params.restaurante)
    // console.log("post", req.params.mesa)
    // console.log("post", req.body.cedula)
    // res.send({cedula: req.body.cedula, restaurante: req.body.restaurante, mesa: req.body.mesa})
    // res.render("resultado", {cedula: req.body.cedula, restaurante: req.params.restaurante, mesa: req.params.mesa})
    res.redirect("/index/" + req.params.restaurante + "/" + req.params.mesa + "/" + req.body.cedula)
})
// Get - Lista las mesas del restaurante seleccionado
app.get('/index/:restaurante/:mesa/busqueda', (req, res) => {
    console.log('----------->  log: Preparando busqueda de cliente.')
    res.render('busqueda', {restaurante: req.params.restaurante, mesa: req.params.mesa, cedula: req.body.cedula})
})

app.post('/home', (req, res) => {
    res.render('home')
    console.log("home")
})

app.get('/reservar_restaurante', (req, res, next) => {
    // res.render('reservar_restaurante', {nombre: "Romina"})
    console.log(req.body)
    res.render('reservar_restaurante', {})

})

app.post('/reservar_restaurante', (req, res, next) => {
    console.log(req.body)
    res.render('reservar_restaurante', {nombre: req.body.nombre, direccion: req.body.direccion})
})

require("./app/routes/cliente.routes")(app);
require("./app/routes/restaurante.routes")(app);
require("./app/routes/mesa.routes")(app);
require("./app/routes/reserva.routes")(app);
require("./app/routes/seleccion_reserva.routes")(app);
require("./app/routes/index.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
    console.log('Servidor corriendo en puerto 9090.');
});