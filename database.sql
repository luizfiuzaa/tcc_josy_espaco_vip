DROP DATABASE IF EXISTS `josy_espaco_vip`;
CREATE DATABASE `josy_espaco_vip`;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`(
  `id_admin` INT NOT NULL AUTO_INCREMENT,
  `email_admin` VARCHAR(50) NOT NULL,
  `senha_admin` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_amdin`)
)
DROP TABLE IF EXISTS `agendamento`;
CREATE TABLE `agendamento`(
  `id_agendamento` INT NOT NULL AUTO_INCREMENT,
  `data_inicio` DATETIME NOT NULL,
  `data_fim` DATETIME NOT NULL,
  -- foreignKeys
  PRIMARY KEY (`id_agendamento`)
);
DROP TABLE IF EXISTS `agendamento_servicos`;
CREATE TABLE `agendamento_servicos`(
  `id_agend_serv` INT NOT NULL, AUTO_INCREMENT
  -- foreignKeys
  PRIMARY KEY (`id_agend_serv`)
);

DROP TABLE IF EXISTS `servico`;
CREATE TABLE `servico`(
  `id_servico` INT NOT NULL AUTO_INCREMENT,
  `duracao` INT NOT NULL,
  PRIMARY KEY (`servico`)
);

DROP TABLE IF EXISTS `admin_Mensagem`;
CREATE TABLE `admin_Mensagem` (
    `id_admin_msg` INT primary Key AUTO_INCREMENT,
    `FK_Id_Msg` INT NOT NUll,
    `FK_Id_Admin` INT NOT NUll,
  PRIMARY KEY (`id_admin_msg`)
)

DROP TABLE IF EXISTS `Mensagem`;
CREATE TABLE `Mensagem` (
    `id_msg` INT primary Key AUTO_INCREMENT,
    `Desc_Msg` VARCHAR(255) NOT NUll,
  PRIMARY KEY (`id_msg`)
)

DROP TABLE IF EXISTS `Cliente`;
CREATE TABLE `Cliente` (
    `id_cliente` INT primary Key AUTO_INCREMENT,
    `Cliente_nome` VARCHAR(50) NOT NUll,
    `Cliente_tel` VARCHAR(12) NOT NUll,
    `Cliente_email` VARCHAR(50) NOT NUll,
    `Cliente_senha` VARCHAR(255) NOT NUll,
  PRIMARY KEY (`id_cliente`)
)

DROP TABLE IF EXISTS `Mensagem_cliente`;
CREATE TABLE `Mensagem_cliente` (
    `id_msg_cli` INT primary Key,
    `Fk_id_cli` INT NOT NUll,
    `Fk_id_Msg` INT NOT NUll
  PRIMARY KEY (`id_msg_cli`)
)
