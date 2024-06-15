-- Insertion des données dans la table Cours
INSERT INTO Cours (ID_Cours, Nom_du_cours, Description, Niveau_scolaire, Miniature, video_cours, price, tag, langue, ID_Sujet, ID_Enseignant)
VALUES
(1, 'Design', 'Introduction au design', 'Débutant', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Cover/design.jpg', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/design.mp4', 49.99, 'design', 'FR', 1, 101),
(2, 'Developpement', 'Fondamentaux du dev', 'Intermédiaire', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Cover/dev.jpg', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/dev.mp4', 59.99, 'dev', 'FR', 2, 102),
(3, 'Programation', 'Programmation avancée', 'Avancé', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Cover/prog.jpg', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/prog.mp4', 69.99, 'prog', 'FR', 3, 103),
(4, 'Réseaux', 'Architecture réseau', 'Intermédiaire', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Cover/net.jpg', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/net.mp4', 79.99, 'network', 'FR', 4, 104),
(5, 'SEO', 'Optimisation des moteurs', 'Intermédiaire', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Cover/seo.jpg', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/seo.mp4', 89.99, 'seo', 'FR', 5, 105);

-- Insertion des données dans la table Video
INSERT INTO Video (ID_video, Titre, Path, Duree, Description, Rating, ID_Cours) VALUES
(1, 'Introduction au design', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/Design/Design1.ts', '00:20:00', 'Introduction aux principes de base', 4, 1),
(2, 'La couleur dans le design', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/Design/Design2.ts', '00:25:00', 'Exploration des concepts de couleur', 5, 1),
(3, 'Structure de données', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/Design/Design3.ts', '00:30:00', 'Introduction aux structures de données', 4, 2),
(4, 'Programmation orientée objet', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/Design/Design4.ts', '00:35:00', 'Principes de base de la POO', 4, 3),
(5, 'Configuration des routeurs', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/Design/Design5.ts', '00:40:00', 'Configuration des routeurs Cisco', 5, 4),
(6, 'Optimisation des moteurs', 'C/wamp64/www/Backend/Cources/LMS_3/Elearning/public/Courses/Design/Design6.ts', '00:45:00', 'Stratégies d''optimisation SEO', 5, 5);

