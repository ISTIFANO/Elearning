import { Link } from 'react-router-dom';
import man1 from '../assets/man1.png';
import man2 from '../assets/man2.png';
import man3 from '../assets/man3.png';

export default function Categories() {
  return (
    <div className="bg-background text-foreground h-96 p-6 md:p-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="relative flex-shrink-0">
          <img className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-lg" src={man1} alt="Main fundraiser image" />
          <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4 w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg">
            <img className="w-full h-full rounded-full" src={man3} alt="Supporting image 1" />
          </div>
          <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg">
            <img className="w-full h-full rounded-full" src={man2} alt="Supporting image 2" />
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:ml-64 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold">Manhaj: La plateforme éducative pour les étudiants du Maroc</h2>
          <p className="mt-4 text-lg md:text-xl">Manhaj est une plateforme marocaine dédiée à l'éducation des étudiants à travers le pays. Notre mission est de fournir un accès équitable à l'éducation de qualité, en aidant les étudiants à développer leurs compétences académiques et professionnelles.</p>

          <Link to="/signup" className="mt-4 inline-block text-primary hover:underline">En savoir plus et rejoindre Manhaj</Link>
        </div>
      </div>
    </div>
  );
}
