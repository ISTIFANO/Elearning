import React, { useState, useEffect } from 'react';
import Achieve from '../assets/achievement.png';
import { FaGraduationCap } from 'react-icons/fa';
import { AiFillVideoCamera } from 'react-icons/ai';
import { FaPeopleCarry } from 'react-icons/fa';

const Achievement = () => {
    const [statistics, setStatistics] = useState({
        coursesCount: 0,
        teachersCount: 0,
        studentsCount: 0,
        videosCount: 0
    });

    useEffect(() => {
        // Fetch data from PHP endpoint to get counts
        fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Achievement.php') // Replace with actual endpoint
            .then(response => response.json())
            .then(data => {
                setStatistics(data); // Assuming data is like { coursesCount: 100, teachersCount: 50, studentsCount: 500, videosCount: 1000 }
            })
            .catch(error => console.error('Error fetching statistics:', error));
    }, []);

    return (
        <section className='w-full bg-white p-5'>
            {/* Main container */}
            <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]'>
                {/* Left part: text and statistics */}
                <div className='flex flex-col justify-start gap-4'>
                    {/* Title */}
                    <h1 className='md:leading-[42px] py-2 text-3xl font-semibold'>
                        Nos <span className='text-[#208486]'>Réalisations</span>
                    </h1>
                    {/* Description */}
                    <p className=' text-[#536e96] text-2xl'>Les entreprises leader utilisent les mêmes cours pour aider leurs employés à maintenir leurs compétences à jour</p>
                    {/* Statistics grid */}
                    <div className='grid md:grid-cols-2 grid-cols-1'>
                        {/* Statistics block: Instructors */}
                        <div className="py-6 flex">
                            <div className="p-4 bg-[#e9f8f3] rounded-xl">
                                <FaGraduationCap size={30} style={{ color: '#1a9068' }} />
                            </div>
                            <div className='px-3'>
                                <h1 className='text-2xl font-semibold'>{statistics.teachersCount}</h1>
                                <p className='text-[#60737a]'>Instructeurs</p>
                            </div>
                        </div>
                        {/* Statistics blockÉtudiants: Videos */}
                        <div className="py-6 flex">
                            <div className="p-4 bg-[#e9f8f3] rounded-xl">
                                <AiFillVideoCamera size={30} style={{ color: '#1a9068' }} />
                            </div>
                            <div className='px-3'>
                                <h1 className='text-2xl font-semibold'>{statistics.videosCount}</h1>
                                <p className='text-[#60737a]'>Vidéos</p>
                            </div>
                        </div>
                        {/* Statistics block: Users */}
                        <div className="py-6 flex">
                            <div className="p-4 bg-[#e9f8f3] rounded-xl">
                                <FaPeopleCarry size={30} style={{ color: '#1a9068' }} />
                            </div>
                            <div className='px-3'>
                                <h1 className='text-2xl font-semibold'>{statistics.studentsCount}</h1>
                                <p className='text-[#60737a]'>Utilisateurs</p>
                            </div>
                        </div>
                        {/* Statistics block: Students */}
                        <div className="py-6 flex">
                            <div className="p-4 bg-[#e9f8f3] rounded-xl">
                                <FaGraduationCap size={30} style={{ color: '#ed4459' }} />
                            </div>
                            <div className='px-3'>
                                <h1 className='text-2xl font-semibold'>{statistics.coursesCount}</h1>
                                <p className='text-[#60737a]'>Étudiants</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right part: image */}
                <div className="border justify-center items-center">
                    <img src={Achieve} alt="hero" className='md:order-last m-auto order-first' />
                </div>
            </div>
        </section>
    );
}

export default Achievement;
