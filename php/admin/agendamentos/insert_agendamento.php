<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

$hora_inicio_agendamento = htmlspecialchars(trim($data->horarioInicio));
$hora_fim_agendamento = htmlspecialchars(trim($data->horarioFim));
$data_agend = htmlspecialchars(trim($data->data));
$status_agendamento = htmlspecialchars(trim($data->status));
$fk_id_cli = htmlspecialchars(trim($data->cliente));
$fk_id_serv = htmlspecialchars(trim($data->servico));

$query = "INSERT INTO `agendamento`(
            hora_inicio_agendamento,
            hora_fim_agendamento,
            data_agend,
            status_agendamento,
            cli_agendamento,
            serv_agendamento
        ) 
        VALUES(
           :hora_inicio_agendamento,
           :hora_fim_agendamento,
           :data_agend,
           :status_agendamento,
           :cli_agendamento,
           :serv_agendamento
        )";

$stmt = $connection->prepare($query);

$stmt->bindValue(':hora_inicio_agendamento', $hora_inicio_agendamento);
$stmt->bindValue(':hora_fim_agendamento', $hora_fim_agendamento);
$stmt->bindValue(':data_agend', $data_agend);
$stmt->bindValue(':status_agendamento', $status_agendamento);
$stmt->bindValue(':cli_agendamento', $cli_agendamento);
$stmt->bindValue(':serv_agendamento', $serv_agendamento);

if ($connection->execute($stmt) === true) {
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