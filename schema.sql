-- DROP TABEL  IF exists digimon;
CREATE TABLE digimons
(
    id serial PRIMARY KEY,
    name VARCHAR(255),
    img VARCHAR(255),
    level VARCHAR(255)
)