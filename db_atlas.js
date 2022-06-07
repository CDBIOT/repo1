if(process.env.NODE_ENV == "production"){
module.exports = {MONGODB_URI: "mongodb+srv://cdb:Faculdade18@cluster0.mvho6.mongodb.net/?retryWrites=true&w=majority"},
{
useNewUrlParser: true,
useUnifiedTopology: true
}
}else{
module.exports ={MONGODB_URI:"mongodb://localhost/Temps"}

}

