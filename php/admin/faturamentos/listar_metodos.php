<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

try {
    $sql = "SELECT `metodo_de_pagamento` FROM `agendamento`";

    $stmt = $connection->prepare($sql);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $pix = 0;
        $cartao = 0;
        $dinheiro = 0;

        foreach ($result as $metodo_de_pagamento) {
            if ($metodo_de_pagamento['metodo_de_pagamento'] == 'pix') {
                $pix += 1;
            } else if ($metodo_de_pagamento['metodo_de_pagamento'] == 'debito' || $metodo_de_pagamento['metodo_de_pagamento'] == 'credito') {
                $cartao += 1;
            } else if ($metodo_de_pagamento['metodo_de_pagamento'] == 'dinheiro') {
                $dinheiro += 1;
            }
        }
        $metodos[] = array(
            'pix' => $pix,
            'cartao' => $cartao,
            'dinheiro' => $dinheiro
        );

        echo json_encode([
            'success' => 1,
            'data' => $metodos
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