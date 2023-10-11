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
    $stmt->bindValue(':id_cliente', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0){


        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $cliente_nome = htmlspecialchars(trim($data->nome));
        $cliente_telefone = htmlspecialchars(trim($data->telefone));
        $cliente_email = htmlspecialchars(trim($data->email));

        $update_serv = "UPDATE `cliente` SET cliente_nome = :cliente_nome, cliente_telefone = :cliente_telefone, cliente_email = :cliente_email
        WHERE id_cliente = :id_cliente";

        $update_stmt = $connection->prepare($update_serv);

        $update_stmt->bindValue(':cliente_nome', $cliente_nome, PDO::PARAM_STR);
        $update_stmt->bindValue(':cliente_telefone', $cliente_telefone, PDO::PARAM_STR);
        $update_stmt->bindValue(':cliente_email', $cliente_email, PDO::PARAM_INT);

        $update_stmt->bindValue(':id_cliente', $id, PDO::PARAM_INT);

        if ($update_stmt->execute()) {
            var_dump($update_stmt);
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