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
$id = $_GET['id_edit'];

try{
    $put = "SELECT * FROM `servico` WHERE id_servico=:id_edit";
    $stmt = $connection->prepare($put);
    $stmt->bindValue(':id_edit', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0){


        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);

        $titulo_servico = htmlspecialchars(trim($data->titulo_edit));
        $desc_servico = htmlspecialchars(trim($data->descricao_edit));
        $duracao_servico = htmlspecialchars(trim($data->duracao_edit));
        $preco_servico = htmlspecialchars(trim($data->preco_edit));

        $update_serv = "UPDATE `servicos` SET titulo_servico = :titulo_servico, desc_servico = :desc_servico, duracao_servico = :duracao_servico, preco_servico = :preco_servico
        WHERE id_servico = :id_servico";

        $update_stmt = $connection->prepare($update_serv);

        $update_stmt->bindValue(':titulo_servico', $titulo_servico, PDO::PARAM_STR);
        $update_stmt->bindValue(':desc_servico', $desc_servico, PDO::PARAM_STR);
        $update_stmt->bindValue(':duracao_servico', $duracao_servico, PDO::PARAM_INT);
        $update_stmt->bindValue(':preco_servico', $preco_servico, PDO::PARAM_STR);

        $update_stmt->bindValue(':id_servico', $id, PDO::PARAM_INT);

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