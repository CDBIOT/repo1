
<?php
conexao();

function conexao()
{

$banco 	 = 'bdnodemcu';
$usuario = 'root';
$senha 	 = '';
$host    = 'localhost';

$comm = mysql_connect($host,$usuario,$senha) or die ('Erro na rotina de conexao: '.mysql_error());
mysql_select_db($banco) or die ('Erro ao selecionar banco de dados: '.mysql_error());;

}

?>

<?php 

$servidor = "localhost";
$arqServidor = dados\jsonTemp;
$senha = "";
$usuario = "cdbiot";
$arqLocal = f:\www\dados\jsonTemp.json;
$PATH_INFO = files.000webhost.com;

if (( $arqServidor != "") and ( $arqLocal != "") and ( $servidor != "") and ( $senha != "") and ( $usuario != "")) 

	{ 
  	$conn_id = ftp_connect("$servidor"); // conex�o com servidor de FTP 

  	if ( !$conn_id ) 
		{ // checa conex�o 
		echo "<font color='red'>N�o foi poss�vel conectar ao servidor <b>$servidor</b>.</font><br>"; 
   		} 
  	 	else 
  		 {
    		 echo "Conectado ao servidor <b>$servidor</b>.<br>"; 
    		 $login_result = ftp_login($conn_id, "$usuario", "$senha"); // login 
    		 

   			if ( !$login_result ) 
			{ // checa usu�rio e senha 
     			 echo "<font color='red'>Usu�rio: <b>$usuario</b> ou senha inv�lidos.</font><br>"; 
    			} 
			else 
			{ 
      			echo "Autentica��o do usu�rio <b>$usuario</b> realizada com sucesso.<br><br><br>"; 
      			switch ($copia) 
			{ 
      			case "Download": 
        		$download = ftp_get($conn_id, "$arqLocal", "$arqServidor", FTP_ASCII); // download do arquivo 
        	
			if (!$download) 
				{  // checa download do arquivo 
          			echo "<font color='red'>O download do arquivo <b>$arqServidor</b> falhou!</font><br>"; 
        			} 	
				else 
				{ 
          			echo "Download do arquivo <b>$arqServidor</b> realizado com sucesso.<br>"; 
        			} 
        			break; 
	
      	case "Upload": 
        $upload = ftp_put($conn_id, "$arqServidor", "$arqLocal", FTP_ASCII); // upload do arquivo 

        if (!$upload) 
	{  // checa download do arquivo 
          echo "<font color='red'>O upload do arquivo <b>$arqLocal</b> falhou!</font><br>"; 
        } 
	else 
	{ 
         echo "Upload do arquivo <b>$arqLocal</b> realizado com sucesso.<br>"; 
        } 
        break; 
      	} 
	
      ftp_quit($conn_id); // fecha conex�o com servidor de FTP 
    	} 
  	} 
	} 
	
	else 
	{ 
 	 echo "Voc� deve preencher todos os campos acima para que a opera��o seja realizada!<br>"; 
	} 

?> 
