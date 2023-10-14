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
    $select = "SELECT * FROM mensagem";

    $stmt = $connection->prepare($select);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $mensagens = [];

        $mensagens = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => 1,
            'mensagens' => $mensagens,
        ]);

    } else {

        echo json_encode([
            'success' => 0,
            'mensagens' => 'Sem mensagens...',
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