<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

try {

    $faturamento_list = [];

    for ($i = 1; $i <= 12; $i++) {
        $mes = str_pad($i, 2, '0', STR_PAD_LEFT);
        $ano = date('Y');
        $dataInicio = "$ano-$mes-01";
        $dataFim = date('Y-m-t', strtotime($dataInicio));

        $sql = "SELECT SUM(`preco_agend`) as faturamento FROM `agendamento` WHERE data_agend BETWEEN :dataInicio AND :dataFim";
        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':dataInicio', $dataInicio);
        $stmt->bindParam(':dataFim', $dataFim);
        $stmt->execute();

        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        $faturamento = $resultado['faturamento'];
        if ($faturamento != null) {
            $faturamento_list[] = $faturamento;
        } else {
            $faturamento_list[] = '0';
        }
    }

    if ($faturamento_list) {

        echo json_encode([
            'success' => 1,
            'data' => $faturamento_list
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