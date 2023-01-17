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
("p005", "Orelha bovina desidratada", 9.90, "Petiscos e ossos")
;

--APROFUNDAMENTO SQL
    --EXERCICIO 1
    --RETORNA TODOS OS USUÁRIOS CADASTRADOS
    SELECT * FROM users;
    --RETORNA TODOS OS PRODUTOS CADASTRADOS
    SELECT * FROM products;
    --RETORNA UM PRODUTO PESQUISADO PELO NOME
    SELECT * FROM products
    WHERE name LIKE "toca%";
    --CRIANDO USUÁRIO
    INSERT INTO users(id, email, password)
    VALUES("u004", "jurema@email.com", "123juju456"),
    ("u005", "mae_joana@emial.com", "joaninha21");
    --CRIANDO NOVO PRODUTO
    INSERT INTO products(id, name, price, category)
    VALUES("p006", "Traquéia desidratada", 7.90, "petiscos e ossos"),
    ("p007", "Caminha pet tam. G", 190, "Camas e tocas"),
    ("p008", "Arranhador", 75.90, "Brinquedos"),
    ("p009", "Frango de latex com apito", 34.90, "Brinquedos"),
    ("p010", "Osso crecheado 7 cm-Bacon", 6.90, "Petiscos e ossos"),
    ("p011", "Guia unificada 1,5m", 55.90, "Acessórios"),
    ("p012", "Guia unificada 3m", 79.90, "Acessórios"),
    ("p013", "Clicker", 29.90, "Acessórios"),
    ("p014", "Bifinho-Frango", 9.90, "Petiscos e ossos"),
    ("p015", "Bifinho-Bacon", 9.90, "Petiscos e ossos"),
    ("p016", "Cookie frutas vermelhas", 14.25, "Petiscos e ossos"),
    ("p017", "Cama suspensa para gatos", 49.90, "Camas e tocas"),
    ("p018", "Osso natural bovino 20cm", 15.80, "Petiscos e ossos"),
    ("p019", "Caixa de transporte n 8", 100, "Acessórios"),
    ("p020", "Apito ultrassônico", 29.90, "Acessorios"),
    ("p021", "Coleira peitral", 25.90, "Acessórios");

    --EXERCÍCIO 2
    --BUSCAR PRODUTO POR UM id MOCKADO
    SELECT*FROM products
    WHERE id="p007";
    --DELETAR UM USUARIO POR UM id MOCKADO
    DELETE FROM users
    WHERE id="u004";
    --DELETAR UM PRODUTO POR id MOCKADO
    DELETE FROM products
    WHERE id="p021";
    --EDITAR USUARIO
    UPDATE users
    SET id="u004"
    WHERE id="u005";
    --EDITAR PRODUTO
    UPDATE products
    SET name="Arranhador pequeno"
    WHERE id="p008";
    
    --EXERCÍCIO 3
    --RETORNAR OS USUÁRIOS EM ORDEM CRESCENTE A PARTIR DA COLUNA EMAIL
    SELECT*FROM users
    ORDER BY email ASC;
    --RETORNA OS PRODUTOS ORDENADOS POR ORDEM CRESCENTE DE PREÇO, LIMITADO ENTRE O PRIMEIRO E VIGÉSIMO ITEM
    SELECT*FROM products
    ORDER BY price ASC 
    LIMIT 10 OFFSET 10;
    --RETORNAR PRODUTOS COM PREÇO DENTRO DE UM INTERVALO
    SELECT*FROM products
    WHERE price>20 AND price<100

