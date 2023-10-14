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
    $tipo = $data->tipo;
    $select = "SELECT `descricao` FROM `mensagem` WHERE tipo=:tipo";
    $stmt = $connection->prepare($select);
    $stmt->bindValue(':tipo', $tipo, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $dados_existentes = $stmt->fetch(PDO::FETCH_ASSOC);
        $descricao = isset($data->descricao) ? $data->descricao : $dados_existentes['descricao'];

        $update_serv = "UPDATE `mensagem` SET descricao = :descricao
        WHERE tipo = :tipo";

        $update = $connection->prepare($update);

        $update->bindValue(':descricao', $descricao, PDO::PARAM_STR);

        if ($update->execute()) {
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