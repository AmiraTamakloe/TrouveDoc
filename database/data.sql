-- Services
INSERT INTO TP5.Services (idService, nomService)
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
INSERT INTO Medecins ( prenom, nom, specialite, anneesExperience, idService)
VALUES
    ('Marie', 'Rousseau', 'Dermatologie', 8, 3),
    ('Philippe', 'Lemelin', 'Neurologie', 6, 4),
    ('Valérie', 'Bélanger', 'Ophtalmologie', 10, 1),
    ('Alex', 'Michaud', 'Orthopédie', 12, 2),
    ('Nathalie', 'Gagné', 'Psychiatrie', 9, 3),
    ('Simon', 'Tremblay', 'Cardiologie', 15, 4),
    ('Audrey', 'Beaulieu', 'Pédiatrie', 7, 1),
    ('David', 'Fournier', 'Chirurgie', 11, 2),
    ('Isabelle', 'Lapointe', 'Gynécologie', 14, 3),
    ('François', 'Martel', 'Radiologie', 5, 4);
