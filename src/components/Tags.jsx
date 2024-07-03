import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importing useParams
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from 'axios';

const Tags = () => {
    
    const { tag } = useParams(); // Using useParams to get the tag from the URL
    console.log(tag);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch courses with the same tag
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Tags.php`, { tag });
                // Vérifier si la réponse contient un tableau
                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                    setError(null); // Réinitialise l'erreur si la réponse est réussie
                } else {
                    setError('Les données reçues ne sont pas au format attendu');
                }
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            }
        };

        fetchData();
    }, [tag]); // Dependency added here

    return (
        <>
            <Navbar />
            <div className="container w-screenmx-auto p-4">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    <div className="md:w-2/3">
                        {error && <p>{error}</p>} {/* Affiche l'erreur s'il y en a une */}
                        <h3 className="text-xl font-semibold">Cours avec le même tag ({courses.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {courses.map(course => (
                                <div key={course.ID_Cours} className="border p-4 rounded">
                                    <img src={course.Miniature} alt="Course Image" className="w-full h-48 object-cover rounded" />
                                    <h4 className="mt-4 font-semibold">{course.Nom_du_cours}</h4>
                                    <p className="text-zinc-500">{course.Description}</p>
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-500">★★★★☆</span>
                                        <span className="ml-2 text-zinc-500">(Nombre d'avis)</span>
                                    </div>
                                    <p className="text-zinc-500 mt-1">{course.Durée} total hours • {course.Nombre_lectures} lectures • {course.Niveau_scolaire}</p>
                                    <p className="text-lg font-bold mt-2">{course.price}</p>
                                    {course.Bestseller && <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded mt-1">Bestseller</span>}
                                    <button
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => window.location.href = `/ReadCources/${course.ID_Cours}`}
                                >
                                    Regarder
                                </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Tags;
