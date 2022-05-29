if(process.env.NODE_ENV == "production"){
module.exports = {mongoURI: "mongodb+srv://cdb:faculdade18@cluster0.mvho6.mongodb.net/?retryWrites=true&w=majority"}
}else{
module.exports ={mongoURI:"mongodb://localhost/Temps"}

}

