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
    `cliente_nome` VARCHAR(50) NOT NUll,
    `cliente_tel` VARCHAR(12) NOT NUll,
    `cliente_email` VARCHAR(50) NOT NUll,
  PRIMARY KEY (`id_cliente`)
);

DROP TABLE IF EXISTS `servico`;
CREATE TABLE `servico`(
  `id_servico` INT NOT NULL AUTO_INCREMENT,
  `titulo_servico` VARCHAR(50) NOT NULL,
  `desc_servico` VARCHAR(150) NOT NULL,
  `duracao_servico` INT NOT NULL,
  `preco_servico` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_servico`)
);

DROP TABLE IF EXISTS `mensagem`;
CREATE TABLE `mensagem` (
    `id_msg` INT NOT NULL AUTO_INCREMENT,
    `desc_Msg` VARCHAR(255) NOT NUll,
  PRIMARY KEY (`id_msg`)
);
  
DROP TABLE IF EXISTS `agendamento`;
CREATE TABLE `agendamento`(
  `id_agendamento` INT NOT NULL AUTO_INCREMENT,
  `data_inicio_agendamento` DATETIME NOT NULL,
  `data_fim_agendamento` DATETIME NOT NULL,
  `status_agendamento` CHAR(1) NOT NULL,
  `fk_id_cli` INT NOT NULL,
  `fk_id_serv` INT NOT NULL,
  CONSTRAINT `fk_id_cli` FOREIGN KEY (`fk_id_cli`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_id_serv` FOREIGN KEY (`fk_id_serv`) REFERENCES `servico` (`id_servico`),
  PRIMARY KEY (`id_agendamento`)
);

DROP TABLE IF EXISTS `agendamento_servicos`;
CREATE TABLE `agendamento_servicos`(
  `id_agend_servico` INT AUTO_INCREMENT,
  `fk_id_servico` INT NOT NULL,
  `fk_id_agendamento` INT NOT NULL,
  CONSTRAINT `fk_id_servico` FOREIGN KEY (`fk_id_servico`) REFERENCES `servico` (`id_servico`),
  CONSTRAINT `fk_id_agendamento` FOREIGN KEY (`fk_id_agendamento`) REFERENCES `agendamento` (`id_agendamento`),
  PRIMARY KEY (`id_agend_servico`)
);

-- cliente
INSERT INTO `cliente` VALUES(0,'Lauro Pinheiro1','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Lauro Pinheiro2','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Lauro Pinheiro3','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Lauro Pinheiro4','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Lauro Pinheiro5','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Lauro Pinheiro6','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Lauro Pinheiro7','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Lauro Pinheiro8','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Lauro Pinheiro9','15675643598','pinheiro_Luaor@hotmail.com');
-- s

-- agendamento
INSERT INTO `agendamento` VALUES(0,'1000-01-01 00:00:00','1000-01-02 00:00:00','e',1,1);
INSERT INTO `agendamento` VALUES(0,'1000-01-01 00:00:00','1000-01-02 00:00:00','e',1,1);
INSERT INTO `agendamento` VALUES(0,'1000-01-01 00:00:00','1000-01-02 00:00:00','e',1,1);
INSERT INTO `agendamento` VALUES(0,'1000-01-01 00:00:00','1000-01-02 00:00:00','e',1,1);
INSERT INTO `agendamento` VALUES(0,'1000-01-01 00:00:00','1000-01-02 00:00:00','e',1,1);
INSERT INTO `agendamento` VALUES(0,'1000-01-01 00:00:00','1000-01-02 00:00:00','e',1,1);
INSERT INTO `agendamento` VALUES(0,'1000-01-01 00:00:00','1000-01-02 00:00:00','e',1,1);
INSERT INTO `agendamento` VALUES(0,'1000-01-01 00:00:00','1000-01-02 00:00:00','e',1,1);
-- s

-- servico
INSERT INTO `servico` VALUES(0, 'Corte de cabelo - curto1', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.','30','20.00');
INSERT INTO `servico` VALUES(0, 'Corte de cabelo - curto2', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.','30','20.00');
INSERT INTO `servico` VALUES(0, 'Corte de cabelo - curto3', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.','30','20.00');
INSERT INTO `servico` VALUES(0, 'Corte de cabelo - curto4', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.','30','20.00');
INSERT INTO `servico` VALUES(0, 'Corte de cabelo - curto5', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.','30','20.00');
INSERT INTO `servico` VALUES(0, 'Corte de cabelo - curto6', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.','30','20.00');
INSERT INTO `servico` VALUES(0, 'Corte de cabelo - curto7', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.','30','20.00');
INSERT INTO `servico` VALUES(0, 'Corte de cabelo - curto8', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.','30','20.00');
INSERT INTO `servico` VALUES(0, 'Corte de cabelo - curto9', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.','30','20.00');
-- s
