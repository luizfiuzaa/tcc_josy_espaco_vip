<?php
include '../../cors.php';
include '../../conn.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE'){
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Reqeust detected. HTTP method should be DELETE',
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
$id = $_GET['id'];

if (!isset($id)) {
    echo json_encode(['success' => 0, 'message' => 'Please provide the post ID.']);
    exit;
}

try {

    $select = "SELECT * FROM `lembrete` WHERE id=:id";
    $stmt = $connection->prepare($select);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $delete = "DELETE FROM `lembrete` WHERE id=:id";
        $stmt = $connection->prepare($delete);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {

            echo json_encode([
                'success' => 1,
                'message' => 'Record Deleted successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Could not delete. Something went wrong.'
        ]);
        exit;

    } else {
        echo json_encode(['success' => 0, 'message' => 'Invalid ID. No posts found by the ID.']);
        exit;
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}