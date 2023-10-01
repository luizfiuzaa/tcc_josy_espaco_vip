<?php
include '../cors.php';
include '../conexao.php';

$data = json_decode(file_get_contents("php://input"));

try {

    $cliente_nome = htmlspecialchars(trim($data->nomeCli));
    $cliente_tel = htmlspecialchars(trim($data->telCli));
    $cliente_email = htmlspecialchars(trim($data->emailCli));
    $cliente_senha = htmlspecialchars(trim($data->senhaCli));

    $query = "INSERT INTO `cliente`(
        cliente_nome,
        cliente_tel,
        cliente_email,
        cliente_senha
        ) 
        VALUES(
        :cliente_nome,
        :cliente_tel,
        :cliente_email,
        :cliente_senha
        )";

    $stmt = $connection->prepare($query);

    $stmt->bindValue(':cliente_nome', $cliente_nome, PDO::PARAM_STR);
    $stmt->bindValue(':cliente_tel', $cliente_tel, PDO::PARAM_STR);
    $stmt->bindValue(':cliente_email', $cliente_email, PDO::PARAM_STR);
    $stmt->bindValue(':cliente_senha', $cliente_senha, PDO::PARAM_STR);

    if ($stmt->N()) {

        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Inserted Successfully.'
        ]);
        exit;
    }

    echo json_encode([
        'success' => 0,
        'message' => 'There is some problem in data inserting'
    ]);
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
?>