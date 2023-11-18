<?php
function selecionarClientes($cliente)
{
    include '../../conn.php';

    $sql = "SELECT `cliente_nome` FROM `cliente` WHERE id_cliente=:id";
    $stmt = $connection->prepare($sql);
    $stmt->bindValue(':id', $cliente, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $cliente = $result['cliente_nome'];

    return $cliente;
}
;
?>