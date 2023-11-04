<?php
include '../../cors.php';
include '../../conn.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
	die();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	echo json_encode([
		'success' => 0,
		'message' => 'Falha na requisição!. Somente o método POST é permitido',
	]);
	exit;
}

$data = json_decode(file_get_contents("php://input"));

try {
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

	$data_agend = $data->data_agend;
	$hora_inicio_novo = strtotime($data->hora_inicio_agendamento);
	$hora_fim_novo = strtotime($hora->format('H:i:s'));

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
			echo json_encode([
				'success' => 0,
				'message' => 'Horário em uso... :('
			]);
			exit;
		}
	}
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
	$id_cascata = isset($data->cascadeId) ? htmlspecialchars(trim($data->cascadeId)) : '';

	$insert = "INSERT INTO `agendamento`(
        hora_inicio_agendamento,
        hora_fim_agendamento,
        data_agend,
        status_agendamento,
        preco_agend,
        metodo_de_pagamento,
        cli_agendamento,
        serv_agendamento,
        fk_id_cliente,
        fk_id_servico,
        id_cascata
    ) 
    VALUES(
        :hora_inicio_agendamento,
        :hora_fim_agendamento,
        :data_agend,
        :status_agendamento,
        :preco_agend,
        :metodo_de_pagamento,
        :cli_agendamento,
        :serv_agendamento,
        :fk_id_cliente,
        :fk_id_servico,
        :id_cascata
    )";

	$stmt = $connection->prepare($insert);

	$stmt->bindValue(':hora_inicio_agendamento', $hora_inicio_agendamento, PDO::PARAM_STR);
	$stmt->bindValue(':hora_fim_agendamento', $hora_fim_agendamento, PDO::PARAM_STR);
	$stmt->bindValue(':data_agend', $data_agend, PDO::PARAM_STR);
	$stmt->bindValue(':status_agendamento', $status_agendamento, PDO::PARAM_STR);
	$stmt->bindValue(':preco_agend', $preco_serv, PDO::PARAM_STR);
	$stmt->bindValue(':metodo_de_pagamento', $metodo_pagamento, PDO::PARAM_STR);
	$stmt->bindValue(':cli_agendamento', $cli_agendamento, PDO::PARAM_STR);
	$stmt->bindValue(':serv_agendamento', $serv_agendamento, PDO::PARAM_STR);
	$stmt->bindValue(':fk_id_cliente', $fk_id_cliente, PDO::PARAM_STR);
	$stmt->bindValue(':fk_id_servico', $fk_id_servico, PDO::PARAM_STR);
	$stmt->bindValue(':id_cascata', $id_cascata, PDO::PARAM_STR);

	if ($stmt->execute()) {
		// $idAgendamento = // id do agendamento;

		$insert = "INSERT INTO `lembretes`(
            horarioLembrete,
            horario,
            dataLembrete,
            conteudoLembrete
            -- idAgendamento
        ) 
        VALUES(
            :horarioLembrete,
            :horario,
            :dataLembrete,
            :conteudoLembrete
            -- :idAgendamento
        )";

		$stmt = $connection->prepare($insert);
		$horarioAtual = date('H:i');

		$stmt->bindValue(':horarioLembrete', $horarioAtual, PDO::PARAM_STR);
		$stmt->bindValue(':horario', $hora_inicio_agendamento, PDO::PARAM_STR);
		$stmt->bindValue(':dataLembrete', $data_agend, PDO::PARAM_STR);
		$stmt->bindValue(':conteudoLembrete', $cli_agendamento . ' agendou esses servicos: ' . $serv_agendamento, PDO::PARAM_STR);
		// $stmt->bindValue(':idAgendamento', $idAgendamento, PDO::PARAM_STR);

		$stmt->execute();


		http_response_code(201);
		echo json_encode([
			'success' => 1,
			'message' => 'Agendamento agendado com sucesso!!! :)'
		]);
		exit;
	}

	echo json_encode([
		'success' => 0,
		'message' => 'Aconteceu algum problema com os dados... :('
	]);
	exit;

} catch (PDOException $e) {
	http_response_code(500);
	echo json_encode([
		'success' => 0,
		'message' => $e->getMessage()
	]);
	exit;
}
?>