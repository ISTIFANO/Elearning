import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faBuilding, faClock } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logoLMS.png';

import Navbar from './Navbar';
import Footer from './Footer';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Dashboard_Admin/Reclamations.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Log response from server
      // Clear form fields after successful submission
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row min-h-screen">
        
        <div className="flex-1 bg-white p-8 lg:p-16">
        
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-muted-foreground mb-8">
            Sentez-vous libre de nous contacter à tout moment. Nous vous répondrons dès que possible !
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="sr-only">Nom complet</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Nom complet"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-4 border rounded-md bg-input text-foreground"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border rounded-md bg-input text-foreground"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="sr-only">Téléphone</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Téléphone"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-4 border rounded-md bg-input text-foreground"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 border rounded-md bg-input text-foreground"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full p-4 bg-secondary bg-blue-500 text-secondary-foreground rounded-md hover:bg-secondary/80">
              Envoyer
            </button>
          </form>
        </div>
        
        <div className="flex-1 bg-blue-500 p-8 lg:p-16 text-white">
          <div className="flex items-center mb-8">
            <div className="w-4 h-4 bg-yellow-500"></div>
          </div>
          <h2 className="text-6xl font-bold mb-4">Info</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faEnvelope} size="3x" />
              <span className="text-3xl">elamiriamir7@gmail.com</span>
            </li>
            <li className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faPhone} size="3x" />
              <span className="text-3xl">+212609117392</span>
            </li>
            <li className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faBuilding} size="3x" />
              <span className="text-3xl">Marrakech Loudaya.</span>
            </li>
            <li className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faClock} size="3x" />
              <span className="text-3xl">09:00 - 18:00</span>
            </li>
          </ul>
        </div>
        
      </div>

      <Footer />
    </>
  );
}
