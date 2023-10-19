<?php
include '../../cors.php';
include '../../conn.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT'){
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Falha na requisição!. Somente o método PUT é permitido',
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

try{
    $put = "SELECT * FROM `servico` WHERE id_servico=:id_servico";
    $stmt = $connection->prepare($put);
    $stmt->bindValue(':id_servico', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0){


        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $titulo_servico = htmlspecialchars(trim($data->titulo));
        $desc_servico = htmlspecialchars(trim($data->descricao));
        $duracao_servico = htmlspecialchars(trim($data->duracao));
        $preco_servico = htmlspecialchars(trim($data->preco));

        $update_serv = "UPDATE `servico` SET titulo_servico = :titulo_servico, desc_servico = :desc_servico, duracao_servico = :duracao_servico, preco_servico = :preco_servico
        WHERE id_servico = :id_servico";

        $update_stmt = $connection->prepare($update_serv);

        $update_stmt->bindValue(':titulo_servico', $titulo_servico, PDO::PARAM_STR);
        $update_stmt->bindValue(':desc_servico', $desc_servico, PDO::PARAM_STR);
        $update_stmt->bindValue(':duracao_servico', $duracao_servico, PDO::PARAM_INT);
        $update_stmt->bindValue(':preco_servico', $preco_servico, PDO::PARAM_STR);

        $update_stmt->bindValue(':id_servico', $id, PDO::PARAM_INT);

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
    }catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => 0,
            'message' => $e->getMessage()
        ]);
        exit;
    }

?>