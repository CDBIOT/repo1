
const mongoose = require('mongoose')

const Cristiano = mongoose.model('User')
//Populando a tabela
new Cristiano({
    nome: "Cristiano",
    sobrenome: "Bento",
    email: "crisdb2008",
    idade: 44
}).save().then(() =>{
    console.log("Usuario cadastrado com sucesso")
}).catch((err) =>{
console.log("Houve um erro ao registrar o usuario!")

})