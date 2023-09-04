DROP DATABASE IF EXISTS `josy_espaco_vip`;
CREATE DATABASE `josy_espaco_vip`;
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
    `Cliente_nome` VARCHAR(50) NOT NUll,
    `Cliente_tel` VARCHAR(12) NOT NUll,
    `Cliente_email` VARCHAR(50) NOT NUll,
    `Cliente_senha` VARCHAR(255) NOT NUll,
  PRIMARY KEY (`id_cliente`)
);

DROP TABLE IF EXISTS `servico`;
CREATE TABLE `servico`(
  `id_servico` INT NOT NULL AUTO_INCREMENT,
  `titulo_serv` VARCHAR(50) NOT NULL,
  `desc_serv` VARCHAR(150) NOT NULL,
  `duracao` INT NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_servico`)
);

DROP TABLE IF EXISTS `mensagem`;
CREATE TABLE `mensagem` (
    `id_msg` INT NOT NULL AUTO_INCREMENT,
    `Desc_Msg` VARCHAR(255) NOT NUll,
  PRIMARY KEY (`id_msg`)
);
  
DROP TABLE IF EXISTS `agendamento`;
CREATE TABLE `agendamento`(
  `id_agendamento` INT NOT NULL AUTO_INCREMENT,
  `data_inicio` DATETIME NOT NULL,
  `data_fim` DATETIME NOT NULL,
  `estado` CHAR(1) NOT NULL,
  `fk_id_cli` INT NOT NULL,
  `fk_id_serv` INT NOT NULL,
  CONSTRAINT `fk_id_cli` FOREIGN KEY (`fk_id_cli`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_id_serv` FOREIGN KEY (`fk_id_serv`) REFERENCES `servico` (`id_servico`),
  PRIMARY KEY (`id_agendamento`)
);

DROP TABLE IF EXISTS `agendamento_servicos`;
CREATE TABLE `agendamento_servicos`(
  `id_agend_serv` INT AUTO_INCREMENT,
  `fk_id_serv` INT NOT NULL,
  `fk_id_agend` INT NOT NULL,
  CONSTRAINT `fk_id_serv` FOREIGN KEY (`fk_id_serv`) REFERENCES `servico` (`id_servico`),
  CONSTRAINT `fk_id_agend` FOREIGN KEY (`fk_id_agend`) REFERENCES `agendamento` (`id_agendamento`),
  PRIMARY KEY (`id_agend_serv`)
);

-- DROP TABLE IF EXISTS `Admin_Mensagem`;
-- CREATE TABLE `admin_Mensagem` (
--     `id_admin_msg` INT NOT NULL AUTO_INCREMENT,
--     `fk_id_msg` INT NOT NUll,
--   CONSTRAINT `fk_id_msg` FOREIGN KEY (`fk_id_msg`) REFERENCES `Mensagem` (`id_msg`),
--   PRIMARY KEY (`id_admin_msg`)
-- );

-- cliente
INSERT INTO `cliente` VALUES(0,'Lauro Pinheiro','15675643598','pinheiro_Luaor@hotmail.com','abc123234');
-- s

-- agendamento
INSERT INTO `Agendamento` VALUES(0,'1000-01-01 00:00:00','1000-01-02 00:00:00','e',1,1);
-- s

-- servico
INSERT INTO `servico` VALUES(0, 'Corte de cabelo - curto', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.','30','20.00');
-- s
