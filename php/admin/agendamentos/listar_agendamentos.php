<?php
include '../../cors.php';
include '../../conn.php';


try {
    $sql = "SELECT * FROM agendamento";

    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $agendamentos = [];
        while ($row = $result->fetch_assoc()) {
            array_push($agendamentos, $row);
        }

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