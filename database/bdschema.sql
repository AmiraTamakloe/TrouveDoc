DROP SCHEMA IF EXISTS Hopital_BD CASCADE;
CREATE SCHEMA IF NOT EXISTS Hopital_BD;
SET search_path=Hopital_BD;

CREATE TABLE IF NOT EXISTS Hopital_BD.Services (
    idService 				INT PRIMARY KEY,
    nomService 				VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Hopital_BD.Medecins (
    idMedecin 				SERIAL PRIMARY KEY,
    prenom 					VARCHAR(50),
    nom 					VARCHAR(50),
    specialite 				VARCHAR(50),
    anneesExperience 		INT,
    idService 				INT,
    FOREIGN KEY (idService) REFERENCES Services(idService)
);
