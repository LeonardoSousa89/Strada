-- Gera��o de Modelo f�sico
-- Sql ANSI 2003 - brModelo.

-- adaptar ao postgreSql

CREATE DATABASE vex;

\c vex

CREATE SCHEMA vex_schema;
DROP SCHEMA vex;

/* Organização e suas relações */
CREATE TABLE IF NOT EXISTS vex_schema.org (
    org_id SERIAL PRIMARY KEY,
    fantasy_name VARCHAR(250),
    corporate_name VARCHAR(250),
    cnpj VARCHAR(250),
    org_status VARCHAR(250),
    cnae_main_code VARCHAR(250),
    open_date VARCHAR(250),
    password VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS vex_schema.org_address (
    org_address_id SERIAL PRIMARY KEY,
    zip_code VARCHAR(250),
    street_type VARCHAR(250),
    public_place VARCHAR(250),
    org_number VARCHAR(250),
    complement VARCHAR(250),
    neighborhood VARCHAR(250),
    county VARCHAR(250),
    country VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS vex_schema.org_contact (
    org_contact_id SERIAL PRIMARY KEY,
    telephone VARCHAR(250),
    ddd VARCHAR(250),
    email VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS vex_schema.org_ip_data_provider (
    org_ip_data_provider_id SERIAL PRIMARY KEY,
    ip VARCHAR(250),
    hostname VARCHAR(250),
    city VARCHAR(250),
    region VARCHAR(250),
    country VARCHAR(250),
    loc VARCHAR(250),
    org VARCHAR(250),
    postal VARCHAR(250),
    timezone VARCHAR(250),
    readme VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS vex_schema.org_address_relation_table (
    org_address_relation_id INT,
    org_relation_id INT,
    FOREIGN KEY(org_address_relation_id) REFERENCES vex_schema.org_address (org_address_id),
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id)
);

CREATE TABLE IF NOT EXISTS vex_schema.org_contact_relation_table (
    org_contact_relation_id INT,
    org_relation_id INT,
    FOREIGN KEY(org_contact_relation_id) REFERENCES vex_schema.org_contact (org_contact_id),
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id)
);

CREATE TABLE IF NOT EXISTS vex_schema.org_ip_data_provider_relation_table (
    org_ip_data_provider_relation_id INT,
    org_relation_id INT,
    FOREIGN KEY(org_ip_data_provider_relation_id) REFERENCES vex_schema.org_ip_data_provider (org_ip_data_provider_id),
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id)
);

CREATE TABLE IF NOT EXISTS vex_schema.org_driver_relation_table (
    org_relation_id INT,
    driver_relation_id INT,
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id),
    FOREIGN KEY(driver_relation_id) REFERENCES vex_schema.driver (driver_id)
);

/* Motorista e suas relações */

