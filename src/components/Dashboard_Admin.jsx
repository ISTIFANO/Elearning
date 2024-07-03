import React, { useState } from 'react';
import Loginimg from '../assets/Loginimg.jpg';
import Etudiants from '../components/Dashboard/Etudiants';
import Enseignants from '../components/Dashboard/Enseignants';
import Admin from '../components/Dashboard/Admin';
import Ajouter from '../components/Dashboard/Ajouter';
import Reclamations from './Dashboard/Reclamations';
// import Middleware from './Dashboard/Middleware';

import { Link } from 'react-router-dom';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
import Logo from '../assets/logoLMS.png';

import { BiMessageError } from 'react-icons/bi';
function Dashboard_Admin() {
    const [currentView, setCurrentView] = useState('All Courses');

    const renderContent = () => {
        switch (currentView) {
            case 'Home':
                return <Reclamations/>;
            case 'Profile':
                return <Admin />;
            case 'Enseignants':
                return <Enseignants/>;
            case 'Etudiants':
                return <Etudiants/>;
                case 'Ajouter':
                    return <Ajouter/>;
            default:
                return <Reclamations/>;
        }
    };
    
    return (
        // <Middleware/>
        <> 
            <div className="flex bg-white">
                <div className="md:flex w-2/5 md:w-1/4 h-screen bg-white border-r hidden">
                    <div className="mx-auto py-10">
                    <img src={Logo} alt="logo" className='h-32 cursor-pointer' />
                        <ul>
                        <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Home')}>
    <BiMessageError className="h-6 w-6" />
    <span className="font-semibold">Reclamations</span>
</li>
                           
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Enseignants')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                                <span className="font-semibold">les professeurs </span>
                            </li>
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Profile')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="font-semibold">Profile</span>
                            </li>
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Etudiants')}>
    <AiOutlineTeam className="h-6 w-6" />
    <span className="font-semibold">Groupe Etudiant</span>
</li>
                            <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150" onClick={() => setCurrentView('Ajouter')}>
    <BiUserPlus className="h-6 w-6" />
    <span className="font-semibold">professeurs</span>
</li>

                            <button className="w-full mt-10 bg-[#219ebc] rounded-full py-1.5 text-white">Learn</button>
                        </ul>
                    </div>
                </div>
                <div className="min-h-screen w-full bg-white border-l">
                    <nav className="flex items-center justify-between px-10 bg-white py-6 border-b">
                    <h1 className="text-2xl font-bold mb-10 cursor-pointer text-[#219ebc] duration-150">Manhaj</h1>
                        <div className="flex items-center space-x-4">
                            <img className="w-8 rounded-full" src="https://imagez.tmz.com/image/f7/1by1/2021/12/14/f7703994b69d48ca802df55729a2325c_xl.jpg" alt="Elon Musk" />
                            <p className="hidden md:block">Aamir El amiri</p>
                        </div>
                    </nav>
                    <div className="mx-6">
                        {renderContent()}
                    </div>
                    <div className="mx-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mt-10">
                        <div className="shadow-lg rounded-t-md overflow-hidden">
                            {/* Add your content here */}
                        </div>
                    </div>
                </div>
              
                  
        
            </div>
        </>
    );
}

export default Dashboard_Admin;
