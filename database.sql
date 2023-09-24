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
INSERT INTO `cliente` VALUES(0,'Claudinha Buxexa','15999999999','clauclaubuxe@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Dartina Vardilna','15999999998','veiderdarti@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Senhorita Rosa','15999999997','srrosapink@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Waldina White','15999999996','wwhite@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Mikaela Jacksons Five','15999999995','mjackson@hotmail.com');
INSERT INTO `cliente` VALUES(0,'João Victor','15999999994','jaovictorkits@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Laura Pereira','15999999993','laurapeira@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Luiz Fiuza','15999999992','luizaffritas@hotmail.com');
INSERT INTO `cliente` VALUES(0,'Marlon Passos','15999999991','marlonpassoslargos@hotmail.com');

-- agendamento
INSERT INTO `agendamento` VALUES(0,'2023-09-01 00:00:00','1000-01-02 08:00:00','Confirmado',1,1);
INSERT INTO `agendamento` VALUES(0,'2023-09-01 00:00:00','1000-01-02 09:30:00','Em espera',2,2);
INSERT INTO `agendamento` VALUES(0,'2023-09-01 00:00:00','1000-01-02 11:50:00','Confirmado',3,3);
INSERT INTO `agendamento` VALUES(0,'2023-10-01 00:00:00','1000-01-02 14:00:00','Confirmado',4,4);
INSERT INTO `agendamento` VALUES(0,'2023-10-01 00:00:00','1000-01-02 15:00:00','Confirmado',5,5);
INSERT INTO `agendamento` VALUES(0,'2023-10-01 00:00:00','1000-01-02 16:00:00','Em espera',6,6);
INSERT INTO `agendamento` VALUES(0,'2023-11-01 00:00:00','1000-01-02 17:00:00','Em espera',7,7);
INSERT INTO `agendamento` VALUES(0,'2023-11-01 00:00:00','1000-01-02 18:00:00','Em espera',1,1);

-- servico
INSERT INTO `servico` VALUES(0, 'Corte de cabelo curto', 'Não existe mulher feia, existe mulher que não conhece os produtos da Jequiti','60','20.00');
INSERT INTO `servico` VALUES(0, 'Corte de cabelo médio', 'Olha que moça bonita e cheia de graça','45','40.00');
INSERT INTO `servico` VALUES(0, 'Corte de cabelo longo', '"Se cabelo fosse bom, não nascia no ..." - Luis Alborghetti','30','50.00');
INSERT INTO `servico` VALUES(0, 'Luzes de cabelo', '#fff no cabelo','45','55.00');
INSERT INTO `servico` VALUES(0, 'Manicure', 'Deixa sua mão bonita para que ninguém a evita','30','60.00');
INSERT INTO `servico` VALUES(0, 'Pedicure', 'Deixar seu pé bonito para não parecer com um andarílio','30','60.00');
INSERT INTO `servico` VALUES(0, 'Spa', 'Hey boys, there is a SPA messing around here!','30','100.00');
