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

-- Création de la table club
CREATE TABLE IF NOT EXISTS club (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    history TEXT
);

-- Création de la table teams
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
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
    url LONGTEXT,
    name VARCHAR(255)
);

-- Création de la table matches
CREATE TABLE IF NOT EXISTS matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT,
    opponent_id INT,
    score VARCHAR(50),
    date DATETIME,
    FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL,
    FOREIGN KEY (opponent_id) REFERENCES teams(id) ON DELETE SET NULL
);

-- INSERT ROLES
INSERT INTO roles (name)
VALUES ('admin'), ('editor'), ('spectator');

-- INSERT USERS
INSERT INTO users (email, password, first_name, last_name, role_id, active, permission)
VALUES ('admin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$eDlHNUU0WThJa3BNRDRERA$vswSA5SzO8l2GEuns2MrlQ', 'Admin', 'User', 1, TRUE, 7777);

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
INSERT INTO teams (name)
VALUES 
('Paris FC'),
('Marseille'),
('Olympique lyonnais'),
('Toulouse'),
('Girondin de Bordeaux');

-- INSERT SPONSORS
INSERT INTO sponsors (logo, url)
VALUES 
('Nike.png', 'https://www.nike.com/fr/'),
('Amazon.png', 'https://www.amazon.fr/'),
('Tesla.png', 'https://www.tesla.com/fr_fr');


-- INSERT MATCHES
INSERT INTO matches (section_id, opponent_id, score, date)
VALUES
(1, 2, '1-1',  '2024-03-15 15:00:00'),
(2, 3, '2-0',  '2024-04-10 18:30:00'),
(3, 4, '3-1',  '2024-05-05 14:00:00'),
(4, 5, '0-2',  '2024-06-20 17:45:00'),
(1, 3, '2-2',  '2024-07-08 16:00:00'),
(2, 4, '4-3',  '2024-08-15 19:00:00'),
(3, 5, '1-0',  '2024-09-21 14:30:00'),
(4, 1, '3-1',  '2024-10-10 17:00:00'),
(1, 5, '0-2',  '2024-11-05 15:00:00'),
(2, 1, '2-2',  '2024-12-18 18:00:00'),
(1, 2, '2-0',  '2025-03-10 15:00:00'),
(2, 3, NULL,  '2025-04-05 18:30:00'),
(3, 4, NULL,  '2025-05-12 14:00:00'),
(4, 5, NULL,  '2025-06-20 17:45:00'),
(1, 3, NULL,  '2025-07-08 16:00:00'),
(2, 4, NULL,  '2025-08-15 19:00:00'),
(3, 5, NULL,  '2025-09-21 14:30:00'),
(4, 1, NULL,  '2025-10-10 17:00:00'),
(1, 5, NULL,  '2025-11-05 15:00:00'),
(2, 1, NULL,  '2025-12-18 18:00:00');

-- INSERT NEWS
INSERT INTO news (title, resume, description, image, created_at, edit_at, team_id)
VALUES 
('Victoire éclatante de Paris FC', 'Un match intense remporté par Paris FC', 'Paris FC a dominé le match contre son adversaire avec un score impressionnant de 2-1.', 'paris_fc_win.jpg', '2024-10-05', NOW(), 1),
('Marseille écrase son adversaire', 'Marseille a montré sa suprématie', 'Un excellent jeu collectif a permis à Marseille de s’imposer avec un score de 3-0.', 'marseille_win.jpg', '2024-10-06', NOW(), 2),
('Match nul pour l’Olympique Lyonnais', 'Un match équilibré entre les équipes', 'Malgré plusieurs occasions, les deux équipes se sont quittées sur un score de 1-1.', 'lyon_draw.jpg', '2024-10-07', NOW(), 3),
('Toulouse impressionne avec une victoire 4-2', 'Un match palpitant avec de nombreux buts', 'Toulouse a su s’imposer en marquant quatre buts contre son adversaire.', 'toulouse_win.jpg', '2024-10-08', NOW(), 4),
('Défaite des Girondins de Bordeaux', 'Un match difficile contre un adversaire solide', 'Les Girondins de Bordeaux n’ont pas réussi à faire la différence et s’inclinent 0-2.', 'bordeaux_lose.jpg', '2024-10-09', NOW(), 5);