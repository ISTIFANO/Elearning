import React, { useState } from 'react';
import Swal from 'sweetalert2';
import EnseignantInfo from './EnseignantInfo'; // Ensure the correct import path

const UploadCourse = () => {
    const [course, setCourse] = useState({
        nom_du_cours: '',
        description: '',
        niveau_scolaire: '',
        price: '',
        tag: '',
        langues: [], // State for language checkboxes
        id_sujet: [], // State for subject checkboxes
    });

    const [miniature, setMiniature] = useState(null);

    // Handle input changes (except checkboxes and file)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setMiniature(e.target.files[0]);
    };

    // Handle checkbox changes for languages and subjects
    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'langues') {
            if (checked) {
                setCourse(prevCourse => ({
                    ...prevCourse,
                    langues: [...prevCourse.langues, value]
                }));
            } else {
                setCourse(prevCourse => ({
                    ...prevCourse,
                    langues: prevCourse.langues.filter(langue => langue !== value)
                }));
            }
        } else if (name === 'id_sujet') {
            const intValue = parseInt(value);
            if (checked) {
                setCourse(prevCourse => ({
                    ...prevCourse,
                    id_sujet: [...prevCourse.id_sujet, intValue]
                }));
            } else {
                setCourse(prevCourse => ({
                    ...prevCourse,
                    id_sujet: prevCourse.id_sujet.filter(id => id !== intValue)
                }));
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = getCookie('userId');

        const formData = new FormData();
        for (const key in course) {
            if (key === 'langues' || key === 'id_sujet') {
                course[key].forEach(item => formData.append(`${key}[]`, item));
            } else {
                formData.append(key, course[key]);
            }
        }
        formData.append('miniature', miniature);
        formData.append('id_enseignant', userId);

        try {
            const response = await fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_Enseignant/Cours_creation.php', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: result.message
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message
                });
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred'
            });
        }
    };

    // Function to retrieve cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    return (<>   
      {/* <EnseignantInfo /> */}
        <div className="max-w-lg mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg">
    
            <h2 className="text-2xl font-bold mb-6 text-center">Upload Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nom du cours</label>
                    <input type="text" name="nom_du_cours" placeholder="Nom du cours" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Niveau scolaire</label>
                    <input type="text" name="niveau_scolaire" placeholder="Niveau scolaire" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Miniature</label>
                    <input type="file" name="miniature" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input type="number" step="0.01" name="price" placeholder="Price" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tag</label>
                    <input type="text" name="tag" placeholder="Tag" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Langues de cours</label>
                    <div>
                        <input type="checkbox" id="arab" name="langues" value="arab" onChange={handleCheckboxChange} />
                        <label htmlFor="arab" className="ml-2">Arabic</label>
                    </div>
                    <div>
                        <input type="checkbox" id="english" name="langues" value="english" onChange={handleCheckboxChange} />
                        <label htmlFor="english" className="ml-2">English</label>
                    </div>
                    <div>
                        <input type="checkbox" id="fr" name="langues" value="fr" onChange={handleCheckboxChange} />
                        <label htmlFor="fr" className="ml-2">French</label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Subjects</label>
                    <div>
                        <input type="checkbox" id="developpement" name="id_sujet" value="1" onChange={handleCheckboxChange} />
                        <label htmlFor="developpement" className="ml-2">Développement</label>
                    </div>
                    <div>
                        <input type="checkbox" id="seo" name="id_sujet" value="2" onChange={handleCheckboxChange} />
                        <label htmlFor="seo" className="ml-2">SEO</label>
                    </div>
                    <div>
                        <input type="checkbox" id="design" name="id_sujet" value="3" onChange={handleCheckboxChange} />
                        <label htmlFor="design" className="ml-2">Design</label>
                    </div>
                    <div>
                        <input type="checkbox" id="reseaux" name="id_sujet" value="4" onChange={handleCheckboxChange} />
                        <label htmlFor="reseaux" className="ml-2">Réseaux</label>
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Submit</button>
            </form>
        </div></>
    );
};

export default UploadCourse;
