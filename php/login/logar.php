<?php
include '../cors.php';
include '../conn.php';
include 'criarJwt.php';

// $method = $_SERVER['REQUEST_METHOD'];

// if ($method == "OPTIONS") {
//     die();
// }

// if ($_SERVER['REQUEST_METHOD'] !== 'POST'){
//     http_response_code(405);
//     echo json_encode([
//         'success' => 0,
//         'message' => 'Falha na requisição!. Somente o método POST é permitido',
//     ]);
//     exit;
// }

$data = json_decode(file_get_contents("php://input"));

try {

    $sql = "SELECT `id_admin` FROM `admin` WHERE email_admin=:email AND senha_admin=:senha";
    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':email', $data->email, PDO::PARAM_STR);
    $stmt->bindValue(':senha', $data->password, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $token = criar_jwt($user['id_admin'], $data->email, $data->password);

            echo json_encode([
                'success' => 1,
                'token' => $token
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Falha ao realizar o login'
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