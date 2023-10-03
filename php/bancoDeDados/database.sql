CREATE DATABASE IF NOT EXISTS `josy_espaco_vip` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
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
  `hora_inicio_agendamento` TIME NOT NULL,
  `hora_fim_agendamento` TIME NOT NULL,
  `data_agend` DATE NOT NULL,
  `status_agendamento` CHAR(1) NOT NULL,
  `preco_agend` DECIMAL(10,2) NOT NULL,
  `metodo_de_pagamento` VARCHAR(20) NOT NULL,
  `cli_agendamento` VARCHAR(70) NOT NULL,
  `serv_agendamento` VARCHAR(255) NOT NULL,
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
INSERT INTO `cliente`(cliente_nome, cliente_tel, cliente_email) VALUES('lauro pinheiro1','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente`(cliente_nome, cliente_tel, cliente_email) VALUES('lauro pinheiro2','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente`(cliente_nome, cliente_tel, cliente_email) VALUES('lauro pinheiro3','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente`(cliente_nome, cliente_tel, cliente_email) VALUES('lauro pinheiro4','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente`(cliente_nome, cliente_tel, cliente_email) VALUES('lauro pinheiro5','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente`(cliente_nome, cliente_tel, cliente_email) VALUES('lauro pinheiro6','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente`(cliente_nome, cliente_tel, cliente_email) VALUES('lauro pinheiro7','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente`(cliente_nome, cliente_tel, cliente_email) VALUES('lauro pinheiro8','15675643598','pinheiro_Luaor@hotmail.com');
INSERT INTO `cliente`(cliente_nome, cliente_tel, cliente_email) VALUES('lauro pinheiro9','15675643598','pinheiro_Luaor@hotmail.com');
-- s

-- agendamento
INSERT INTO `agendamento`(hora_inicio_agendamento, hora_fim_agendamento, data_agend, status_agendamento,preco_agend,
metodo_de_pagamento, cli_agendamento, serv_agendamento) VALUES('00:00:00','10:01:00','2023-10-20','c',120,'pix','Josy A','cabelo, unha');
INSERT INTO `agendamento`(hora_inicio_agendamento, hora_fim_agendamento, data_agend, status_agendamento,preco_agend,
metodo_de_pagamento, cli_agendamento, serv_agendamento) VALUES('00:00:00','10:02:00','2023-10-20','c',120,'pix','Josy B','cabelo, unha');
INSERT INTO `agendamento`(hora_inicio_agendamento, hora_fim_agendamento, data_agend, status_agendamento,preco_agend,
metodo_de_pagamento, cli_agendamento, serv_agendamento) VALUES('00:00:00','10:03:00','2023-10-20','c',120,'pix','Josy C','unha');
INSERT INTO `agendamento`(hora_inicio_agendamento, hora_fim_agendamento, data_agend, status_agendamento,preco_agend,
metodo_de_pagamento, cli_agendamento, serv_agendamento) VALUES('00:00:00','10:04:00','2023-10-20','c',120,'pix','Josy D','cabelo, unha');
INSERT INTO `agendamento`(hora_inicio_agendamento, hora_fim_agendamento, data_agend, status_agendamento,preco_agend,
metodo_de_pagamento, cli_agendamento, serv_agendamento) VALUES('00:00:00','10:05:00','2023-10-20','e',120,'pix','Josy E','cabelo');
INSERT INTO `agendamento`(hora_inicio_agendamento, hora_fim_agendamento, data_agend, status_agendamento,preco_agend,
metodo_de_pagamento, cli_agendamento, serv_agendamento) VALUES('00:00:00','10:06:00','2023-10-20','e',120,'pix','Josy F','unha');
INSERT INTO `agendamento`(hora_inicio_agendamento, hora_fim_agendamento, data_agend, status_agendamento,preco_agend,
metodo_de_pagamento, cli_agendamento, serv_agendamento) VALUES('00:00:00','10:07:00','2023-10-20','e',120,'pix','Josy G','cabelo, unha');
INSERT INTO `agendamento`(hora_inicio_agendamento, hora_fim_agendamento, data_agend, status_agendamento,preco_agend,
metodo_de_pagamento, cli_agendamento, serv_agendamento) VALUES('00:00:00','10:08:00','2023-10-20','e',120,'pix','Josy H','cabelo, unha');
-- s

-- servico
INSERT INTO `servico`(titulo_servico, desc_servico, duracao_servico, preco_servico) VALUES('Corte de cabelo - curto2', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.', 30, '20.00');
INSERT INTO `servico`(titulo_servico, desc_servico, duracao_servico, preco_servico) VALUES('Corte de cabelo - curto3', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.', 30, '20.00');
INSERT INTO `servico`(titulo_servico, desc_servico, duracao_servico, preco_servico) VALUES('Corte de cabelo - curto1', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.', 30, '20.00');
INSERT INTO `servico`(titulo_servico, desc_servico, duracao_servico, preco_servico) VALUES('Corte de cabelo - curto4', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.', 30, '20.00');
INSERT INTO `servico`(titulo_servico, desc_servico, duracao_servico, preco_servico) VALUES('Corte de cabelo - curto5', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.', 30, '20.00');
INSERT INTO `servico`(titulo_servico, desc_servico, duracao_servico, preco_servico) VALUES('Corte de cabelo - curto6', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.', 30, '20.00');
INSERT INTO `servico`(titulo_servico, desc_servico, duracao_servico, preco_servico) VALUES('Corte de cabelo - curto7', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.', 30, '20.00');
INSERT INTO `servico`(titulo_servico, desc_servico, duracao_servico, preco_servico) VALUES('Corte de cabelo - curto8', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.', 30, '20.00');
INSERT INTO `servico`(titulo_servico, desc_servico, duracao_servico, preco_servico) VALUES('Corte de cabelo - curto9', 'Venha gastar a sua grana, com dinheiro há amor, já sem não me procure.', 30, '20.00');
