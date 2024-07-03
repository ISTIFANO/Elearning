import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Enseignants = () => {
    // Fonction pour récupérer la valeur d'un cookie par son nom
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchTeachers(); // Appel à la fonction fetchTeachers au chargement du composant
    }, []);

    const fetchTeachers = async () => {
        try {
            const studentId = getCookie('userId');
            if (!studentId) {
                throw new Error('Student ID not found in cookies.');
            }

            const response = await fetch(`http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard/Enseignants.php?studentId=${studentId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('Invalid response from server');
            }

            // Utilisation d'un Set pour filtrer les enseignants uniques
            const uniqueTeachers = [];
            const seen = new Set();

            for (const teacher of data) {
                if (!seen.has(teacher.ID_Enseignant)) {
                    seen.add(teacher.ID_Enseignant);
                    uniqueTeachers.push(teacher);
                }
            }

            setTeachers(uniqueTeachers); // Met à jour l'état local avec les données des enseignants uniques
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error.message);
            // Gestion des erreurs
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {teachers.map((teacher) => (
                <div key={teacher.ID_Enseignant} className="bg-card text-card-foreground p-4 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/4">
                    <div className="flex items-center">
                        <img src={teacher.img_enseignée} alt={`Image de profil de ${teacher.Prénom} ${teacher.Nom}`} className="rounded-full w-16 mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">{`${teacher.Prénom} ${teacher.Nom}`}</h2>
                            <p className="text-muted-foreground">{teacher.Matière_enseignée}</p>
                            {/* Ajoutez d'autres informations à afficher */}
                            <span className="bg-accent text-accent-foreground px-2 py-1 rounded">Prof</span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 text-muted-foreground">
                        {/* Exemple d'icônes pour localisation, expérience et statut */}
                        <div className="flex items-center">
                            <img alt="Icône de localisation" src="https://openui.fly.dev/openui/24x24.svg?text=📍" className="mr-1" />
                            <span>{teacher.Matière_enseignée}</span>
                        </div>
                       
                        <div className="flex items-center">
                            <img alt="Icône de statut" src="https://openui.fly.dev/openui/24x24.svg?text=💼" className="mr-1" />
                            <span>{`${teacher.Prénom} ${teacher.Nom}`}</span> {/* Exemple de nombre de followers */}
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link to={`/Enseignant/${teacher.ID_Enseignant}`} className="text-blue-500 underline">
                            Voir les détails de l'enseignant
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Enseignants;
