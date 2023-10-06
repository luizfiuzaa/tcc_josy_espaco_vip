<?php
$host = "localhost"; // endereço do servidor
$usuario = "root"; // usuário do MySQL
// $senha = "#Frngoclimao20"; // senha do MySQL
$senha = ""; // senha do MySQL
$database = "josy_espaco_vip"; // nome do banco de dados

// Cria a conexão
try {
	$connection = new PDO('mysql:host=' . $host . ';dbname=' . $database, $usuario, $senha);
	$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	echo "Connection error " . $e->getMessage();
	exit;
}
?>