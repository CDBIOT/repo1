setInterval(function()
{
	//getData();
	 // drawGraph();
  drawAjax();
   draw_Chart2();
}, 10000);


function drawAjax(){
// //   google.charts.load('current',{ packages:['corechart']}).then(function () {
   $.ajax({
      url: '/dados/jsonTemp.json',
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

         for (var i = 0; i < jsonTemp.length; i++)
          {
           var row = [jsonTemp[i].Hora, jsonTemp[i].Temp];
            data.push(row);
          }
         
 var linhas = new google.visualization.LineChart(document.getElementById('linhas'));

 linhas.draw(data);
}
        
var getdata = function getData()
    {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
    if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200)
    {
      var myObj = JSON.parse(this.responseText);
      
     // for (var i = 0; i < 5; i++)
      {
     var numero1 = document.getElementById('Temp1').innerText= parseInt(myObj.Tempo.Tempo);
     var numero2 = document.getElementById('Temp1').innerText= parseInt(myObj.h2);
     var numero3 = document.getElementById('Temp1').innerText= parseInt(myObj.h3);
     var numero4 = document.getElementById('Temp1').innerText= parseInt(myObj.h4);
     var numero5 = document.getElementById('Temp1').innerText= parseInt(myObj.h5);
       // document.getElementById('Temp1').innerText= myObj.Hora[i];
      //document.getElementById('Temp2').innerHTML= myObj.h2 + 'C';
    }
  //     values.push(myObj);
  //     timeStamp.push(time);
  //     showGraph();	//Update Graphs
	//   var row = table.insertRow(1);	//Add after headings
	//   var cell1 = row.insertCell(0);
	//   var cell2 = row.insertCell(1);
	//   cell1.innerHTML = Dia;
	//   cell2.innerHTML = temp;
    console.log(myObj);
    console.log(Temp1);
    console.log(Temp2);
    console.log(Temp3);
    console.log(Temp4);
    console.log(Temp5);
  }   
}
}
  function drawChart()
  {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Dia');
    data.addColumn('number', 'Temp');
    data.addRows([      
      ['01', numero1],
      ['02', numero2],
      ['03', numero3],
      ['04', numero4],
      ['05', numero5],
      ]);

    var options  = {
      'title' : 'TEMP/DIA',
      'width' : 400,
      'height': 300
    };
    //instanciando e desenhando o grafico linhas
    var divgraf = new google.visualization.LineChart(document.getElementById('divgraf'));
    divgraf.draw(data,options);

    xmlhttp.open('GET', "/dados/jsonTemp.json",true);
    xmlhttp.send();
  }

  