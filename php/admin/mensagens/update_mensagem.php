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
    $id_mensagem = $data->id_mensagem;

    $select = "SELECT `descricao` FROM `mensagem` WHERE id_mensagem=:id_mensagem";
    $stmt = $connection->prepare($select);
    $stmt->bindValue(':id_mensagem', $id_mensagem, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $dados_existentes = $stmt->fetch(PDO::FETCH_ASSOC);
        $titulo = isset($data->titulo) ? $data->titulo : $dados_existentes['titulo'];
        $descricao = isset($data->descricao) ? $data->descricao : $dados_existentes['descricao'];
        $cor = isset($data->cor) ? $data->cor : $dados_existentes['cor'];
        $icon = isset($data->icon) ? $data->icon : $dados_existentes['icon'];

        $update_serv = "UPDATE `mensagem` SET titulo = :titulo descricao = :descricao, cor = :cor, icon = :icon
        WHERE id_mensagem = :id_mensagem";

        $update = $connection->prepare($update);

        $update->bindValue(':titulo', $titulo, PDO::PARAM_STR);
        $update->bindValue(':descricao', $descricao, PDO::PARAM_STR);
        $update->bindValue(':cor', $cor, PDO::PARAM_STR);
        $update->bindValue(':icon', $icon, PDO::PARAM_STR);

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