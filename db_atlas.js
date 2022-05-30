if(process.env.NODE_ENV == "production"){
module.exports = {MONGODB_URI: "mongodb+srv://cdb:faculdade18@cluster0.mvho6.mongodb.net/?retryWrites=true&w=majority"}
}else{
module.exports ={MONGODB_URI:"mongodb://localhost/Temps"}

}

