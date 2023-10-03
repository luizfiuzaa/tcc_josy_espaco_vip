<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

try {
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

$stmt->bindValue(':hora_inicio_agendamento', $hora_inicio_agendamento, PDO::PARAM_STR);
$stmt->bindValue(':hora_fim_agendamento', $hora_fim_agendamento, PDO::PARAM_STR);
$stmt->bindValue(':data_agend', $data_agend, PDO::PARAM_STR);
$stmt->bindValue(':status_agendamento', $status_agendamento, PDO::PARAM_STR);
$stmt->bindValue(':cli_agendamento', $cli_agendamento, PDO::PARAM_STR);
$stmt->bindValue(':serv_agendamento', $serv_agendamento, PDO::PARAM_STR);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode([
        'success' => 1,
        'message' => 'Data Inserted Successfully.'
    ]);
    exit;
}

echo json_encode([
    'success' => 0,
    'message' => 'There is some problem in data inserting'
]);
exit;

} catch (PDOException $e) {
http_response_code(500);
echo json_encode([
    'success' => 0,
    'message' => $e->getMessage()
]);
exit;
}
?>