import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Profile_enseignant() {
    const [formData, setFormData] = useState({
        ID_Enseignant: '',
        Nom: '',
        Prénom: '',
        Matière_enseignée: '',
        Numéro_de_téléphone: '',
        Adresse_électronique: '',
        Description: '',
        password: '',
        img_enseignée: ''
    });

    const userId = getCookie('userId');

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {
        // Fetch the teacher's data
        fetch(`http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_enseignant/Settings.php?id=${userId}`)
            .then(response => response.json())
            .then(data => {
                setFormData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [userId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, img_enseignée: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update the teacher's data
        fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_enseignant/Settings.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire('Success', data.message, 'success');
            } else {
                Swal.fire('Error', data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error updating data:', error);
            Swal.fire('Error', 'An error occurred while updating the profile.', 'error');
        });

        // Handle image upload
        if (formData.img_enseignée instanceof File) {
            const formDataForImage = new FormData();
            formDataForImage.append('ID_Enseignant', formData.ID_Enseignant);
            formDataForImage.append('img_enseignée', formData.img_enseignée);

            fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_enseignant/Settings.php', {
                method: 'POST',
                body: formDataForImage
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFormData({ ...formData, img_enseignée: data.img_url });
                    Swal.fire('Success', data.message, 'success');
                } else {
                    Swal.fire('Error', data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                Swal.fire('Error', 'An error occurred while uploading the image.', 'error');
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-6">
                <img src={formData.img_enseignée ? `http://localhost${formData.img_enseignée}` : 'https://placehold.co/100x100'} alt="Profile" className="w-24 h-24 rounded-full" />
                <div>
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{`${formData.Prénom} ${formData.Nom}`}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{formData.Adresse_électronique} - enseignant	</p>
                    <label className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">
                        Update Image
                        <input type="file" onChange={handleImageChange} className="hidden" />
                    </label>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input type="hidden" id="ID_Enseignant" value={formData.ID_Enseignant} onChange={handleChange} className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100" readOnly />
                    </div>
                    <div>
                        <label htmlFor="Nom" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Nom</label>
                        <input type="text" id="Nom" value={formData.Nom} onChange={handleChange} className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100" />
                    </div>
                    <div>
                        <label htmlFor="Prénom" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Prénom</label>
                        <input type="text" id="Prénom" value={formData.Prénom} onChange={handleChange} className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100" />
                    </div>
                    <div>
                        <label htmlFor="Matière_enseignée" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Matière enseignée</label>
                        <input type="text" id="Matière_enseignée" value={formData.Matière_enseignée} onChange={handleChange} className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100" />
                    </div>
                    <div>
                        <label htmlFor="Numéro_de_téléphone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Numéro de téléphone</label>
                        <input type="text" id="Numéro_de_téléphone" value={formData.Numéro_de_téléphone} onChange={handleChange} className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100" />
                    </div>
                    <div>
                        <label htmlFor="Adresse_électronique" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Adresse électronique</label>
                        <input type="email" id="Adresse_électronique" value={formData.Adresse_électronique} onChange={handleChange} className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100" />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="Description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Description</label>
                        <textarea id="Description" rows="3" value={formData.Description} onChange={handleChange} className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                        <input type="password" id="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100" />
                    </div>
                </div>
                <div className="mt-6">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Save</button>
                </div>
            </form>
        </div>
    );
}

export default Profile_enseignant;
