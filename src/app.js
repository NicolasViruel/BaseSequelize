const express = require("express");
const morgan = require("morgan");
const moment = require("moment");
const {User} = require("./db");

const server= express();
//inicializamos morgan y parceamos a json
server.use(express.json());
server.use(morgan("dev"));


server.get("/users", async (req, res) =>{
    try {
        const user = await User.findAll();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"No se encontraron usuarios"});
    }
})


server.post("/users" , async (req, res) =>{
    //crear un usuario en la BD
    try {
        const { name , last_name, birth } = req.body;
        //utilizamos moment para la fecha 
        const formattedBirth = moment(birth, "DD/MM/YYYY").format("YYYY-MM-DD");
        const newUser = await User.create({ name, last_name, birth: formattedBirth });
        res.status(200).send(newUser);
    } catch (error) {
        res.status(400).send({msg:"Error al crear el usuario"});
    }
});

server.delete("/users/:id" , async (req, res) =>{
    try {
        const { id } = req.body
        const user = await User.findByPk(id);
        await user.destroy();
        res.status(200).send(user);
        console.log(user);
    } catch (error) {
        res.status(400).send({msg:"Error al eliminar el usuario"});
    }
});

module.exports = server;