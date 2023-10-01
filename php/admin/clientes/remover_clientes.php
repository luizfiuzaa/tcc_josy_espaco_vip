<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));
$id = $_GET['id'];

if (!isset($id)) {
    echo json_encode(['success' => 0, 'message' => 'Please provide the post ID.']);
    exit;
}

$sql = "DELETE FROM cliente WHERE CodFun=$id";

if ($connection->query($sql) === true) {

    if ($fetch_stmt->num_rows > 0) {

        echo json_encode([
            'success' => 1,
            'message' => 'Record Deleted successfully'
        ]);
        exit;
    }

    echo json_encode([
        'success' => 0,
        'message' => 'Cliente not delete. Something went wrong.'
    ]);
    exit;
} else {
    echo json_encode(['success' => 0, 'message' => 'Invalid ID. No posts found by the ID.']);
    exit;
}
?>