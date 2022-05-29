// Carrega o modulo HTTP do Node
var http = require("http");

var fs = require('fs');
var contents = fs.readFileSync('Grafico.php');
// Cria um servidor HTTP e uma escuta de requisições para a porta 8000
http.createServer(function(req, res){
  var contents = fs.readFileSync('Grafico.php');
  // Configura o cabeçalho da resposta com um status HTTP e um Tipo de Conteúdo
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(contents);
  return res.end();
 
}).listen(8000, '127.0.0.1');

// Imprime no console a URL de acesso ao servidor
console.log('Servidor executando em http://127.0.0.1:8000/');