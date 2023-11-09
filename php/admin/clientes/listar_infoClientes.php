<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

try {
    $id = $_GET['id'];

    $sql = "SELECT `hora_inicio_agendamento`,`hora_fim_agendamento`,`data_agend`,`serv_agendamento`,`preco_agend` FROM `agendamento` WHERE fk_id_cliente = :fk_id_cliente";

    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':fk_id_cliente', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => 1,
            'data' => $result
        ]);

    } else {
        echo json_encode([
            'success' => 0,
            'data' => 'Nenhum resultado encontrado para o ID do cliente.'
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
?>