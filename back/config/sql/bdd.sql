CREATE DATABASE IF NOT EXISTS myBdd;
USE myBdd;

-- Création de la table roles
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    permission INT,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);

-- Création de la table authorizations
CREATE TABLE IF NOT EXISTS authorizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    can_create BOOLEAN DEFAULT FALSE,
    can_edit BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Création de la table features
CREATE TABLE IF NOT EXISTS features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Création de la table sections
CREATE TABLE IF NOT EXISTS sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Création de la table sections
CREATE TABLE IF NOT EXISTS sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Création de la table club
CREATE TABLE IF NOT EXISTS club (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    history TEXT
);

-- Création de la table teams
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    section_id INT,
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL
);

-- Création de la table club
CREATE TABLE IF NOT EXISTS club (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    history TEXT
);

-- Création de la table teams
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    section_id INT,
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL
);

-- Création de la table news
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    resume VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    created_at DATE,
    edit_at TIMESTAMP,
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
);

-- Création de la table sponsors
CREATE TABLE IF NOT EXISTS sponsors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logo VARCHAR(255),
    url LONGTEXT
);

-- Création de la table matches
CREATE TABLE IF NOT EXISTS matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT,
    team_id INT,
    score VARCHAR(50),
    date DATETIME,
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
);

-- INSERT ROLES
INSERT INTO roles (name)
VALUES ('admin'), ('editor');

-- INSERT USERS
INSERT INTO users (email, password, first_name, last_name, role_id, active, permission)
VALUES ('admin@example.com', 'securepassword', 'Admin', 'User', 1, TRUE, 7777),
       ('user@lambda.com', 'testing','Lambda', 'User', 2, FALSE, 0626);

-- INSERT FEATURES
INSERT INTO features (name)
VALUES 
('Présentation du club'),
('Actualités'),
('Partenaires'),
('Matchs');

-- INSERT AUTHORIZATIONS
INSERT INTO authorizations (user_id, can_create, can_edit, can_delete)
VALUES (1, TRUE, TRUE, TRUE);

-- INSERT SECTIONS
INSERT INTO sections (name)
VALUES
('masculin junior'),
('masculin senior'),
('feminin junior'),
('feminin senior');

-- INSERT CLUBS
INSERT INTO club (description, history)
VALUES 
('Description du Club XYZ', 'Histoire du Club XYZ');

-- INSERT TEAMS
INSERT INTO teams (name, section_id)
VALUES 
('Notre club', 1),
('Notre club', 2),
('Notre club', 3),
('Notre club', 4),
('Paris FC', 1),
('Paris FC', 2),
('Paris FC', 3),
('Paris FC', 4),
('Marseille', 1),
('Marseille', 2),
('Marseille', 3),
('Marseille', 4),
('Olympique lyonnais', 1),
('Olympique lyonnais', 2),
('Olympique lyonnais', 3),
('Olympique lyonnais', 4),
('Toulouse', 1),
('Toulouse', 2),
('Toulouse', 3),
('Toulouse', 4),
('Girondin de Bordeaux', 1),
('Girondin de Bordeaux', 2),
('Girondin de Bordeaux', 3),
('Girondin de Bordeaux', 4);

-- INSERT SPONSORS
INSERT INTO sponsors (logo, url)
VALUES 
('Nike', 'https://www.nike.com/fr/'),
('Amazon', 'https://www.amazon.fr/'),
('Tesla', 'https://www.tesla.com/fr_fr');


-- INSERT MATCHES
INSERT INTO matches (section_id, team_id, score, date)
VALUES
(1, 1, '2-1',  '2024-10-05 15:00:00'),
(2, 2, '3-0', '2024-10-06 18:30:00'),
(3, 3, '1-1',  '2024-10-07 14:00:00'),
(4, 4, '4-2', '2024-10-08 17:45:00'),
(1, 5, '0-2', '2024-10-09 16:00:00'),
(2, 6, '1-3', '2024-10-10 19:00:00'),
(3, 7, '2-2', '2024-10-14 15:30:00'),
(4, 8, '3-1', '2024-10-15 18:00:00'),
(1, 9, '1-0', '2024-10-16 14:00:00'),
(4, 10, '0-0', '2024-10-17 16:45:00');
