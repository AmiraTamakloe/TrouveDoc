DROP SCHEMA IF EXISTS TP5 CASCADE;
CREATE SCHEMA IF NOT EXISTS TP5;
SET search_path=TP5;

CREATE TABLE IF NOT EXISTS TP5.Services (
    idService 				INT PRIMARY KEY,
    nomService 				VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS TP5.Medecins (
    idMedecin 				SERIAL PRIMARY KEY,
    prenom 					VARCHAR(50),
    nom 					VARCHAR(50),
    specialite 				VARCHAR(50),
    anneesExperience 		INT,
    idService 				INT,
    FOREIGN KEY (idService) REFERENCES Services(idService)
);
