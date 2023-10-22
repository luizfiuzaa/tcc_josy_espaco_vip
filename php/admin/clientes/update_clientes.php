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
        'message' => 'Falha na requisição!. Somente o método PUT é permitido',
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

try {
    $put = "SELECT * FROM `cliente` WHERE id_cliente=:id_cliente";
    $stmt = $connection->prepare($put);
    $stmt->bindValue(':id_cliente', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {


        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $cliente_nome = htmlspecialchars(trim($data->nome));
        $cliente_telefone = htmlspecialchars(trim($data->telefone));
        $cliente_email = htmlspecialchars(trim($data->email));
        // $cliente_senha = htmlspecialchars(trim($data->senha));

        $update = "UPDATE `cliente` SET cliente_nome = :cliente_nome, cliente_tel = :cliente_telefone, cliente_email = :cliente_email
        WHERE id_cliente = :id_cliente";

        $update_stmt = $connection->prepare($update);

        $update_stmt->bindValue(':cliente_nome', $cliente_nome, PDO::PARAM_STR);
        $update_stmt->bindValue(':cliente_telefone', $cliente_telefone, PDO::PARAM_STR);
        $update_stmt->bindValue(':cliente_email', $cliente_email, PDO::PARAM_STR);
        // $update_stmt->bindValue(':cliente_senha', $cliente_senha, PDO::PARAM_INT);

        $update_stmt->bindValue(':id_cliente', $id, PDO::PARAM_INT);

        if ($update_stmt->execute()) {
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