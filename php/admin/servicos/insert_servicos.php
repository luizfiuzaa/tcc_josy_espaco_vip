<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

try {
    $titulo_servico = htmlspecialchars(trim($data->titulo));
    $desc_servico = htmlspecialchars(trim($data->descricao));
    $duracao_servico = htmlspecialchars(trim($data->duracao));
    $preco_servico = htmlspecialchars(trim($data->preco));

    $query = "INSERT INTO `servico`(
        titulo_servico,
        desc_servico,
        duracao_servico,
        preco_servico
        ) 
        VALUES(
        :titulo_servico,
        :desc_servico,
        :duracao_servico,
        :preco_servico
        )";

    $stmt = $connection->prepare($query);

    $stmt->bindValue(':titulo_servico', $titulo_servico, PDO::PARAM_STR);
    $stmt->bindValue(':desc_servico', $desc_servico, PDO::PARAM_STR);
    $stmt->bindValue(':duracao_servico', $duracao_servico, PDO::PARAM_INT);
    $stmt->bindValue(':preco_servico', $preco_servico, PDO::PARAM_INT);

    if ($stmt->execute()) {
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