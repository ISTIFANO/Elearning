import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from 'react-router-dom';

const Enseignant = () => {
    const { id } = useParams();
    const [enseignantData, setEnseignantData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch enseignant data and courses taught by this enseignant
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost/Backend/Cources/LMS_3/Elearning/src/php/EnseignantData.php`,{id});
                setEnseignantData(response.data.enseignantData);
                setCourses(response.data.courses);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [id]);

    if (!enseignantData) {
        return <div>Loading...</div>;
    }

    return (<><Navbar/>
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="md:w-2/3">
                    <h2 className="text-zinc-500 uppercase text-sm">Instructor</h2>
                    <h1 className="text-4xl font-bold">{enseignantData.Prenom} {enseignantData.Nom}</h1>
                    <p className="text-zinc-700 text-lg">{enseignantData.Matiere_enseignée}</p>
                    <div className="flex space-x-8 mt-4">
                        <div>
                            <p className="text-zinc-500">Total students</p>
                            <p className="text-2xl font-bold">{enseignantData.Total_students}</p>
                        </div>
                        <div>
                            <p className="text-zinc-500">Reviews</p>
                            <p className="text-2xl font-bold bg-black">{enseignantData.Reviews}</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold">About me</h3>
                        <p className="text-zinc-700 mt-2">
                            {enseignantData.Description}
                        </p>
                    </div>
                </div>
                <div className="md:w-1/3 flex flex-col items-center md:items-end mt-8 md:mt-0">
                    <img src={enseignantData.img_enseignée || "https://placehold.co/150x150"} alt="Instructor Image" className="rounded-full w-32 h-32 object-cover" />
                    <button className="mt-4 bg-zinc-800 text-white px-4 py-2 rounded">Send message</button>
                </div>
            </div>
            <div className="mt-12">
                <h3 className="text-xl font-semibold">My courses ({courses.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {courses.map(course => (
                        <div key={course.ID_Cours} className="border p-4 rounded">
                            <img src={course.Miniature || "https://placehold.co/300x200"} alt="Course Image" className="w-full h-48 object-cover rounded" />
                            <h4 className="mt-4 font-semibold">{course.Nom_du_cours}</h4>
                            <p className="text-zinc-500">Teacher: {enseignantData.Nom} {enseignantData.Prenom}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-yellow-500">★★★★☆</span>
                                <span className="ml-2 text-zinc-500">{course.Reviews}</span>
                            </div>
                            <p className="text-zinc-500 mt-1">{course.Niveau_scolaire}</p>
                            <p className="text-zinc-500 mt-1">{course.langue}</p>
                            <p className="text-lg font-bold mt-2">{course.price}</p>
                            <p className="text-zinc-500 mt-1">{course.tag}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default Enseignant;
