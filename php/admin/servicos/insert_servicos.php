<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

$titulo_servico = htmlspecialchars(trim($data->tituloServico));
$desc_servico = htmlspecialchars(trim($data->descServico));
$duracao_servico = htmlspecialchars(trim($data->duracaoServico));
$preco_servico = htmlspecialchars(trim($data->preco_Servico));

$query = "INSERT INTO `servico`(
        titulo_servico,
        desc_servico,
        duracao_servico,
        preco_servico,
        ) 
        VALUES(
        :titulo_servico,
        :desc_servico,
        :duracao_servico,
        :preco_servico,
        )";

$stmt = $connection->prepare($query);

$stmt->bindValue(':titulo_servico', $titulo_servico);
$stmt->bindValue(':desc_servico', $desc_servico);
$stmt->bindValue(':duracao_servico', $duracao_servico);
$stmt->bindValue(':preco_servico', $preco_servico);

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