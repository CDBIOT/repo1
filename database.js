
const Sequelize = require('sequelize')
const sequelize = new Sequelize('temperaturas', 'root','admin', {
    host: "localhost",
    dialect: 'mysql'
})
module.exports = sequelize;

sequelize.authenticate()
// .then(function(){
//     console.log("Conectado com sucesso!")
// }).catch(function(erro){
//     console.log("Falha ao se conectar: "+erro)
// })


//CREATE TABLE temps(id int, local varchar(50), hora int, dia int, mes int, ano int);
//INSERT INTO temps(id, local, hora, dia, mes, ano) VALUES(0,"Sala", 0, 1,4,2022);