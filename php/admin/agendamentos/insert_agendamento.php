<?php
include '../../cors.php';
include '../../conn.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){

$data = json_decode(file_get_contents("php://input"));

try {
    
$hora_inicio_agendamento = htmlspecialchars(trim($data->hora_inicio_agendamento));
$hora_fim_agendamento = htmlspecialchars(trim($data->hora_fim_agendamento));
$data_agend = htmlspecialchars(trim($data->data_agend));
$status_agendamento = htmlspecialchars(trim($data->status_agendamento));
$preco_serv = htmlspecialchars(trim($data->preco_agend));
$metodo_pagamento = htmlspecialchars(trim($data->metodo_de_pagamento));
$fk_id_cli = htmlspecialchars(trim($data->cli_agendamento));
$fk_id_serv = htmlspecialchars(trim($data->serv_agendamento));

$query = "INSERT INTO `agendamento`(
            hora_inicio_agendamento,
            hora_fim_agendamento,
            data_agend,
            status_agendamento,
            preco_agend,
            metodo_de_pagamento,
            cli_agendamento,
            serv_agendamento
        ) 
        VALUES(
            :hora_inicio_agendamento,
            :hora_fim_agendamento,
            :data_agend,
            :status_agendamento,
            :preco_agend,
            :metodo_de_pagamento,
            :cli_agendamento,
            :serv_agendamento
        )";

$stmt = $connection->prepare($query);

$stmt->bindValue(':hora_inicio_agendamento', $hora_inicio_agendamento, PDO::PARAM_STR);
$stmt->bindValue(':hora_fim_agendamento', $hora_fim_agendamento, PDO::PARAM_STR);
$stmt->bindValue(':data_agend', $data_agend, PDO::PARAM_STR);
$stmt->bindValue(':status_agendamento', $status_agendamento, PDO::PARAM_STR);
$stmt->bindValue(':preco_agend', $preco_serv, PDO::PARAM_STR);
$stmt->bindValue(':metodo_de_pagamento', $metodo_pagamento, PDO::PARAM_STR);
$stmt->bindValue(':cli_agendamento', $fk_id_cli, PDO::PARAM_STR);
$stmt->bindValue(':serv_agendamento', $fk_id_serv, PDO::PARAM_STR);

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
}
?>