<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

try {

    $sql = "SELECT `titulo_servico`, `frequencia`, `cor` FROM `servico`";

    $stmt = $connection->prepare($sql);
    $stmt->execute();

    $cor = [];
    $frequencia = [];
    $titulo_servico = [];

    if ($stmt->rowCount() > 0) {

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($result as $servico) {

            $cor[] = $servico['cor'];
            $frequencia[] = $servico['frequencia'];
            $titulo_servico[] = $servico['titulo_servico'];

        }

        $servicos_list[] = array(
            'titulo_servico' => $titulo_servico,
            'frequencia' => $frequencia,
            'cor' => $cor,
        );

        echo json_encode([
            'success' => 1,
            'data' => $servicos_list
        ]);

    } else {
        echo json_encode([
            'success' => 0,
            'data' => 'Nenhum resultado encontrado...'
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
?>