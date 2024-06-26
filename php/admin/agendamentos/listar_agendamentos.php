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
	$sql = "SELECT * FROM agendamento";

	$stmt = $connection->prepare($sql);

	$stmt->execute();

	if ($stmt->rowCount() > 0) {

		$agendamentos = [];

		$agendamentos = $stmt->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode([
			'success' => 1,
			'agendamentos' => $agendamentos,
		]);

	} else {

		echo json_encode([
			'success' => 0,
			'agendamentos' => 'Sem agendamentos...',
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