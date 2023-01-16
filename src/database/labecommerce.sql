-- Active: 1673889389487@@127.0.0.1@3306

--CRIAÇÃO DA TABELA DE USUÁRIOS (users)
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

--DELETANDO A TABELA 
DROP TABLE users;

--POPULANDO A TABELA DE USUÁRIOS
INSERT INTO users (id, email, password)
VALUES ("u001", "maroca93@email.com", "123456"),
("u002", "sukete@email.com", "clebinho22"),
("u003", "erikinha@email.com", "miloca35");

--LENDO A TABELA users
SELECT * FROM users;

--CRIAÇÃO DA TABELA DE PRODUTOS (products)
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

--LENDO A TABELA products
SELECT * FROM products;

--POPULANDO A TABELA DE PRODUTOS
INSERT INTO products (id, name, price, category)
VALUES ("p001", "Caminha pet tam. P", 120.45, "Camas e tocas"),
("p002", "Toca de gato", 89.90, "Camas e tocas"),
("p003", "Cookies banana e aveia", 14.90, "Petiscos e ossos"),
("p004", "TBone de nylon", 74.90, "Brinquedos"),
("p005", "Orelha bovina desidratada", 9.90, "Petiscos e ossos");