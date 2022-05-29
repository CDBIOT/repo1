<!DOCTYPE html>  
<html>
<title>Grafico</title>
<meta charset="UTF-8" />
<head> 
<link rel="stylesheet" type="text/css" href="css.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="./grafico.js"></script>
<script type='text/javascript' src="https://www.gstatic.com/charts/loader.js"></script>
</head>
<body>
<div class ="main">

    <div class="botao_home">
	    <form name="home" action="/index.html" method="post">
		    <input type="image" src="imagens/home_btn.png" onClick="this.form.submit()">
	    </form>
    </div>
</div>  

<section class="botãochart">
    <div class="container1">
     <div class="botão_chart">
        <form name="apaga" action="#" method="get">
            <input type="image" src = "/imagens/graph_btn.png" onClick="draw_Chart2()">
        </form>
        <form name="apaga" action="#" method="get">
            <input type="image" src = "/imagens/temp_btn.png" onClick="drawAjax()">
        </form>
        <form name="apaga" action="#" method="get">
            <input type="image" src = "/imagens/lamp_btn.png" onClick="getData()">
        </form>
     </div>
</section>

<section class="chart">
     <div class="container3">
        <div class="charts">
            <div id='chart_div'></div>
            <div id='divgraf'></div>
            <div id='linhas'></div>
       
        </div>
    </div>
</section>

<section class="table">
    <div class="container2">
        <div class="_dados">
            <h3>
	         <table>
	                <tr><th>TEMP </th></tr>
                    <tr><td><h2>01</h2></td><td><h2 id ='Temp1'></h2></td></tr>
                    <tr><td><h2>02</h2></td><td><h2 id ='Temp2'></h2></td></tr>       
                    <tr><td><h2>03</h2></td><td><h2 id ='Temp3'></h2></td></tr>   
                    <tr><td><h2>03</h2></td><td><h2 id ='Temp4'></h2></td></tr>   
                    <tr><td><h2>03</h2></td><td><h2 id ='Temp5'></h2></td></tr>   
                    
	        </table>
                <ul>
                </ul>
            </h3>
        </div>
    </div>
</div>
</section>

</body>
</html>