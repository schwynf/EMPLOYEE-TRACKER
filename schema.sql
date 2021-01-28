DROP DATABASE IF EXISTS personnel_DB;
CREATE DATABASE personnel_DB;
USE personnel_DB;


DROP TABLE employee;

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE roles;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE department;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;