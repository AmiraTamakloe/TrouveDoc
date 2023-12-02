-- Services
INSERT INTO Hopital_BD.Services (idService, nomService)
VALUES
    (0, 'Dermatologie'),
    (1, 'Neurologie'),
    (2, 'Ophtalmologie'),
    (3, 'Orthopédie'),
    (4, 'Psychiatrie'),
    (5, 'Cardiologie'),
    (6, 'Pédiatrie'),
    (7, 'Chirurgie'),
    (8, 'Gynécologie'),
    (9, 'Radiologie');

-- Medecins
INSERT INTO Hopital_BD.Medecins ( prenom, nom, specialite, anneesExperience, idService)
VALUES
    ('Marie', 'Rousseau', 'Dermatologie', 8, 0),
    ('Philippe', 'Lemelin', 'Neurologie', 6, 1),
    ('Valérie', 'Bélanger', 'Ophtalmologie', 10, 2),
    ('Alex', 'Michaud', 'Orthopédie', 12, 3),
    ('Nathalie', 'Gagné', 'Psychiatrie', 9, 4),
    ('Simon', 'Tremblay', 'Cardiologie', 15, 5),
    ('Audrey', 'Beaulieu', 'Pédiatrie', 7, 6),
    ('David', 'Fournier', 'Chirurgie', 11, 7),
    ('Isabelle', 'Lapointe', 'Gynécologie', 14, 8),
    ('François', 'Martel', 'Radiologie', 5, 9);
