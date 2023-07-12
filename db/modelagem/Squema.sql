-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.



CREATE TABLE organizacao (
org_id VARCHAR(10) PRIMARY KEY,
cnpj VARCHAR(10),
status VARCHAR(10),
ddd VARCHAR(10),
email VARCHAR(10),
logradouro VARCHAR(10),
cep VARCHAR(10),
bairro VARCHAR(10),
uf VARCHAR(10),
complemento VARCHAR(10),
numero VARCHAR(10),
telefone VARCHAR(10),
municipio VARCHAR(10)
)

CREATE TABLE termos_de_uso (
termo_contratual VARCHAR(10),
term_id VARCHAR(10) PRIMARY KEY
)

CREATE TABLE usuario (
cnh VARCHAR(10),
celular VARCHAR(10),
nome VARCHAR(10),
sobrenome VARCHAR(10),
email VARCHAR(10),
usr_id VARCHAR(10) PRIMARY KEY
)

CREATE TABLE informacao (
info_id VARCHAR(10) PRIMARY KEY,
km_inicial VARCHAR(10),
km_final VARCHAR(10),
placa_veic VARCHAR(10),
anotacoes VARCHAR(10)
)

CREATE TABLE org_do_usuario (
org_id VARCHAR(10),
usr_id VARCHAR(10),
FOREIGN KEY(org_id) REFERENCES organizacao (org_id),
FOREIGN KEY(usr_id) REFERENCES usuario (usr_id)
)

CREATE TABLE term_da_org (
term_id VARCHAR(10),
org_id VARCHAR(10),
FOREIGN KEY(term_id) REFERENCES termos_de_uso (term_id),
FOREIGN KEY(org_id) REFERENCES organizacao (org_id)
)

CREATE TABLE term_do_usuario (
usr_id VARCHAR(10),
term_id VARCHAR(10),
FOREIGN KEY(usr_id) REFERENCES usuario (usr_id),
FOREIGN KEY(term_id) REFERENCES termos_de_uso (term_id)
)

CREATE TABLE info_do_usuario (
info_id VARCHAR(10),
usr_id VARCHAR(10),
FOREIGN KEY(info_id) REFERENCES informacao (info_id),
FOREIGN KEY(usr_id) REFERENCES usuario (usr_id)
)

