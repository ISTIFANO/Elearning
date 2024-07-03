import React, { useState } from 'react';
import Swal from 'sweetalert2';
import EnseignantInfo from './EnseignantInfo'; // Ensure the correct import path

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function UploadVideoForm() {
  const [formData, setFormData] = useState({
    ID_video: '',
    Titre: '',
    Duree: '',
    Description: '',
    Rating: '',
    Path: null,
    ID_Cours: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = getCookie('userId');
    const uploadData = new FormData();
    uploadData.append('ID_video', formData.ID_video);
    uploadData.append('Titre', formData.Titre);
    uploadData.append('Duree', formData.Duree);
    uploadData.append('Description', formData.Description);
    uploadData.append('Rating', formData.Rating);
    uploadData.append('Path', formData.Path);
    uploadData.append('ID_Cours', formData.ID_Cours);
    uploadData.append('ID_Enseignant', userId);

    try {
      const response = await fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_enseignant/UploadVideo.php', {
        method: 'POST',
        body: uploadData,
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Video uploaded successfully!',
        });
      } else {
        throw new Error(data.error || 'Failed to upload video');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Failed to upload video',
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      Path: event.target.files[0],
    });
  };

  return (
    <>
    <EnseignantInfo />
    <div className="overflow-x-auto">
            {/*  */}

      <form id="videoForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>
        {/* Your form inputs */} 
            <div>
              <input type="hidden" id="ID_video" name="ID_video" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Titre" className="block text-sm font-medium mb-2">Title</label>
              <input type="text" id="Titre" name="Titre" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Path" className="block text-sm font-medium mb-2">Path</label>
              <input type="file" id="Path" name="Path" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" onChange={handleFileChange} />
            </div>
            <div>
              <label htmlFor="Duree" className="block text-sm font-medium mb-2">Duration</label>
              <input type="text" id="Duree" name="Duree" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" onChange={handleChange} />
            </div>
            <div className="col-span-2">
              <label htmlFor="Description" className="block text-sm font-medium mb-2">Description</label>
              <textarea id="Description" name="Description" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" onChange={handleChange}></textarea>
            </div>
            <div>
              <label htmlFor="Rating" className="block text-sm font-medium mb-2">Rating</label>
              <input type="text" id="Rating" name="Rating" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" onChange={handleChange} />
            </div>
            <div>
              <input type="hidden" id="ID_Cours" name="ID_Cours" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" value={formData.ID_Cours} readOnly />
            </div>
           
           
        <div className="col-span-2">
          <button type="submit" className="bg-primary bg-blue-300 text-primary-foreground py-2 px-4 rounded-lg w-full">Submit</button>
        </div>
      </form>
    </div></>
  );
}

export default UploadVideoForm;
