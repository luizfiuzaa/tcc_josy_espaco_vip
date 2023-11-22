<?php
// Definição do timezone para São Paulo América do Sul.
date_default_timezone_set('America/Sao_Paulo');

$host = "localhost"; // endereço do servidor
$database = "id21424056_josy_espaco_vip"; // nome do banco de dados
$usuario = "root"; // usuário do MySQL
$senha = ""; // senha do MySQL

// Cria a conexão
try {
	$connection = new PDO('mysql:host=' . $host . ';dbname=' . $database, $usuario, $senha);
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	echo "Connection error " . $e->getMessage();
	exit;
}
?>