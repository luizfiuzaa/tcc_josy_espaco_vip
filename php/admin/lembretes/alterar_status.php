<?php
include '../../cors.php';
include '../../conn.php';

// if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
//     http_response_code(405);
//     echo json_encode([
//         'success' => 0,
//         'message' => 'Bad Reqeust Detected! Only put method is allowed',
//     ]);
//     exit;
// }

try {

    $data = json_decode(file_get_contents("php://input"));

    foreach ($data as $indice => $lembrete) {
        $id = $lembrete->id;

        $select = "SELECT * FROM `lembretes` WHERE id =:id";
        $stmt = $connection->prepare($select);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {

            $update = "UPDATE `lembretes` SET status = :status WHERE id = :id";
            $update_stmt = $connection->prepare($update);
            $update_stmt->bindValue(':status', 'visto', PDO::PARAM_STR);
            $update_stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $update_stmt->execute();
        }
    }
    echo json_encode([
        'success' => 1,
        'message' => 'dados atualizados com sucesso'
    ]);
    exit();

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit();
}
?>