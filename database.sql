DROP DATABASE IF EXISTS `josy_espaco_vip`;
CREATE DATABASE `josy_espaco_vip`;

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`(
  `id_admin` INT NOT NULL AUTO_INCREMENT,
  `email_admin` VARCHAR(50) NOT NULL,
  `senha_admin` VARCHAR(50) NOT NULL
)
DROP TABLE IF EXISTS `agendamento`;
CREATE TABLE `agendamento`(
  `id_agendamento` INT NOT NULL AUTO_INCREMENT,
  `data_inicio` DATETIME NOT NULL,
  `data_fim` DATETIME NOT NULL,
  -- foreignKeys
);
DROP TABLE IF EXISTS `agendamento_servicos`;
CREATE TABLE `agendamento_servicos`(
  `id_agend_serv` INT NOT NULL AUTO_INCREMENT
  -- foreignKeys
);

DROP TABLE IF EXISTS `servico`;
CREATE TABLE `servico`(
  `id_servico` INT NOT NULL AUTO_INCREMENT,
  `duracao` INT NOT NULL
);

DROP TABLE IF EXISTS `admin_Mensagem`;
CREATE TABLE `admin_Mensagem` (
    `Id_admin_Msg` INT primary Key AUTO_INCREMENT,
    `FK_Id_Msg` INT NOT NUll,
    `FK_Id_Admin` INT NOT NUll
)

DROP TABLE IF EXISTS `Mensagem`;
CREATE TABLE `Mensagem` (
    `Id_Msg` INT primary Key AUTO_INCREMENT,
    `Desc_Msg` VARCHAR(255) NOT NUll
)

DROP TABLE IF EXISTS `Cliente`;
CREATE TABLE `Cliente` (
    `Id_Cliente` INT primary Key AUTO_INCREMENT,
    `Cliente_nome` VARCHAR(50) NOT NUll,
    `Cliente_tel` VARCHAR(12) NOT NUll,
    `Cliente_email` VARCHAR(50) NOT NUll,
    `Cliente_senha` VARCHAR(255) NOT NUll
)

DROP TABLE IF EXISTS `Mensagem_cliente`;
CREATE TABLE `Mensagem_cliente` (
    `Id_Msg_Cli` INT primary Key,
    `Fk_id_cli` INT NOT NUll,
    `Fk_id_Msg` INT NOT NUll
)
