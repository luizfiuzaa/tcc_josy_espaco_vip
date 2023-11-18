<?php
include '../../cors.php';
include '../../conn.php';
include '../../functions/selecionar_servicos.php';
include '../../functions/selecionar_clientes.php';
include '../../functions/verificar_horario.php';

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
	$servicos_list = selecionarServicos($servicos);

	$cliente = $data->cli_agendamento;
	$cliente = selecionarClientes($cliente);

	$hora = new DateTime(substr(htmlspecialchars(trim($data->hora_inicio_agendamento)), 0, 5));
	$minutos = new DateInterval('PT' . $servicos_list[2] . 'M');
	$hora->add($minutos);
	$data_agend = $data->data_agend;
	$hora_inicio_novo = strtotime($data->hora_inicio_agendamento);
	$hora_fim_novo = strtotime($hora->format('H:i:s'));

	if (!verificarHorario($data_agend, $hora_inicio_novo, $hora_fim_novo)) {
		echo json_encode([
			'success' => 0,
			'message' => 'Horário em uso... :('
		]);
		exit();
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
		$idAgendamento = $connection->lastInsertId();
		$idCascata = !isset($data->cascadeId) ? '' : htmlspecialchars(trim($data->cascadeId));

		$insert = "INSERT INTO `lembretes`(
            horarioLembrete,
            horario,
            dataLembrete,
            conteudoLembrete,
												status,
            idAgendamento,
												idCascata
        ) 
        VALUES(
            :horarioLembrete,
            :horario,
            :dataLembrete,
            :conteudoLembrete,
												:status,
            :idAgendamento,
												:idCascata
        )";

		$stmt = $connection->prepare($insert);
		$horarioAtual = date('H:i');

		$stmt->bindValue(':horarioLembrete', $horarioAtual, PDO::PARAM_STR);
		$stmt->bindValue(':horario', $hora_inicio_agendamento, PDO::PARAM_STR);
		$stmt->bindValue(':dataLembrete', $data_agend, PDO::PARAM_STR);
		$stmt->bindValue(':conteudoLembrete', $cli_agendamento . ' agendou esses servicos: ' . $serv_agendamento, PDO::PARAM_STR);
		$stmt->bindValue(':status', 'novo', PDO::PARAM_STR);
		$stmt->bindValue(':idAgendamento', $idAgendamento, PDO::PARAM_STR);
		$stmt->bindValue(':idCascata', $idCascata, PDO::PARAM_STR);

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