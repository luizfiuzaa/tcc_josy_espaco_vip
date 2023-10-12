<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

try {
    $id = $_GET['id'];

    $sql = "SELECT fk_id_servico FROM `agendamento` WHERE id_agendamento = :id_agendamento";

    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':id_agendamento', $id, PDO::PARAM_INT);
    $stmt->execute();

    $result_agendamento = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result_agendamento) {
        // Obtém a string de serviços e divide em partes
        $servicos = explode(',', $result_agendamento['fk_id_servico']);
        $servicos_list = [];

        foreach ($servicos as $servico) {
            $servico_sql = "SELECT * FROM `servico` WHERE id_servico = :id_servico";

            $servico_stmt = $connection->prepare($servico_sql);
            $servico_stmt->bindValue(':id_servico', $servico, PDO::PARAM_INT);
            $servico_stmt->execute();
            $result_servico = $servico_stmt->fetch(PDO::FETCH_ASSOC);

            if ($result_servico) {
                // Armazena o preço do serviço em $servicos_list
                $servicos_list[] = $result_servico['preco_servico'];
            }
        }

        // $servicos_list agora contém os preços dos serviços
        var_dump($servicos_list);
    } else {
        echo "Nenhum resultado encontrado para o ID do agendamento.";
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
