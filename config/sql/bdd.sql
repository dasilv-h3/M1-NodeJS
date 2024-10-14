CREATE DATABASE IF NOT EXISTS myBdd;
Use myBdd;

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('admin', 'editor') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);

-- Création de la table authorizations
CREATE TABLE IF NOT EXISTS authorizations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    can_create BOOLEAN DEFAULT FALSE,
    can_edit BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE
);

-- Création de la table features
CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Création de la table news
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    resume VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    created_at DATE,
    edit_at TIMESTAMP
);

-- Création de la table club
CREATE TABLE IF NOT EXISTS club (
    id SERIAL PRIMARY KEY,
    description TEXT,
    history TEXT
);

-- Création de la table sponsors
CREATE TABLE IF NOT EXISTS sponsors (
    id SERIAL PRIMARY KEY,
    logo VARCHAR(255),
    url LONGTEXT
);

-- Création de la table matches
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    category ENUM('masculin junior', 'masculin senior', 'feminin junior', 'feminin senior'),
    score VARCHAR(50),
    opponent VARCHAR(255),
    date DATETIME
);

-- Création de la table teams
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    category ENUM('masculin junior', 'masculin senior', 'feminin junior', 'feminin senior')
);

-- Ajout des relations entre les tables
ALTER TABLE news ADD CONSTRAINT fk_club_id FOREIGN KEY (id) REFERENCES club(id);
ALTER TABLE matches ADD CONSTRAINT fk_team_id FOREIGN KEY (id) REFERENCES teams(id);
ALTER TABLE sponsors ADD CONSTRAINT fk_club_id FOREIGN KEY (id) REFERENCES club(id);

-- INSERT USERS
INSERT INTO users (email, password, first_name, last_name, role)
VALUES ('admin@example.com', 'securepassword', 'Admin', 'User', 'admin');

-- INSERT FEATURES
INSERT INTO features ()
VALUES ('Présentation du club'),
('Actualités'),
('Partenaires'),
('Matchs');

-- INSERT AUTHORIZATIONS
INSERT INTO authorizations (user_id, can_create, can_edit, can_delete)
VALUES (1, TRUE, TRUE, TRUE);

-- INSERT TEAMS
INSERT INTO teams (name, category)
VALUES 
('Paris FC', 'masculin junior'),
('Marseille', 'masculin senior'),
('Olympique lyonnais', 'feminin junior'),
('Toulouse', 'feminin senior'),
('Girondin de Bordeaux', 'masculin junior');

-- INSERT SPONSORS
INSERT INTO sponsors (logo, url)
VALUES 
('Nike', 'https://www.nike.com/fr/'),
('Amazon', 'https://www.amazon.fr/'),
('Tesla', 'https://www.tesla.com/fr_fr');

-- INSERT MATCHES (score: premier résultat est le score du club)
INSERT INTO matches (category, score, opponent, date)
VALUES
('masculin junior', '2-1', 'Lille OSC', '2024-10-05 15:00:00'),
('masculin senior', '3-0', 'AS Monaco', '2024-10-06 18:30:00'),
('feminin junior', '1-1', 'Montpellier HSC', '2024-10-07 14:00:00'),
('feminin senior', '4-2', 'OGC Nice', '2024-10-08 17:45:00'),
('masculin junior', '0-2', 'RC Strasbourg', '2024-10-09 16:00:00'),
('masculin senior', '1-3', 'Rennes', '2024-10-10 19:00:00'),
('feminin junior', '2-2', 'PSG', '2024-10-14 15:30:00'),
('feminin senior', '3-1', 'FC Nantes', '2024-10-15 18:00:00'),
('masculin junior', '1-0', 'Angers SCO', '2024-10-16 14:00:00'),
('feminin senior', '0-0', 'FC Metz', '2024-10-17 16:45:00');
