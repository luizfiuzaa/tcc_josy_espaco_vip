<?php
	include '../cors.php';
	include '../conexao.php';

	$sql = "SELECT * FROM cliente";

    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $clientes = [];
        while ($row = $result->fetch_assoc()) {
            array_push($clientes, $row);
        }

        $response = [
            'clientes' => $clientes,
        ];

    } else {
        $response = [
            'clientes' => 'Nenhum registro encontrado!'
        ];
    }

    //sleep(2);
    echo json_encode($response);
?>