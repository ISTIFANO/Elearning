import React, { useState } from 'react';

export default function Ajouter() {
  const [formData, setFormData] = useState({
    ID_Enseignant: '',
    Nom: '',
    Prénom: '',
    Matière_enseignée: '',
    Numéro_de_téléphone: '',
    Adresse_électronique: '',
    Description: '',
    password: '',
    img_enseignée: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_Admin/Ajouter.php', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      // Optionally handle success response here, e.g., show a success message
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="hidden"
            name="ID_Enseignant"
            value={formData.ID_Enseignant}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="Nom" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Nom</label>
          <input
            type="text"
            name="Nom"
            value={formData.Nom}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="Prénom" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Prénom</label>
          <input
            type="text"
            name="Prénom"
            value={formData.Prénom}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="Matière_enseignée" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Matière enseignée</label>
          <input
            type="text"
            name="Matière_enseignée"
            value={formData.Matière_enseignée}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="Numéro_de_téléphone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Numéro de téléphone</label>
          <input
            type="text"
            name="Numéro_de_téléphone"
            value={formData.Numéro_de_téléphone}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="Adresse_électronique" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Adresse électronique</label>
          <input
            type="email"
            name="Adresse_électronique"
            value={formData.Adresse_électronique}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="Description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Description</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="img_enseignée" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Upload Image</label>
          <input
            type="file"
            name="img_enseignée"
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
          />
        </div>
        <div className="md:col-span-2 mt-6">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
