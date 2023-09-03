const express = require("express");
const morgan = require("morgan");
const moment = require("moment");
const {User} = require("./db");

const server= express();
//inicializamos morgan y parceamos a json
server.use(express.json());
server.use(morgan("dev"));

//trae todos los usuarios o si le especifico alguno
server.get("/users", async (req, res) =>{
    try {
        const { name } = req.query;
        if (!name) {
            const users = await User.findAll();
            return res.status(200).send(users);
        }else{
            const users = await User.findAll({
                where:{
                    name:name
                }
            });
            return res.status(200).send(users);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"No se encontraron usuarios"});
    }
})

//Trae un solo usuario por su primaryKey
server.get("/users/:id", async (req, res) =>{
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) throw new Error ("Usuario Inexistente");
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"No se encontraron usuarios"});
    }
})

//Crea un usuaio
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

//Crear Varios usarios juntos
server.post("/users/bulks", async(req, res) =>{
    try {

        const data = req.body;
        const newUser = await User.bulkCreate(data);
        res.status(200).send(newUser);
    } catch (error) {
        res.status(400).send({msg:"Error al crear el usuario"});
    }
})

//Borra un usuario por su id
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