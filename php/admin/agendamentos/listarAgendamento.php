<?php
include '../cors.php';
include '../conn.php';

$sql = "SELECT * FROM agendamento";

$result = $connection->query($sql);

if ($result->num_rows > 0) {
    $agendamentos = [];
    while ($row = $result->fetch_assoc()) {
        array_push($agendamentos, $row);
    }

    $response = [
        'agendamentos' => $agendamentos,
    ];

} else {
    $response = [
        'agendamentos' => 'Nenhum registro encontrado!'
    ];
}

//sleep(2);
echo json_encode($response);
?>