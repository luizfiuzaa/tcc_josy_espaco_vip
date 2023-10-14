<?php
include '../../cors.php';
include '../../conn.php';


$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Falha na requisição!. Somente o método POST é permitido',
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

try {

    function gerarCorHexadecimal(): string
    {
        return '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
    }

    $titulo_servico = htmlspecialchars(trim($data->titulo));
    $desc_servico = htmlspecialchars(trim($data->descricao));
    $duracao_servico = htmlspecialchars(trim($data->duracao));
    $preco_servico = htmlspecialchars(trim($data->preco));
    $cor = gerarCorHexadecimal();
    $frequencia = 0;

    $query = "INSERT INTO `servico`(
        titulo_servico,
        desc_servico,
        duracao_servico,
        preco_servico,
        cor,
        frequencia
        ) 
        VALUES( 
        :titulo_servico,
        :desc_servico,
        :duracao_servico,
        :preco_servico,
        :cor,
        :frequencia
        )";

    $stmt = $connection->prepare($query);

    $stmt->bindValue(':titulo_servico', $titulo_servico, PDO::PARAM_STR);
    $stmt->bindValue(':desc_servico', $desc_servico, PDO::PARAM_STR);
    $stmt->bindValue(':duracao_servico', $duracao_servico, PDO::PARAM_INT);
    $stmt->bindValue(':preco_servico', $preco_servico, PDO::PARAM_STR);
    $stmt->bindValue(':cor', $cor, PDO::PARAM_STR);
    $stmt->bindValue(':frequencia', $frequencia, PDO::PARAM_INT);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data inserida com sucesso'
        ]);
        exit;
    }

    echo json_encode([
        'success' => 0,
        'message' => 'Há algum problema na inserção de dados'
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