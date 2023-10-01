<?php
include '../../cors.php';
include '../../conn.php';


try {
    $sql = "SELECT * FROM cliente";

    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $clientes = [];
        while ($row = $result->fetch_assoc()) {
            array_push($clientes, $row);
        }

        echo json_encode([
            'success' => 1,
            'clientes' => $clientes,
        ]);

    } else {

        echo json_encode([
            'success' => 0,
            'clientes' => 'Sem clientes...',
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