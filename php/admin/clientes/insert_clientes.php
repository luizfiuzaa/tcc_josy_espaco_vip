<?php
include '../../cors.php';
include '../../conn.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){

$data = json_decode(file_get_contents("php://input"));

try {
    $cliente_nome = htmlspecialchars(trim($data->nomeCli));
    $cliente_email = htmlspecialchars(trim($data->emailCli));
    $cliente_tel = htmlspecialchars(trim($data->telCli));

    $query = "INSERT INTO `cliente` (
            cliente_nome,
            cliente_tel,
            cliente_email
            ) 
            VALUES (
            :cliente_nome,
            :cliente_tel,
            :cliente_email
            )";

    $stmt = $connection->prepare($query);

    $stmt->bindValue(':cliente_nome', $cliente_nome, PDO::PARAM_STR);
    $stmt->bindValue(':cliente_tel', $cliente_tel, PDO::PARAM_STR);
    $stmt->bindValue(':cliente_email', $cliente_email, PDO::PARAM_STR);

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
}}
?>