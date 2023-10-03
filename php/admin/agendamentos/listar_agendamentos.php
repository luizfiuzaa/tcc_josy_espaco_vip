<?php
include '../../cors.php';
include '../../conn.php';

try {
    $sql = "SELECT * FROM agendamento";

    $stmt = $connection->prepare($sql);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $agendamentos = [];

        $agendamentos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => 1,
            'agendamentos' => $agendamentos,
        ]);

    } else {

        echo json_encode([
            'success' => 0,
            'agendamentos' => 'Sem agendamentos...',
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