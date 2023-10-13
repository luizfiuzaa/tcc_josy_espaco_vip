<?php
include '../../cors.php';
include '../../conn.php';

$data = json_decode(file_get_contents("php://input"));

try {
	$id = $_GET['id'];

	$sql = "SELECT `fk_id_servico` FROM `agendamento` WHERE id_agendamento = :id_agendamento";

	$stmt = $connection->prepare($sql);
	$stmt->bindValue(':id_agendamento', $id, PDO::PARAM_INT);
	$stmt->execute();

	if ($stmt->rowCount() > 0) {

		$result_agendamento = $stmt->fetch(PDO::FETCH_ASSOC);

		$servicos = explode(',', $result_agendamento['fk_id_servico']);
		$servicos_list = [];
		$valorTotal = 0;

		foreach ($servicos as $servico) {
			$servico_sql = "SELECT `titulo_servico`,`preco_servico` FROM `servico` WHERE id_servico = :id_servico";

			$servico_stmt = $connection->prepare($servico_sql);
			$servico_stmt->bindValue(':id_servico', $servico, PDO::PARAM_INT);
			$servico_stmt->execute();
			$result_servico = $servico_stmt->fetch(PDO::FETCH_ASSOC);
			$servicos_list[] = array(
				'preco_servico' => $result_servico['preco_servico'],
				'titulo_servico' => $result_servico['titulo_servico']
			);
			$valorTotal += floatval($result_servico['preco_servico']);
		}

		echo json_encode([
			'success' => 1,
			'servicos' => $servicos_list,
			'total' => $valorTotal
		]);

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