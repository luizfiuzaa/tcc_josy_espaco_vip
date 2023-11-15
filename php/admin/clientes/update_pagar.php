<?php
include '../../cors.php';
include '../../conn.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
  die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
  http_response_code(405);
  echo json_encode([
    'success' => 0,
    'message' => 'Falha na requisição!. Somente o método PUT é permitido',
  ]);
  exit;
}



try {

  $data = json_decode(file_get_contents("php://input"));
  $id = $data->id;

  $put = "SELECT * FROM `agendamento` WHERE id_agendamento=:id_agendamento";
  $stmt = $connection->prepare($put);
  $stmt->bindValue(':id_agendamento', $id, PDO::PARAM_INT);
  $stmt->execute();

  if ($stmt->rowCount() > 0) {


    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $status_agendamento = 'p';

    $update_agend = "UPDATE `agendamento` SET status_agendamento = :status_agendamento
        WHERE id_agendamento = :id_agendamento";

    $update_stmt = $connection->prepare($update_agend);

    $update_stmt->bindValue(':status_agendamento', $status_agendamento, PDO::PARAM_STR);

    $update_stmt->bindValue(':id_agendamento', $id, PDO::PARAM_INT);

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
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    'success' => 0,
    'message' => $e->getMessage()
  ]);
  exit;
}