CREATE TABLE IF NOT EXISTS vex_schema.driver (
    driver_id SERIAL PRIMARY KEY,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    email VARCHAR(250)NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS vex_schema.driver_address (
    driver_address_id SERIAL PRIMARY KEY,
    zip_code VARCHAR(250)NOT NULL,
    state VARCHAR(250)NOT NULL,
    city VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS vex_schema.driver_contact (
    driver_contact_id SERIAL PRIMARY KEY,
    telephone VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS vex_schema.driver_document (
    driver_document_id SERIAL PRIMARY KEY,
    cnh VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS vex_schema.information (
    information_id SERIAL PRIMARY KEY,
    starting_km VARCHAR(250),
    final_km VARCHAR(250),
    plate VARCHAR(250) NOT NULL,
    notes VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS vex_schema.driver_address_relation_table (

    driver_address_relation_id INT,
    driver_relation_id INT,
    org_relation_id INT,
    FOREIGN KEY(driver_address_relation_id) REFERENCES vex_schema.driver_address (driver_address_id),
    FOREIGN KEY(driver_relation_id) REFERENCES vex_schema.driver (driver_id),
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id)
);

CREATE TABLE IF NOT EXISTS vex_schema.driver_document_relation_table (
    driver_document_relation_id INT,
    driver_relation_id INT,
    org_relation_id INT,
    FOREIGN KEY(driver_document_relation_id) REFERENCES vex_schema.driver_document (driver_document_id),
    FOREIGN KEY(driver_relation_id) REFERENCES vex_schema.driver (driver_id),
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id)
);

CREATE TABLE IF NOT EXISTS vex_schema.driver_contact_relation_table (
    driver_contact_relation_id INT,
    driver_relation_id INT,
    org_relation_id INT,
    FOREIGN KEY(driver_contact_relation_id) REFERENCES vex_schema.driver_contact (driver_contact_id),
    FOREIGN KEY(driver_relation_id) REFERENCES vex_schema.driver (driver_id),
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id)
);

CREATE TABLE IF NOT EXISTS vex_schema.driver_information_relation_table (
    driver_relation_id INT,
    information_relation_id INT,
    org_relation_id INT,
    FOREIGN KEY(driver_relation_id) REFERENCES vex_schema.driver (driver_id),
    FOREIGN KEY(information_relation_id) REFERENCES vex_schema.information (information_id),
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id)
); 

/* a fazer */
CREATE TABLE IF NOT EXISTS vex_schema.role (
    role_id SERIAL PRIMARY KEY,
    role VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS vex_schema.org_role_relation_table (
    org_role_relation_table_id SERIAL,		
    role_relation_id INT,
    org_relation_id INT,
    FOREIGN KEY(role_relation_id) REFERENCES vex_schema.role (role_id),
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id)
); 

CREATE TABLE IF NOT EXISTS vex_schema.driver_role_relation_table (
    driver_role_relation_table_id SERIAL,
    driver_relation_id INT,
    role_relation_id INT,
    org_relation_id INT,
    FOREIGN KEY(driver_relation_id) REFERENCES vex_schema.driver (driver_id),
    FOREIGN KEY(role_relation_id) REFERENCES vex_schema.role (role_id),
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id)
); 
/* a fazer */

INSERT INTO vex_schema.midia_uri VALUES(1,'https://firebasestorage.googleapis.com/v0/b/checklist-246ae.appspot.com/o/testes%2Fpneu_careca.jpg?alt=media&token=6b5abd31-c2f6-42b2-8642-8286bb459d32');

ALTER TABLE vex_schema.information ADD COLUMN date_time_registry VARCHAR(250);

ALTER TABLE vex_schema.org_address_relation_table ADD COLUMN org_address_relation_table_id SERIAL;
ALTER TABLE vex_schema.org_contact_relation_table ADD COLUMN org_contact_relation_table_id SERIAL;
ALTER TABLE vex_schema.org_driver_relation_table  ADD COLUMN org_driver_relation_table_id  SERIAL;

ALTER TABLE vex_schema.driver_address_relation_table     ADD COLUMN driver_address_relation_table_id SERIAL;
ALTER TABLE vex_schema.driver_document_relation_table    ADD COLUMN driver_document_relation_table_id SERIAL;
ALTER TABLE vex_schema.driver_contact_relation_table     ADD COLUMN driver_contact_relation_table_id SERIAL;
ALTER TABLE vex_schema.driver_information_relation_table ADD COLUMN driver_information_relation_table_id SERIAL;

ALTER TABLE vex_schema.org_ip_data_provider_relation_table ADD COLUMN org_ip_data_provider_relation_table_id SERIAL;

ALTER TABLE vex_schema.org ADD COLUMN public_ip_client_data VARCHAR(250);
ALTER TABLE vex_schema.org ADD COLUMN cnae_main_description VARCHAR(250);
ALTER TABLE vex_schema.org ADD COLUMN sector VARCHAR(250);

ALTER TABLE vex_schema.org DROP COLUMN create_at;

ALTER TABLE vex_schema.org ADD COLUMN created_at VARCHAR(250);
ALTER TABLE vex_schema.org DROP COLUMN public_ip_client_data;


DROP TABLE vex_schema.org;
DROP TABLE vex_schema.org_address;
DROP TABLE vex_schema.org_contact;
DROP TABLE vex_schema.org_ip_data_provider;
DROP TABLE vex_schema.org_address_relation_table;
DROP TABLE vex_schema.org_contact_relation_table;
DROP TABLE vex_schema.org_driver_relation_table;

DROP TABLE vex_schema.driver;
DROP TABLE vex_schema.driver_address;
DROP TABLE vex_schema.driver_contact;
DROP TABLE vex_schema.driver_document;
DROP TABLE vex_schema.driver_address_relation_table;
DROP TABLE vex_schema.driver_document_relation_table;
DROP TABLE vex_schema.driver_contact_relation_table;
DROP TABLE vex_schema.driver_information_relation_table;

