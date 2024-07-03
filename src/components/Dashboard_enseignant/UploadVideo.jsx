import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import EnseignantInfo from './EnseignantInfo'; // Ensure the correct import path

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function UploadVideo() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [formData, setFormData] = useState({
    ID_video: '',
    Titre: '',
    Duree: '',
    Description: '',
    Rating: '',
    Path: null, // Initialize Path as null
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = getCookie('userId');
        const response = await fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_enseignant/GetCourses.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'getCourses', ID_Enseignant: userId }),
        });

        const data = await response.json();
        if (response.ok) {
          if (Array.isArray(data)) {
            setCourses(data);
          } else {
            throw new Error('Response is not an array');
          }
        } else {
          throw new Error(data.error || 'Failed to fetch courses');
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message || 'Failed to fetch courses',
        });
      }
    };

    fetchCourses();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = getCookie('userId');
    const uploadData = new FormData();
    uploadData.append('ID_video', formData.ID_video);
    uploadData.append('Titre', formData.Titre);
    uploadData.append('Duree', formData.Duree);
    uploadData.append('Description', formData.Description);
    uploadData.append('Rating', formData.Rating);
    uploadData.append('Path', formData.Path); // Append Path as it is received from the state
    uploadData.append('ID_Cours', selectedCourse);
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
      Path: event.target.files[0], // Update Path with the selected file object
    });
  };

  return (
    <div className="flex flex-col md:flex-row bg-card text-card-foreground p-6 rounded-lg shadow-md">
      <EnseignantInfo />
      <div className="flex-1 p-4">
        <div className="mb-4">
          <label htmlFor="courseSelect" className="block text-sm font-medium mb-2">Select Course</label>
          <select
            id="courseSelect"
            className="bg-input text-foreground p-2 rounded-lg w-full"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select a course</option>
            {Array.isArray(courses) && courses.map((course) => (
              <option key={course.ID_Cours} value={course.ID_Cours}>
                {course.Nom_du_cours}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <form id="videoForm"  onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" encType="multipart/form-data" noValidate>
            <div>
              {/* <label htmlFor="ID_video" className="block text-sm font-medium mb-2">ID_video</label> */}
              <input type="hidden" id="ID_video" name="ID_video" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Titre" className="block text-sm font-medium mb-2">Titre</label>
              <input type="text" id="Titre" name="Titre" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Path" className="block text-sm font-medium mb-2">Path</label>
              <input type="file" id="Path" name="Path" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" onChange={handleFileChange} />
            </div>
            <div>
              <label htmlFor="Duree" className="block text-sm font-medium mb-2">Duree</label>
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
              <label htmlFor="ID_Cours" className="block text-sm font-medium mb-2">ID_Cours</label>
              <input type="text" id="ID_Cours" name="ID_Cours" className="bg-input text-foreground border border-zinc-300 p-2 rounded-lg w-full" value={selectedCourse} readOnly />
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-primary bg-blue-300 text-primary-foreground py-2 px-4 rounded-lg w-full">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadVideo;
