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
  PRIMARY KEY (`tipo`)
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

-- admiin
INSERT INTO
  `admin`(email_admin, senha_admin)
VALUES
  ('josy.admin@gmail.com', '12345678');