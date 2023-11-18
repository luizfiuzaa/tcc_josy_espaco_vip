<?php
include '../../cors.php';
include '../../conn.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Reqeust Detected! Only get method is allowed',
    ]);
    exit;
}

try {
    $select = "SELECT * FROM lembretes";

    $stmt = $connection->prepare($select);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $Lembretes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $dataAtual = new DateTime();
        $dataAmanha = clone $dataAtual;
        $dataAmanha->modify('+1 day');
        $dataAmanha->setTime(0, 0, 0);

        $Lembretes_exibidos = array_filter($Lembretes, function ($lembrete) use ($dataAtual) {
            $dataLembrete = new DateTime($lembrete['dataLembrete'] . ' ' . $lembrete['horario']);
            $duasHorasAntes = clone $dataLembrete;
            $duasHorasAntes->modify('-2 hours');
            return $dataAtual >= $duasHorasAntes && $dataAtual < $dataLembrete && $lembrete['status'] == 'novo';
        });

        $numeroLembretes = count($Lembretes_exibidos);

        echo json_encode([
            'success' => 1,
            'contador' => $numeroLembretes,
        ]);

    } else {

        echo json_encode([
            'success' => 0,
            'lembretes' => '0',
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