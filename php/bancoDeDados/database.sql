CREATE DATABASE IF NOT EXISTS `josy_espaco_vip` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `josy_espaco_vip`;

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin`(
	`id_admin` INT NOT NULL AUTO_INCREMENT,
	`email_admin` VARCHAR(50) NOT NULL,
	`senha_admin` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id_admin`)
);

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
	`id_cliente` INT NOT NULL AUTO_INCREMENT,
	`cliente_nome` VARCHAR(50) NOT NUll,
	`cliente_tel` VARCHAR(12) NOT NUll,
	`cliente_email` VARCHAR(50) NOT NUll,
	PRIMARY KEY (`id_cliente`)
);

DROP TABLE IF EXISTS `servico`;

CREATE TABLE `servico`(
	`id_servico` INT NOT NULL AUTO_INCREMENT,
	`titulo_servico` VARCHAR(70) NOT NULL,
	`desc_servico` VARCHAR(150) NOT NULL,
	`duracao_servico` INT NOT NULL,
	`preco_servico` DECIMAL(10, 2) NOT NULL,
	`cor` VARCHAR(30) NOT NULL,
	`frequencia` INT NOT NULL,
	PRIMARY KEY (`id_servico`)
);

DROP TABLE IF EXISTS `mensagem`;

CREATE TABLE `mensagem` (
	`tipo` VARCHAR(20) NOT NULL,
	`descricao` VARCHAR(255) NOT NUll,
	`cor` VARCHAR(20) NOT NUll,
	`icon` VARCHAR(255),
	PRIMARY KEY (`tipo`)
);

DROP TABLE IF EXISTS `lembretes`;

CREATE TABLE `lembretes` (
	`id` VARCHAR(20) NOT NULL,
	`horarioLembrete` TIME NOT NUll,
	`dataLembrete` DATE,
	`conteudoLembrete` TIME NOT NUll,
	PRIMARY KEY (`id`)
);

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
	CONSTRAINT `fk_id_cliente` FOREIGN KEY (`fk_id_cliente`) REFERENCES `cliente` (`id_cliente`),
	PRIMARY KEY (`id_agendamento`)
);

DROP TABLE IF EXISTS `agendamento_servicos`;

CREATE TABLE `agendamento_servicos`(
	`id_agend_servico` INT AUTO_INCREMENT,
	`fk_id_servico_agend` INT NOT NULL,
	`fk_id_agendamento` INT NOT NULL,
	CONSTRAINT `fk_id_servico_agend` FOREIGN KEY (`fk_id_servico_agend`) REFERENCES `servico` (`id_servico`),
	CONSTRAINT `fk_id_agendamento` FOREIGN KEY (`fk_id_agendamento`) REFERENCES `agendamento` (`id_agendamento`),
	PRIMARY KEY (`id_agend_servico`)
);

INSERT INTO
	`admin`(email_admin, senha_admin)
VALUES
	('josy.admin@gmail.com', '12345678');

INSERT INTO
	`servico`(
		titulo_servico,
		desc_servico,
		duracao_servico,
		preco_servico,
		cor,
		frequencia
	)
VALUES
	(
		'Servico de exemplo',
		'Descrição de exemplo',
		'30',
		'40.00',
		'#1998E5',
		'1'
	);

INSERT INTO
	`servico`(
		titulo_servico,
		desc_servico,
		duracao_servico,
		preco_servico,
		cor,
		frequencia
	)
VALUES
	(
		'Corte de cabelo  curto',
		'Um ótimo servico',
		'30',
		'40.00',
		'#4A39E6',
		'2'
	);

INSERT INTO
	`servico`(
		titulo_servico,
		desc_servico,
		duracao_servico,
		preco_servico,
		cor,
		frequencia
	)
VALUES
	(
		'Manicure',
		'Um ótimo servico',
		'60',
		'70.00',
		'#19E696',
		'1'
	);

INSERT INTO
	`cliente` (
		cliente_nome,
		cliente_tel,
		cliente_email
	)
VALUES
	(
		'Cliente de exemplo',
		'00000000000',
		'exemplo@gmail.com'
	);

INSERT INTO
	`cliente` (
		cliente_nome,
		cliente_tel,
		cliente_email
	)
VALUES
	(
		'Josy Pereira',
		'21232332343',
		'josy.pereira@gmail.com'
	);

INSERT INTO
	`cliente` (
		cliente_nome,
		cliente_tel,
		cliente_email
	)
VALUES
	(
		'Giovanni Guarnieri',
		'23445453454',
		'giovanni.guarnieri@gmail.com'
	);

INSERT INTO
	`agendamento`(
		hora_inicio_agendamento,
		hora_fim_agendamento,
		data_agend,
		status_agendamento,
		preco_agend,
		metodo_de_pagamento,
		cli_agendamento,
		serv_agendamento,
		fk_id_cliente,
		fk_id_servico
	)
VALUES
	(
		'14:30:00',
		'15:30:00',
		'2023-10-20',
		'c',
		'110.00',
		'pix',
		'Josy Pereira',
		'Corte de cabelo  curto,Manicure',
		2,
		'2,3'
	);

INSERT INTO
	`agendamento`(
		hora_inicio_agendamento,
		hora_fim_agendamento,
		data_agend,
		status_agendamento,
		preco_agend,
		metodo_de_pagamento,
		cli_agendamento,
		serv_agendamento,
		fk_id_cliente,
		fk_id_servico
	)
VALUES
	(
		'16:00:00',
		'16:30:00',
		'2023-10-20',
		'e',
		'40.00',
		'dinheiro',
		'Giovanni Guarnieri',
		'Corte de cabelo  curto',
		3,
		'2'
	);

INSERT INTO
	`agendamento`(
		hora_inicio_agendamento,
		hora_fim_agendamento,
		data_agend,
		status_agendamento,
		preco_agend,
		metodo_de_pagamento,
		cli_agendamento,
		serv_agendamento,
		fk_id_cliente,
		fk_id_servico
	)
VALUES
	(
		'13:00:00',
		'13:30:00',
		'2023-10-20',
		'e',
		'40.00',
		'debito',
		'Cliente de exemplo',
		'Servico de exemplo',
		1,
		'1'
	);