DROP TABLE vex_schema.information;

DROP TABLE vex_schema.midia_uri;
DROP TABLE vex_schema.information_midia_uri_relation_table;

SELECT * FROM vex_schema.org;
SELECT * FROM vex_schema.org_address;
SELECT * FROM vex_schema.org_contact;
SELECT * FROM vex_schema.org_ip_data_provider;
SELECT * FROM vex_schema.org_address_relation_table;
SELECT * FROM vex_schema.org_contact_relation_table;
SELECT * FROM vex_schema.org_ip_data_provider_relation_table;
SELECT * FROM vex_schema.org_driver_relation_table;

SELECT * FROM vex_schema.driver;
SELECT * FROM vex_schema.driver_address;
SELECT * FROM vex_schema.driver_contact;
SELECT * FROM vex_schema.driver_document;
SELECT * FROM vex_schema.driver_address_relation_table;
SELECT * FROM vex_schema.driver_document_relation_table;
SELECT * FROM vex_schema.driver_contact_relation_table;
SELECT * FROM vex_schema.driver_information_relation_table;

SELECT * FROM vex_schema.information;

SELECT * FROM vex_schema.midia_uri;
SELECT * FROM vex_schema.information_midia_uri_relation_table;

SELECT  org.org_id, 
        org.fantasy_name, 
        org.cnpj, 
        org.org_status,
        org.cnae_main_code,
        org.open_date,
        address.org_address_id, 
        address.zip_code, 
        address.street_type,
        address.public_place,
        address.org_number,
        address.complement,
        address.neighborhood,
        address.county,
        address.country
FROM vex_schema.org_address_relation_table
INNER JOIN vex_schema.org_address address
ON org_address_relation_table.org_address_relation_id = address.org_address_id
INNER JOIN vex_schema.org org
ON org_address_relation_table.org_relation_id = org.org_id
WHERE org.org_id = 37;


DELETE FROM vex_schema.org;
DELETE FROM vex_schema.org_address;
DELETE FROM vex_schema.org_contact;
DELETE FROM vex_schema.org_ip_data_provider;
DELETE FROM vex_schema.org_address_relation_table;
DELETE FROM vex_schema.org_contact_relation_table;
DELETE FROM vex_schema.org_driver_relation_table;

DELETE FROM vex_schema.driver;
DELETE FROM vex_schema.driver_address;
DELETE FROM vex_schema.driver_contact;
DELETE FROM vex_schema.driver_document;
DELETE FROM vex_schema.driver_address_relation_table;
DELETE FROM vex_schema.driver_document_relation_table;
DELETE FROM vex_schema.driver_contact_relation_table;
DELETE FROM vex_schema.driver_information_relation_table;

DELETE FROM vex_schema.information;

DELETE FROM vex_schema.midia_uri;
DELETE FROM vex_schema.information_midia_uri_relation_table;

delete from vex_schema.org where org_id > 176;
delete from vex_schema.driver where driver_id > 89;
delete from vex_schema.org_ip_data_provider where org_ip_data_provider_id > 13; 

CREATE TABLE IF NOT EXISTS vex_schema.midia_uri (
    midia_uri_id SERIAL PRIMARY KEY,
    uri VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS vex_schema.information_midia_uri_relation_table (
    midia_uri_relation_table_id SERIAL,
    midia_uri_relation_id INT,
    information_relation_id INT,
    driver_relation_id INT,
    org_relation_id INT,
    FOREIGN KEY(midia_uri_relation_id) REFERENCES vex_schema.midia_uri (midia_uri_id),
    FOREIGN KEY(information_relation_id) REFERENCES vex_schema.information (information_id),
    FOREIGN KEY(driver_relation_id) REFERENCES vex_schema.driver (driver_id),
    FOREIGN KEY(org_relation_id) REFERENCES vex_schema.org (org_id)
); 

DROP TABLE vex_schema.midia_uri; 
DROP TABLE vex_schema.information_midia_uri_relation_table; 

SELECT * FROM vex_schema.midia_uri; 
SELECT * FROM vex_schema.information_midia_uri_relation_table; 