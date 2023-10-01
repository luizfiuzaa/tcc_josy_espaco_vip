<?php
	$host = "localhost"; // endereço do servidor
	$usuario = "root"; // usuário do MySQL
	$senha = "03312006@Luiz"; // senha do MySQL
	$database = "josy_espaco_vip"; // nome do banco de dados

	// Cria a conexão
	$connection = new mysqli($host, $usuario, $senha, $database);
	
	// Checa se a conexão foi realizada com sucesso
	if ($connection->connect_error) {
	    die("Falha de conexão: " . $connection->connect_error);
	}
?>