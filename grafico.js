setInterval(function()
{
//	getData();
	 // drawGraph();
  //drawAjax();
  // draw_Chart2();
}, 10000);


//  function Dia(){
// // // //   google.charts.load('current',{ packages:['corechart']}).then(function () {
    
//       var resposta =$.ajax({
//        method: 'GET',
//        url: 'https://polar-beyond-82520.herokuapp.com/temps'
// //       dataType: "json",
//          }).done (function(resposta) {
// // //    drawChart(result);
//           var dataArray = Array.from(resposta.temps);

//          var data = new google.visualization.DataTable(dataArray)
//          data.addColumn('number', 'Dia');
//          data.addColumn('number', 'Temperatura');

//          for (var i in resposta.temps)
//          {
//             let dia = resposta.temps[i].dia
//             let temperatura = resposta.temps[i].temperatura
//              data.addRow([dia, temperatura])
//           }
//        console.log(resposta);  
   
//       var chart = new google.visualization.LineChart(document.getElementById('graph_dia'));
//       chart.draw(data, {width: 400, height: 240});
//     }
// }


  function Dia(result)
  {
    
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
                   }
  const response =fetch('https://polar-beyond-82520.herokuapp.com/temps')
  .then(function (response){
    return response.text()})
    .then(data=>{
    const myObj = JSON.parse(data);
    var dataArray = Array.from(myObj.temps);
    console.log("dataArray: ", dataArray)

    var dataArray2=[];

    for (var i in dataArray){
        dataArray2.push([dataArray[i].dia, (dataArray[i].temperatura)]);
    }

    for (var k in dataArray){
    var data2 = new google.visualization.arrayToDataTable([
       ['Mês','Temp'],
       [[dataArray2[0][0]],[dataArray2[0][1]]],
       [[dataArray2[1][0]],[dataArray2[1][1]]],
       [[dataArray2[2][0]],[dataArray2[2][1]]],
       [[dataArray2[3][0]],[dataArray2[3][1]]],
       [[dataArray2[4][0]],[dataArray2[4][1]]],
       [[dataArray2[5][0]],[dataArray2[5][1]]],
       [[dataArray2[6][0]],[dataArray2[6][1]]],
       [[dataArray2[7][0]],[dataArray2[7][1]]],
       [[dataArray2[8][0]],[dataArray2[8][1]]],
       [[dataArray2[10][0]],[dataArray2[10][1]]],
       [[dataArray2[11][0]],[dataArray2[11][1]]],
       [[dataArray2[12][0]],[dataArray2[12][1]]],
       [[dataArray2[13][0]],[dataArray2[13][1]]],
       [[dataArray2[14][0]],[dataArray2[14][1]]],
       [[dataArray2[15][0]],[dataArray2[15][1]]],
       [[dataArray2[16][0]],[dataArray2[16][1]]],
       [[dataArray2[17][0]],[dataArray2[17][1]]],
       [[dataArray2[18][0]],[dataArray2[18][1]]],
       [[dataArray2[20][0]],[dataArray2[20][1]]],
       [[dataArray2[21][0]],[dataArray2[21][1]]],
       [[dataArray2[22][0]],[dataArray2[22][1]]],
       [[dataArray2[23][0]],[dataArray2[23][1]]],
       [[dataArray2[24][0]],[dataArray2[24][1]]],
       [[dataArray2[25][0]],[dataArray2[25][1]]],
       [[dataArray2[26][0]],[dataArray2[26][1]]],
       [[dataArray2[27][0]],[dataArray2[27][1]]],
       [[dataArray2[28][0]],[dataArray2[28][1]]],
       [[dataArray2[30][0]],[dataArray2[30][1]]],
      

    ])
  }
    console.log("data2: ",data2)
     var graf_options = 
     {
      title : 'TEMP/DIA',
       width : 400,
       height: 300,
       is3D: true,
     };
  

     var chart = new google.visualization.LineChart(document.getElementById('graph_dia'));
     chart.draw(data2, graf_options);
     
    })
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
    var dataArray = Array.from(myObj.temps);
    console.log("dataArray:",dataArray)
    dataArray2=[];
    for (var i in dataArray){
      dataArray2.push([dataArray[i].dia, (dataArray[i].temperatura)]);
  }
   console.log("dataArray2:",dataArray2)

   for (var k in dataArray)
   {
     var dados_graf = new google.visualization.arrayToDataTable([
      // dados_graf.addColumn('number', 'Dia')
      //dados_graf.addColumn('number', 'Temp')
      ['Mês','Temp'], 
      [[dataArray[k]],[dataArray[k]]],
     
      ])
    }
    console.log(dados_graf);
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
    var dataArray2 = Array.from(myObj.temps);
   
   // dataArray2.push( ['ANO', 'TEMP']);
   for (var k in dataArray2){
   // var dia = dataArray2[0]
  //  var temp = dataArray2[1] 

    var data2 = google.visualization.arrayToDataTable([
    ['ANO', 'TEMP'],
    [[dataArray2[0]],[dataArray2[1]]]
    ]);
  }
  console.log(data2)
    var options_graf = {
      'title' : 'GRAPH_ANO',
      'width' : 400,
      'height': 300
    };
    //instanciando e desenhando o grafico linhas
    var linhas = new google.visualization.LineChart(document.getElementById('graph_ano'));
    linhas.draw(data2,options_graf);
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