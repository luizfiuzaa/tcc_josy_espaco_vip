<?php
include '../../cors.php';
include '../../conn.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
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

    $select_post = "SELECT * FROM `agendamento` WHERE id_cascata=:id";
    $select_stmt = $connection->prepare($select_post);
    $select_stmt->bindValue(':id', $id, PDO::PARAM_STR);
    $select_stmt->execute();

    if ($select_stmt->rowCount() > 0) {

        $delete_lembrete = "DELETE FROM `lembretes` WHERE idCascata=:id";
        $delete_lembrete_stmt = $connection->prepare($delete_lembrete);
        $delete_lembrete_stmt->bindValue(':id', $id, PDO::PARAM_STR);
        $delete_lembrete_stmt->execute();

        $delete_post = "DELETE FROM `agendamento` WHERE id_cascata=:id";
        $delete_post_stmt = $connection->prepare($delete_post);
        $delete_post_stmt->bindValue(':id', $id, PDO::PARAM_STR);

        if ($delete_post_stmt->execute()) {

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