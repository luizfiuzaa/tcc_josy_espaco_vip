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

$data = json_decode(file_get_contents("php://input"));
$id = $data->id_agendamento;

try {
	$put = "SELECT * FROM `agendamento` WHERE id_agendamento=:id_agendamento";
	$stmt = $connection->prepare($put);
	$stmt->bindValue(':id_agendamento', $id, PDO::PARAM_INT);
	$stmt->execute();

	if ($stmt->rowCount() > 0) {


		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		$servicos = $data->serv_agendamento;
		$servicos_list = ['', ''];
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

		$hora = new DateTime(substr(htmlspecialchars(trim($data->hora_inicio_agendamento)), 0, 5));
		$minutos = new DateInterval('PT' . $duracao . 'M');
		$hora->add($minutos);

		$cliente = $data->cli_agendamento;
		$sql = "SELECT `cliente_nome` FROM `cliente` WHERE id_cliente=:id";
		$stmt = $connection->prepare($sql);
		$stmt->bindValue(':id', $cliente, PDO::PARAM_INT);
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		$cliente = $result['cliente_nome'];

		$hora_inicio_agendamento = trim($data->hora_inicio_agendamento);
		$hora_fim_agendamento = $hora->format('H:i:s');
		$data_agend = htmlspecialchars(trim($data->data_agend));
		$status_agendamento = htmlspecialchars(trim($data->status_agendamento));
		$preco_serv = htmlspecialchars(trim($data->preco_agend));
		$metodo_pagamento = htmlspecialchars(trim($data->metodo_de_pagamento));
		$cli_agendamento = $cliente;
		$serv_agendamento = $servicos_list[0];
		$fk_id_cliente = $data->cli_agendamento;
		$fk_id_servico = $servicos_list[1];

		$update_agend = "UPDATE `agendamento` SET fk_id_cliente = :fk_id_cliente, fk_id_servico = :fk_id_servico, hora_inicio_agendamento = :hora_inicio_agendamento, hora_fim_agendamento = :hora_fim_agendamento, data_agend = :data_agend, status_agendamento = :status_agendamento, preco_agend = :preco_agend, metodo_de_pagamento = :metodo_de_pagamento, cli_agendamento = :cli_agendamento, serv_agendamento = :serv_agendamento
        WHERE id_agendamento = :id_agendamento";

		$update_stmt = $connection->prepare($update_agend);

		$update_stmt->bindValue(':hora_inicio_agendamento', $hora_inicio_agendamento, PDO::PARAM_STR);
		$update_stmt->bindValue(':hora_fim_agendamento', $hora_fim_agendamento, PDO::PARAM_STR);
		$update_stmt->bindValue(':data_agend', $data_agend, PDO::PARAM_STR);
		$update_stmt->bindValue(':status_agendamento', $status_agendamento, PDO::PARAM_STR);
		$update_stmt->bindValue(':preco_agend', $preco_serv, PDO::PARAM_STR);
		$update_stmt->bindValue(':metodo_de_pagamento', $metodo_pagamento, PDO::PARAM_STR);
		$update_stmt->bindValue(':cli_agendamento', $cli_agendamento, PDO::PARAM_STR);
		$update_stmt->bindValue(':serv_agendamento', $serv_agendamento, PDO::PARAM_STR);
		$update_stmt->bindValue(':fk_id_cliente', $fk_id_cliente, PDO::PARAM_STR);
		$update_stmt->bindValue(':fk_id_servico', $fk_id_servico, PDO::PARAM_STR);

		$update_stmt->bindValue(':id_agendamento', $id, PDO::PARAM_INT);

		if ($update_stmt->execute()) {

			$update_lembrete = "UPDATE `lembretes` SET
						horarioLembrete = :horarioLembrete,
						horario = :horario,
						dataLembrete = :dataLembrete,
						conteudoLembrete = :conteudoLembrete,
						status = :status,
						idAgendamento = :idAgendamento 
			WHERE idAgendamento= :id"
			;

			$stmt = $connection->prepare($update_lembrete);
			$horarioAtual = date('H:i');

			$stmt->bindValue(':horarioLembrete', $horarioAtual, PDO::PARAM_STR);
			$stmt->bindValue(':horario', $hora_inicio_agendamento, PDO::PARAM_STR);
			$stmt->bindValue(':dataLembrete', $data_agend, PDO::PARAM_STR);
			$stmt->bindValue(':conteudoLembrete', $cli_agendamento . ' agendou esses servicos: ' . $serv_agendamento, PDO::PARAM_STR);
			$stmt->bindValue(':status', 'novo', PDO::PARAM_STR);
			$stmt->bindValue(':idAgendamento', $id, PDO::PARAM_STR);

			$stmt->bindValue(':id', $id, PDO::PARAM_STR);

			$stmt->execute();

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

?>