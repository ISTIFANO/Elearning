import React, { useEffect, useState } from 'react';

export default function Reclamations() {
  const [reclamations, setReclamations] = useState([]);

  useEffect(() => {
    fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_Admin/GetReclamations.php')
      .then(response => response.json())
      .then(data => {
        setReclamations(data); // Assuming data is an array of reclamations
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {reclamations.map(reclamation => (
        <div key={reclamation.id_Reclamations} className="bg-card p-4  rounded-lg shadow-md flex items-center">
          <div className="bg-red-500 text-white rounded-full h-auto w-20 flex items-center justify-center mr-4">{reclamation.id_Reclamations}</div>
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">{reclamation.fullName}</h2>
            <p className="text-muted-foreground">{reclamation.email}</p>
            <p className="text-muted-foreground">{reclamation.message}</p>
            <p className="text-muted-foreground">{reclamation.phoneNumber}</p>
            <p className="text-muted-foreground">{reclamation.createdAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
