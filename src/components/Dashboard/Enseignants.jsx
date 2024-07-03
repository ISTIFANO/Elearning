import React, { useEffect, useState } from 'react';

const Enseignants = () => {
    const [teachers, setTeachers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState(null);

    useEffect(() => {
        fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_Admin/Manage_All_Enseignant.php')
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleUpdateClick = (teacher) => {
        setCurrentTeacher(teacher);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setCurrentTeacher(null);
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        const updatedTeacher = {
            ID_Enseignant: currentTeacher.ID_Enseignant,
            Nom: event.target.nom.value,
            Prénom: event.target.prenom.value,
            Matière_enseignée: currentTeacher.Matière_enseignée,
            Numéro_de_téléphone: event.target.tele.value,
            Adresse_électronique: event.target.email.value
        };

        fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_Admin/Manage_All_Enseignant.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTeacher)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTeachers(teachers.map(t => t.ID_Enseignant === currentTeacher.ID_Enseignant ? updatedTeacher : t));
            handleClosePopup();
        })
        .catch(error => console.error('Error updating teacher:', error));
    };

    const handleDelete = (id) => {
        fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_Admin/Manage_All_Enseignant.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ID_Enseignant: id })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTeachers(teachers.filter(t => t.ID_Enseignant !== id));
        })
        .catch(error => console.error('Error deleting teacher:', error));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {teachers.map(teacher => (
                <div key={teacher.ID_Enseignant} className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden">
                    <div className="relative">
                        <img className="w-full h-48 object-cover" src={teacher.img_enseignée} alt="Profile" />
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="text-white hover:text-zinc-500 dark:hover:text-zinc-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M17.707 2.293a1 1 0 00-1.414 0l-10 10a1 1 0 000 1.414l3 3a1 1 0 001.414 0l10-10a1 1 0 000-1.414l-3-3z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M7 12a1 1 0 011-1h7a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">{teacher.Prénom} {teacher.Nom}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{teacher.Matière_enseignée}</p>
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.5 2a.5.5 0 01.5.5V5h1V2.5a.5.5 0 111 0V5h1V2.5a.5.5 0 111 0V5h.5a.5.5 0 110 1H18v11.5a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5V6H5v11.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V6H1V18a1 1 0 001 1h14a1 1 0 001-1V6h-1V18a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V6H1V5h2.5a.5.5 0 110-1H5V2.5a.5.5 0 01.5-.5h3zM15 7h4v8H4V7h4v1a.5.5 0 001 0V7h5v1a.5.5 0 001 0V7z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{teacher.Numéro_de_téléphone}</p>
                        </div>
                        <div className="flex items-center mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 2.293a1 1 0 011.414 0L10 6.586l4.293-4.293a1 1 0 111.414 1.414L11.414 8l4.293 4.293a1 1 0 11-1.414 1.414L10 9.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 8 4.293 3.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-gray-500 dark:text-gray-400 ml-1">{teacher.Adresse_électronique}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center ">
                            <form className="space-y-4">
                                <button
                                    type="button"
                                    className="mt-4 flex items-center justify-center w-full px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                                    onClick={() => handleDelete(teacher.ID_Enseignant)}
                                >
                                    Supprimer
                                </button>
                                <button
                                    type="button"
                                    className="mt-4 flex items-center justify-center w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
                                    onClick={() => handleUpdateClick(teacher)}
                                >
                                    Mettre à jour
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ))}
            {showPopup && currentTeacher && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">Mise à jour du profil</h2>
                        <form className="space-y-4" onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom:</label>
                                <input
                                    type="text"
                                    id="nom"
                                    name="nom"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    defaultValue={currentTeacher.Nom}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom:</label>
                                <input
                                    type="text"
                                    id="prenom"
                                    name="prenom"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    defaultValue={currentTeacher.Prénom}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    defaultValue={currentTeacher.Adresse_électronique}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tele" className="block text-sm font-medium text-gray-700">Téléphone:</label>
                                <input
                                    type="tel"
                                    id="tele"
                                    name="tele"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    defaultValue={currentTeacher.Numéro_de_téléphone}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Enregistrer
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                    onClick={handleClosePopup}
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enseignants;
