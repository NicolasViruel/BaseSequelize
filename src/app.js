const express = require("express");
const morgan = require("morgan");
const moment = require("moment");
const {User, Post, Page} = require("./db");

const server= express();
//inicializamos morgan y parceamos a json
server.use(express.json());
server.use(morgan("dev"));

//trae todos los usuarios o si le especifico alguno
server.get("/users", async (req, res) =>{
    try {
        const { name, last_name } = req.query;
        if (!name) {
            //si quiero restringuir y ver solo algunos elementos (utilizo los attributes)
            const users = await User.findAll({ 
                attributes: ["id" , "name", "last_name"],
                include: [
                    {
                        model: Page,
                        attributes: ["page_name"],
                    },
                ],
             });
            //si quiero excluir algun campo seria asi
            // const users = await User.findAll({ attributes: { exclude: ["birth"]  }});
            return res.status(200).send(users);
        }else{
            const users = await User.findAll({
                where:{
                    name:name,
                    last_name: last_name
                }
            });
            return res.status(200).send(users);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"No se encontraron usuarios"});
    }
})

server.get("/users/findOrCreate", async (req, res) => {
    try {
      const { name, last_name, birth } = req.query; // Obtenemos los parámetros de consulta
      const [user, created] = await User.findOrCreate({
        where: { name },
        defaults: {
          last_name,
          birth,
        },
      });
  
      if (created) {
        res.status(201).send({ msg: "Usuario creado correctamente", user });
      } else {
        res.status(200).send({ msg: "Usuario encontrado", user });
      }
    } catch (error) {
      console.error(error);
      res.status(400).send({ msg: "Error al buscar o crear el usuario" });
    }
});
  

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
        const { name , last_name, birth, pages } = req.body;
        //utilizamos moment para la fecha 
        const formattedBirth = moment(birth, "DD/MM/YYYY").format("YYYY-MM-DD");
        const newUser = await User.create({ name, last_name, birth: formattedBirth });
        await newUser.addPages(pages);
        res.status(200).send(newUser);
    } catch (error) {
        console.log(error);
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


///////// ------------- POST ----------- /////////////


//por mas que el modelo no lo tenga para crear un post necesito un Usuario
server.post("/posts", async (req, res) =>{
    try {
        const {title , contents , userId} = req.body;
        const newPost = await Post.create( {title, contents } ); 
        await newPost.setUser(userId); //el metodo setUser indica de ese post cual es su User
        res.status(200).send(newPost);
        //para relalcionar de un usuario VARIOS post
        // const user = await User.findByPk(userId)
        // user.addPost([2,3,4])

    } catch (error) {
        res.status(400).send({msg:"Error al eliminar el usuario"});
    }
})

//creador de paginas
server.post("/pages", async (req, res) =>{
    try {
        const data = req.body;
        const newPage = await Page.bulkCreate(data);
        res.status(200).send(newPage);
    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"Error al crear las paginas"});
    }
})

module.exports = server;