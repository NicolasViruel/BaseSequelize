const server = require("./src/app");
const dataBase = require("./src/db");

//al iniciar utilizamos el metodo force:true
server.listen("3001", async () =>{
    // await dataBase.sync();
    await dataBase.sync({force:true}); //eliminar todas las tablas y volver a crearlas como esten definidas en el modelo
    // await dataBase.sync({alter:true}); //modificar las tablas existentes en base a como esten definidas en el modelo
    console.log("Server listening in Port 3001");
})
