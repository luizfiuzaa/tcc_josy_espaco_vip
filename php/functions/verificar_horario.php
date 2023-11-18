<?php
function verificarHorario($data_agend, $hora_inicio_novo, $hora_fim_novo)
{
    include '../../conn.php';

    $sql = "SELECT `hora_inicio_agendamento`, `hora_fim_agendamento` FROM `agendamento` WHERE data_agend=:data_agend";
    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':data_agend', $data_agend, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as $agendamento) {
        $hora_inicio_existente = strtotime($agendamento['hora_inicio_agendamento']);
        $hora_fim_existente = strtotime($agendamento['hora_fim_agendamento']);

        if (
            ($hora_inicio_novo >= $hora_inicio_existente && $hora_inicio_novo < $hora_fim_existente) ||
            ($hora_fim_novo > $hora_inicio_existente && $hora_fim_novo <= $hora_fim_existente)
        ) {
            return false;
        }
    }
    return true;
}
;
?>