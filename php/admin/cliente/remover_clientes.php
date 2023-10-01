<?php
	include '../cors.php';
	include '../conexao.php';

    $data = json_decode(file_get_contents("php://input"));
    
    $id =  $_GET['id'];

	$sql = "DELETE FROM cliente WHERE id_cliente='$id'";

    if ($connection->query($sql) === true) {
        $response = [
            'mensagens' => 'Registro apagado com sucesso!'
        ];
    } else {
        $response = [
            'mensagem' => $connection->error
        ];
    }
    echo json_encode($response);
?>