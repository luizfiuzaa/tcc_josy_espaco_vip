<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

$cliente_nome = htmlspecialchars(trim($data->nomeCli));
$cliente_email = htmlspecialchars(trim($data->emailCli));
$cliente_tel = htmlspecialchars(trim($data->telCli));

$query = "INSERT INTO `cliente`(
        cliente_nome,
        cliente_tel,
        cliente_email,
        ) 
        VALUES(
        :cliente_nome,
        :cliente_tel,
        :cliente_email,
        )";

$stmt = $connection->prepare($query);

$stmt->bindValue(':cliente_nome', $cliente_nome);
$stmt->bindValue(':cliente_tel', $cliente_tel);
$stmt->bindValue(':cliente_email', $cliente_email);

if ($connection->execute($stmt) === true) {
    $response = [
        'mensagens' => 'Registro apagado com sucesso!'
    ];
} else {
    $response = [
        'mensagem' => $connection->error
    ];
}
echo json_encode($response);
?>