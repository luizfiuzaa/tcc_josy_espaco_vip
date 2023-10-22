<?php
include '../../cors.php';
include '../../conn.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Falha na requisição!. Somente o método PUT é permitipo',
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

try {
    $id_mensagem = htmlspecialchars(trim($data->id_mensagem));
    $titulo = htmlspecialchars(trim($data->titulo));
    $descricao = htmlspecialchars(trim($data->descricao));
    $cor = htmlspecialchars(trim($data->cor));

    $select = "SELECT * FROM `mensagem` WHERE id_mensagem=:id_mensagem";
    $stmt = $connection->prepare($select);
    $stmt->bindValue(':id_mensagem', $id_mensagem, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $update_mensagem = "UPDATE `mensagem` SET
        titulo = :titulo,
        descricao = :descricao,
        cor = :cor
        WHERE id_mensagem = :id_mensagem";

        $stmt = $connection->prepare($update_mensagem);

        $stmt->bindValue(':titulo', $titulo, PDO::PARAM_STR);
        $stmt->bindValue(':descricao', $descricao, PDO::PARAM_STR);
        $stmt->bindValue(':cor', $cor, PDO::PARAM_STR);
        $stmt->bindValue(':id_mensagem', $id_mensagem, PDO::PARAM_INT);


        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                'success' => 1,
                'message' => 'Dado alterado com sucesso'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Há algum problema na alteração de dados'
        ]);
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

?>