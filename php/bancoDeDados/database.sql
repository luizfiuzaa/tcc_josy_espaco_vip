CREATE DATABASE IF NOT EXISTS `id21424056_josy_espaco_vip` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `id21424056_josy_espaco_vip`;

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin`(
	`id_admin` INT NOT NULL AUTO_INCREMENT,
	`email_admin` VARCHAR(50) NOT NULL,
	`senha_admin` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id_admin`)
) DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
	`id_cliente` INT NOT NULL AUTO_INCREMENT,
	`cliente_nome` VARCHAR(50) NOT NULL,
	`cliente_tel` VARCHAR(12) NOT NULL,
	`cliente_email` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id_cliente`)
) DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `servico`;

CREATE TABLE `servico`(
	`id_servico` INT NOT NULL AUTO_INCREMENT,
	`titulo_servico` VARCHAR(50) NOT NULL,
	`desc_servico` VARCHAR(150) NOT NULL,
	`duracao_servico` INT NOT NULL,
	`preco_servico` DECIMAL(10, 2) NOT NULL,
	`cor` VARCHAR(30) NOT NULL,
	`frequencia` INT NOT NULL,
	PRIMARY KEY (`id_servico`)
) DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `mensagem`;

CREATE TABLE `mensagem` (
	`id_mensagem` INT NOT NULL AUTO_INCREMENT,
	`titulo` VARCHAR(30) NOT NULL,
	`descricao` VARCHAR(255) NOT NULL,
	`cor` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`id_mensagem`)
) DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `lembretes`;


DROP TABLE IF EXISTS `agendamento`;

CREATE TABLE `agendamento`(
	`id_agendamento` INT NOT NULL AUTO_INCREMENT,
	`fk_id_cliente` INT NOT NULL,
	`fk_id_servico` VARCHAR(255) NOT NULL,
	`hora_inicio_agendamento` TIME NOT NULL,
	`hora_fim_agendamento` TIME NOT NULL,
	`data_agend` DATE NOT NULL,
	`status_agendamento` CHAR(1) NOT NULL,
	`preco_agend` DECIMAL(10, 2) NOT NULL,
	`metodo_de_pagamento` VARCHAR(20) NOT NULL,
	`cli_agendamento` VARCHAR(70) NOT NULL,
	`serv_agendamento` VARCHAR(255) NOT NULL,
	`id_cascata` VARCHAR(255),
	CONSTRAINT `fk_id_cliente` FOREIGN KEY (`fk_id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE, 
	PRIMARY KEY (`id_agendamento`)
) DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `lembretes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`horario` TIME NOT NULL,
	`horarioLembrete` TIME NOT NULL,
	`dataLembrete` DATE,
	`conteudoLembrete` VARCHAR(255) NOT NULL,
	`idAgendamento` VARCHAR(255) NOT NULL,
	`idCascata` VARCHAR(255) NOT NULL,
	`status` VARCHAR(5),
	PRIMARY KEY (`id`)
) DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `agendamento_servicos`;

CREATE TABLE `agendamento_servicos`(
	`id_agend_servico` INT AUTO_INCREMENT,
	`fk_id_servico_agend` INT NOT NULL,
	`fk_id_agendamento` INT NOT NULL,
	CONSTRAINT `fk_id_servico_agend` FOREIGN KEY (`fk_id_servico_agend`) REFERENCES `servico` (`id_servico`),
	CONSTRAINT `fk_id_agendamento` FOREIGN KEY (`fk_id_agendamento`) REFERENCES `agendamento` (`id_agendamento`),
	PRIMARY KEY (`id_agend_servico`)
) DEFAULT CHARSET = utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO
	`admin`(email_admin, senha_admin)
VALUES
	('josy.admin@gmail.com', '12345678');

INSERT INTO
	`servico` (
		`titulo_servico`,
		`desc_servico`,
		`duracao_servico`,
		`preco_servico`,
		`cor`,
		`frequencia`
	)
VALUES
	(
		'Corte de Cabelo',
		'Corte de cabelo moderno e elegante',
		30,
		50.00,
		'#FF3366',
		4
	),
	(
		'Coloração de Cabelo',
		'Coloração profissional para realçar sua beleza',
		60,
		80.00,
		'#9933FF',
		6
	),
	(
		'Manicure',
		'Manicure completa com esmaltação',
		45,
		35.00,
		'#FF66CC',
		2
	),
	(
		'Pedicure',
		'Pedicure relaxante e rejuvenescedora',
		60,
		40.00,
		'#CC3366',
		3
	),
	(
		'Maquiagem de Festa',
		'Maquiagem para eventos especiais',
		60,
		70.00,
		'#FF9966',
		2
	),
	(
		'Tratamento Facial',
		'Tratamento facial com produtos naturais',
		90,
		100.00,
		'#FFCC99',
		1
	),
	(
		'Massagem Relaxante',
		'Massagem para aliviar o estresse e a tensão',
		75,
		60.00,
		'#CCFF66',
		4
	),
	(
		'Depilação a Cera',
		'Depilação suave e eficaz',
		45,
		45.00,
		'#6633FF',
		4
	),
	(
		'Design de Sobrancelha',
		'Design personalizado para realçar seu olhar',
		30,
		25.00,
		'#FF33CC',
		5
	),
	(
		'Tratamento Capilar',
		'Tratamento intensivo para cabelos danificados',
		45,
		70.00,
		'#9966FF',
		2
	);

INSERT INTO
	`mensagem` (`titulo`, `descricao`, `cor`)
VALUES
	(
		'Reagendamento',
		'Olá! 😊 Se precisar reagendar seu compromisso conosco, fique à vontade para nos avisar com antecedência. Estamos aqui para ajudar! 📅 - Josy',
		'#3498db'
	),
	(
		'Confirmação',
		'Olá, querida! 🌸 Sua reserva no nosso salão está confirmada. Mal podemos esperar para te ver! Qualquer dúvida, é só chamar. 😊 - Josy',
		'#27ae60'
	),
	(
		'Cancelamento',
		'Oi, Josy aqui! 😞 Se por algum motivo você precisar cancelar sua reserva, por favor, nos avise com antecedência para que possamos reagendar ou ajudar em outra ocasião. 🙁 - Josy',
		'#e74c3c'
	),
	(
		'Lembrete',
		'Olá, Josy lembrando você! 🌟📢 Seu compromisso no nosso salão está chegando! Mal podemos esperar para te deixar ainda mais deslumbrante! 💅✨ - Josy',
		'#8e44ad'
	),
	(
		'Cobrança',
		'Oi, Josy do salão! 💳 Lembrando que o pagamento do seu serviço está pendente. Por favor, entre em contato conosco para acertar os detalhes. Obrigado! 💖 - Josy',
		'#f39c12'
	);