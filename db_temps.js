const mongoose = require('mongoose')
 const db_atlas = require('./db_atlas')
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








