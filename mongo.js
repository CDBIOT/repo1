const mongoose = require('mongoose')

//Configuração do mongoose
//mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/mongo_data").then(() => {
    console.log("MongodB conectado com sucesso!")

}).catch((err) => {
    console.log("Houve um erro ao se conectar ao mongodB: "+err)
})

//Model User
//Definindo o model
//Tabela User
const Person = mongoose.model('Person',{
    nome: String  ,
    sobrenome: String,
    idade: Number,
})


module.exports = Person