<?php
include '../../cors.php';
include '../../conn.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET'){
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Reqeust Detected! Only get method is allowed',
    ]);
    exit;
}

try {
    $select = "SELECT * FROM lembretes";

    $stmt = $connection->prepare($select);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $lembretes = [];

        $lembretes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => 1,
            'lembretes' => $lembretes,
        ]);

    } else {

        echo json_encode([
            'success' => 0,
            'lembretes' => 'Sem lembretes...',
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