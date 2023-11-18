<?php
function selecionarServicos($servicos)
{
    include '../../conn.php';

    $servicos_list = ['', '', ''];
    $duracao = 0;
    foreach ($servicos as $indice => $servico) {
        $sql = "SELECT `titulo_servico`, `frequencia`, `duracao_servico` FROM `servico` WHERE id_servico=:id";
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(':id', $servico, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($indice > 0) {
            $servicos_list[0] .= ', ' . $result['titulo_servico'];
            $servicos_list[1] .= ', ' . $servico;
        } else {
            $servicos_list[0] .= $result['titulo_servico'];
            $servicos_list[1] .= $servico;
        }
        $frequencia = $result['frequencia'] + 1;
        $sql = "UPDATE `servico` SET frequencia=:frequencia WHERE id_servico=:id";
        $stmt = $connection->prepare($sql);
        $stmt->bindValue(':id', $servico, PDO::PARAM_INT);
        $stmt->bindValue(':frequencia', $frequencia, PDO::PARAM_INT);
        $stmt->execute();
        $duracao += $result['duracao_servico'];
    }

    $servicos_list[2] = $duracao;

    return $servicos_list;
}
;
?>