const mongoose = require('mongoose')
const db_atlas = require('./db_atlas')
//Configuração do mongoose
//mongoose.Promise = global.Promise;
//
//mongodb+srv://cdb:<faculdade18>@cluster0.mvho6.mongodb.net/?retryWrites=true&w=majority
//try{
mongoose.connect('./db_atlas.MONGODB_URI').then(() => {

  //  useNewUrlParser: true,
  //useUnifiedTopology: true,
    console.log("MongodB temps conectado com sucesso!")

})
.catch((err) => {
    console.log("Houve um erro ao se conectar ao mongodB temps: "+err)
})

//Model Temperaturas Dia Mes Ano

const Temps = mongoose.model('Temps',{
    //_id: Number,
    local: String  ,
    temperatura: Number,
    dia: Number,
    mes: Number,
    ano: Number
})

module.exports = Temps








