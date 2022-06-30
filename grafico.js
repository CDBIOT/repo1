setInterval(function()
{
//	getData();
	 // drawGraph();
  //drawAjax();
  // draw_Chart2();
}, 10000);


// function Dia(){
// // //   google.charts.load('current',{ packages:['corechart']}).then(function () {

//    var jsonData =$.ajax({
//       url: 'https://polar-beyond-82520.herokuapp.com/temps',

//       method: 'GET',
//       dataType: "json",
//       async: false
//         }).responseText
//     //  success: function(resposta) {
// //    drawChart(result);
// //        }, 

//         var data = new google.visualization.DataTable(jsonData);
//         data.addColumn('number', 'Dia');
//         data.addColumn('number', 'Temperatura');

//         for (var i in resposta.temps)
//         {
//             dia = resposta.temps[i].dia;
//             temperatura = resposta.temps[i].temperatura;
//             data.addRow([dia, temperatura]);
//         }
//       //console.log(resposta);  
             
//       // Create our data table out of JSON data loaded from server.
//       var data = new google.visualization.DataTable(resposta);
      
//       // Instantiate and draw our chart, passing in some options.
//       var chart = new google.visualization.LineChart(document.getElementById('graph_dia'));
//       chart.draw(data, {width: 400, height: 240});

//      }
// });

//}

  function Dia(result)
  {
     var data = new google.visualization.DataTable();
     data.addColumn('number', 'DIA');
     data.addColumn('number', 'Temp');

     var dataArray = [];
     $.each(result, function(i, MyObj) 
     {
       dataArray.push([myObj.dia[i], parseInt(myObj.tempemperatura[i])]);
     });
     data.addRows(dataArray);

     var graf_options = 
     {
      title : 'TEMP/DIA',
       width : 400,
       height: 300,
       is3D: true,
     };

     console.log(data)
     var chart = new google.visualization.LineChart(document.getElementById('graph_dia'));
     chart.draw(data, graf_options);
   } 


         
        
async function Mes(){	

  const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
                     }
    const response =fetch('https://polar-beyond-82520.herokuapp.com/temps')
    //const response = fetch('http://127.0.0.1:8081/mqtt')
    .then(function (response){
    return response.text()})
    .then(data=>{
    //console.log(data)
    const myObj = JSON.parse(data)
  
    var dados_graf = new google.visualization.DataTable();
    //var dados_graf = new google.visualization.arrayToDataTable([
      dados_graf.addColumn('string', 'Dia');
      dados_graf.addColumn('number', 'Temp');
    //var dataArray = [];

    //['Mês','Temp'],

     for (var k in myObj.temps)
     {
      var row = [myObj.temps[k].dia,  myObj.temps[k].temperatura]
      //var row = [`${myObj.temps[k].dia}`, `${myObj.temps[k].temperatura}`]
    //dados_graf.push(row);
    }
    
    
    var options  = {
      'title' : 'GRAPH_MES',
      'width' : 400,
      'height': 300
    };
    //instanciando e desenhando o grafico linhas
    var divgraf = new google.visualization.LineChart(document.getElementById('graph_mes'));
    divgraf.draw(dados_graf,options);
  })  

}
  function Ano()
  {
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
                     }
    const response =fetch('https://polar-beyond-82520.herokuapp.com/temps')
    //const response = fetch('http://127.0.0.1:8081/mqtt')
    .then(function (response){
    return response.text()})
    .then(data=>{
   // console.log(data)
    const myObj = JSON.parse(data)
    for (var k in myObj.temps){ 
        
      var data = google.visualization.arrayToDataTable([
        //var numero1 = document.getElementById('Temp1').innerText= parseInt(myObj.vm.temp);
      
        ['DIA', 'TEMP'],
        
        [k, parseInt(myObj.temps[k].temperatura)],
        
      ]);
    }
    var options_graf = {
      'title' : 'GRAPH_ANO',
      'width' : 400,
      'height': 300
    };
    //instanciando e desenhando o grafico linhas
    var linhas = new google.visualization.LineChart(document.getElementById('graph_ano'));
    linhas.draw(data,options_graf);

  })
}

 function draw_table(){
	//Obtem dados do banco de dados
		const options = {method: 'GET',	mode: 'cors',cache: 'default'}
		fetch('https://polar-beyond-82520.herokuapp.com/temps')
		.then(function (response){
			return response.text()})
		.then(data=>{
		const myObj = JSON.parse(data)

	  let table = document.getElementById('mytable');
	
	  for (var k in myObj.temps)
  {
	//	  for (const [key, value] of Object.entries (myObj.temps[k])) 
      {

			var tr = table.insertRow();
			var td_local = tr.insertCell();
			var td_temperatura = tr.insertCell();
			var td_dia = tr.insertCell();
			var td_mes = tr.insertCell();
			var td_ano = tr.insertCell();

			td_local.innerHTML = myObj.temps[k].local
			td_temperatura.innerHTML = myObj.temps[k].temperatura
			td_dia.innerHTML = myObj.temps[k].dia
			td_mes.innerHTML = myObj.temps[k].mes
			td_ano.innerHTML = myObj.temps[k].ano
			
	    //  console.log(`${key}: ${value}`);
	  
   // `<tr> <td> ${myObj.temps[k].local}</td> <td>${myObj.temps[k].temperatura}</td> <td>${myObj.temps[k].dia}</td> <td>${myObj.temps[k].mes}</td> <td>${myObj.temps[k].ano}</td> <tr>`

	    //console.log(i + " - " + myObj.temps[i].temperatura)
    	//table.innerHTML += row;  
    }
  }
  
})

}