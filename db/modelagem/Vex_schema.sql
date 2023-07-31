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

ALTER TABLE vex_schema.information ADD COLUMN date_time_registry VARCHAR(250);

DROP TABLE vex_schema.org;
DROP TABLE vex_schema.org_address;
DROP TABLE vex_schema.org_contact;
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



SELECT * FROM vex_schema.org;
SELECT * FROM vex_schema.org_address;
SELECT * FROM vex_schema.org_contact;
SELECT * FROM vex_schema.org_address_relation_table;
SELECT * FROM vex_schema.org_contact_relation_table;
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