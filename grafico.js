setInterval(function()
{
//	getData();
	 // drawGraph();
  //drawAjax();
  // draw_Chart2();
}, 10000);


function drawAjax(){
// //   google.charts.load('current',{ packages:['corechart']}).then(function () {
   $.ajax({
      url: 'http://127.0.0.1:8081/temps',
      method: 'GET',
      dataType: "json",
      success: function(resposta) {
//    drawChart(result);
//        }, 
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Mês');
        data.addColumn('number', 'Faturamento Por Mês');

        for (var i = 0; i < jsonData.length; i++)
        {
            mes = resposta[i].Mes;
            total = resposta[i].Total;
            data.addRow([mes, total]);
        }
      console.log(resposta);  
             
      // Create our data table out of JSON data loaded from server.
      var data = new google.visualization.DataTable(resposta);
      
      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, {width: 400, height: 240});

     }
 });

}

// function drawChart(result)
//  {
//     var data = new google.visualization.DataTable();
//     data.addColumn('string', 'DIA');
//     data.addColumn('number', 'Temp');

//     var dataArray = [];
//     $.each(result, function(i, obj) 
//     {
//       dataArray.push([myobj.h1, parseInt(myobj.h2)]);
//     });
//     data.addRows(dataArray);

//     var piegraf_options = 
//     {
//       title : 'TEMP/DIA',
//       width : 400,
//       height: 300,
//       is3D: true,
//     };

//     console.log(data)
//     var piechart = new google.visualization.PieChart(document.getElementById('piegraf'));
//     piegraf.draw(data, piegraf_options);
//   }


function draw_Chart2()

{
 var data = google.visualization.arrayToDataTable();
      ['Hora', 'Temp']

         for (var i = 0; i < hora1.length; i++)
          {
           var row = [hora1[i].Hora, hora1[i].Temp];
            data.push(row);
          }
         
 var linhas = new google.visualization.LineChart(document.getElementById('linhas'));

 linhas.draw(data);
}
        
async function getData(){	
  const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
                     }
    const response =fetch('https://polar-beyond-82520.herokuapp.com/mqtt')
    //const response = fetch('http://127.0.0.1:8081/mqtt')
    .then(function (response){
    return response.text()})
    .then(data=>{
    console.log(data)
    const myObj = JSON.parse(data)
     // for (var i = 0; i < 5; i++)
     var numero1 = document.getElementById('Temp1').innerText= parseInt(myObj.vm.temp);
     var numero2 = document.getElementById('Temp2').innerText= parseInt(myObj.vm.temp);
     var numero3 = document.getElementById('Temp3').innerText= parseInt(myObj.vm.temp);
     var numero4 = document.getElementById('Temp4').innerText= parseInt(myObj.vm.temp);
     var numero5 = document.getElementById('Temp5').innerText= parseInt(myObj.vm.temp);
     
  //     values.push(myObj);
  //     timeStamp.push(time);
  //     showGraph();	//Update Graphs
	//   var row = table.insertRow(1);	//Add after headings
	//   var cell1 = row.insertCell(0);
	//   var cell2 = row.insertCell(1);
	//   cell1.innerHTML = Dia;
	//   cell2.innerHTML = temp;
    console.log(Temp1);
    console.log(Temp2);
    console.log(Temp3);
    console.log(Temp4);
    console.log(Temp5);

    var data = new google.visualization.arrayToDataTable([
     ['Dia','Temp'],
     ['01', numero1],
     ['02', numero2],
     ['03', numero3],
     ['04', numero4],
     ['05', numero5]
     ]);

    var options  = {
      'title' : 'TEMP/DIA',
      'width' : 400,
      'height': 300
    };
    //instanciando e desenhando o grafico linhas
    var divgraf = new google.visualization.LineChart(document.getElementById('divgraf'));
    divgraf.draw(data,options);
  })  
 
}

  function drawChart()
  {
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
                     }
    const response =fetch('https://polar-beyond-82520.herokuapp.com/mqtt')
    //const response = fetch('http://127.0.0.1:8081/mqtt')
    .then(function (response){
    return response.text()})
    .then(data=>{
    console.log(data)
    const myObj = JSON.parse(data)
     // for (var i = 0; i < 5; i++)
     var numero1 = document.getElementById('Temp1').innerText= parseInt(myObj.vm.temp);
     var numero2 = document.getElementById('Temp2').innerText= parseInt(myObj.vm.temp);
     var numero3 = document.getElementById('Temp3').innerText= parseInt(myObj.vm.temp);
     var numero4 = document.getElementById('Temp4').innerText= parseInt(myObj.vm.temp);
     var numero5 = document.getElementById('Temp5').innerText= parseInt(myObj.vm.temp);
     
   // var data = google.visualization.arrayToDataTable([
      var data = google.visualization.arrayToDataTable([
        ['DIA', 'TEMP'],
        ['01', 1],
        ['02', 2],
        ['03', 3],
        ['04', 4],
        ['05', 5]
      ]);
    var options  = {
      'title' : 'TEMP/DIA',
      'width' : 400,
      'height': 300
    };
    //instanciando e desenhando o grafico linhas
    var divgraf = new google.visualization.LineChart(document.getElementById('divgraf'));
    divgraf.draw(data,options);

  })
}

  