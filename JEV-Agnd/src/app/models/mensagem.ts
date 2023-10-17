export interface Mensagem {
    tipo: string,
    descricao: string,
    id_mensagem INT NOT NULL AUTO_INCREMENT,
	titulo VARCHAR(30) NOT NULL,
	descricao VARCHAR(255) NOT NUll,
	cor VARCHAR(20) NOT NUll,
	icon VARCHAR(255),
}
