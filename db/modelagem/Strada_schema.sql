-- Gera��o de Modelo f�sico
-- Sql ANSI 2003 - brModelo.

-- adaptar ao postgreSql

CREATE TABLE org_address (
org_address_id VARCHAR(10) PRIMARY KEY,
zip_code VARCHAR(10),
street_type VARCHAR(10),
public_place VARCHAR(10),
org_number VARCHAR(10),
complement VARCHAR(10),
neighborhood VARCHAR(10),
county VARCHAR(10),
country VARCHAR(10)
)

CREATE TABLE org_contact (
org_contact_id VARCHAR(10) PRIMARY KEY,
telephone VARCHAR(10),
ddd VARCHAR(10),
email VARCHAR(10)
)

CREATE TABLE org (
org_id VARCHAR(10) PRIMARY KEY,
fantasy_name VARCHAR(10),
corporate_name VARCHAR(10),
cnpj VARCHAR(10),
org_status VARCHAR(10),
cnae_main_code VARCHAR(10),
open_date VARCHAR(10),
password VARCHAR(10)
)

CREATE TABLE driver (
driver_id VARCHAR(10) PRIMARY KEY,
first_name VARCHAR(10),
last_name VARCHAR(10),
email VARCHAR(10),
password VARCHAR(10)
)

CREATE TABLE driver_address (
driver_address_id VARCHAR(10) PRIMARY KEY,
zip_code VARCHAR(10),
state VARCHAR(10),
city VARCHAR(10)
)

CREATE TABLE driver_contact (
driver_contact_id VARCHAR(10) PRIMARY KEY,
telephone VARCHAR(10)
)

CREATE TABLE driver_document (
driver_document_id VARCHAR(10) PRIMARY KEY,
cnh VARCHAR(10)
)

CREATE TABLE information (
information_id VARCHAR(10) PRIMARY KEY,
starting_km VARCHAR(10),
final_km VARCHAR(10),
plate VARCHAR(10),
notes VARCHAR(10)
)

CREATE TABLE org_address_relation_table (
org_address_id VARCHAR(10),
org_id VARCHAR(10),
FOREIGN KEY(org_address_id) REFERENCES org_address (org_address_id),
FOREIGN KEY(org_id) REFERENCES org (org_id)
)

CREATE TABLE org_contact_relation_table (
org_contact_id VARCHAR(10),
org_id VARCHAR(10),
FOREIGN KEY(org_contact_id) REFERENCES org_contact (org_contact_id),
FOREIGN KEY(org_id) REFERENCES org (org_id)
)

CREATE TABLE driver_document_relation_table (
driver_document_id VARCHAR(10),
driver_id VARCHAR(10),
FOREIGN KEY(driver_document_id) REFERENCES driver_document (driver_document_id),
FOREIGN KEY(driver_id) REFERENCES driver (driver_id)
)

CREATE TABLE driver_contact_relation_table (
driver_contact_id VARCHAR(10),
driver_id VARCHAR(10),
FOREIGN KEY(driver_contact_id) REFERENCES driver_contact (driver_contact_id),
FOREIGN KEY(driver_id) REFERENCES driver (driver_id)
)

CREATE TABLE driver_address_relation_table (
driver_address_id VARCHAR(10),
driver_id VARCHAR(10),
FOREIGN KEY(driver_address_id) REFERENCES driver_address (driver_address_id),
FOREIGN KEY(driver_id) REFERENCES driver (driver_id)
)

CREATE TABLE org_driver_relation_table (
org_id VARCHAR(10),
driver_id VARCHAR(10),
FOREIGN KEY(org_id) REFERENCES org (org_id),
FOREIGN KEY(driver_id) REFERENCES driver (driver_id)
)

CREATE TABLE driver_information_relation_table (
driver_id VARCHAR(10),
information_id VARCHAR(10),
FOREIGN KEY(driver_id) REFERENCES driver (driver_id),
FOREIGN KEY(information_id) REFERENCES information (information_id)
)

