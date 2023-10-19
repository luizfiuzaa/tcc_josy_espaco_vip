<?php
	include '../../cors.php';
	include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

try {

    $data_inicio_agendamento = htmlspecialchars(trim($data->data_inicio_agendamento));
    $data_fim_agendamento = htmlspecialchars(trim($data->data_fim_agendamento));
    $status_agendamento = htmlspecialchars(trim($data->status_agendamento));
    $fk_id_cli = htmlspecialchars(trim($data->fk_id_cli));
    $fk_id_serv = htmlspecialchars(trim($data->fk_id_serv));

    $query = "INSERT INTO `agendamento`(
        data_inicio_agendamento,
        data_fim_agendamento,
        status_agendamento,
        fk_id_cli,
        fk_id_serv
        ) 
        VALUES(
        :data_inicio_agendamento,
        :data_fim_agendamento,
        :status_agendamento,
        :fk_id_cli,
        :fk_id_serv
        )";

    $stmt = $connection->prepare($query);

    $stmt->bindValue(':data_inicio_agendamento', $data_inicio_agendamento, PDO::PARAM_STR);
    $stmt->bindValue(':data_fim_agendamento', $data_fim_agendamento, PDO::PARAM_STR);
    $stmt->bindValue(':status_agendamento', $status_agendamento, PDO::PARAM_STR);
    $stmt->bindValue(':fk_id_cli', $fk_id_cli, PDO::PARAM_STR);
    $stmt->bindValue(':fk_id_serv', $fk_id_serv, PDO::PARAM_STR);

    if ($stmt->N()) {

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