<?php
include '../../cors.php';
include '../../conn.php';


try {
    $sql = "SELECT * FROM servico";

    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $servicos = [];
        while ($row = $result->fetch_assoc()) {
            array_push($servicos, $row);
        }

        echo json_encode([
            'success' => 1,
            'servicos' => $servicos,
        ]);

    } else {

        echo json_encode([
            'success' => 0,
            'servicos' => 'Sem servicos...',
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