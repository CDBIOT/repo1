if(process.env.NODE_ENV == "production"){
module.exports = {MONGODB_URI: "mongodb+srv://cdb:abcdeF12345@cluster0.mvho6.mongodb.net/test"},


//module.exports = {URI: "https://polar-beyond-82520.herokuapp.com/"},
{
useNewUrlParser: true,
useUnifiedTopology: true
}
}else{
module.exports ={MONGODB_URI:"mongodb://localhost/Temps"}
//module.exports ={URI: "http://127.0.0.1:8081/temps"}
}

