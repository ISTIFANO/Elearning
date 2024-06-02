import React from 'react'
import Achieve from '../assets/achievement.png'
import { FaGraduationCap } from 'react-icons/fa'
import { AiFillVideoCamera } from 'react-icons/ai'
import { FaPeopleCarry } from 'react-icons/fa'

const Achievement = () => {
  return (
    <section className='w-full bg-white p-5'>
        {/* Conteneur principal */}
        <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]'>
            {/* Partie gauche: texte et statistiques */}
            <div className='flex flex-col justify-start gap-4'>
                {/* Titre */}
                <h1 className='md:leading-[42px] py-2 text-3xl font-semibold'>
                    Nos <span className='text-[#208486]'>Réalisations</span>
                </h1>
                {/* Description */}
                <p className=' text-[#536e96] text-2x1'>Les entreprises leader utilisent les mêmes cours pour aider leurs employés à maintenir leurs compétences à jour</p>
                {/* Statistiques */}
                <div className='grid md:grid-cols-2 grid-cols-1'>
                    {/* Bloc de statistique */}
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <FaGraduationCap size={30} style={{ color:'#1a9068' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>100 +</h1>
                            <p className='text-[#60737a]'>Instructeurs</p>
                        </div>
                    </div>
                    {/* Autres blocs de statistique similaires */}
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <AiFillVideoCamera size={30} style={{ color:'#1a9068' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>10,000 +</h1>
                            <p className='text-[#60737a]'>Vidéos</p>
                        </div>
                    </div>
                    {/* Blocs de statistique restants */}
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <FaPeopleCarry size={30} style={{ color:'#1a9068' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>3000 +</h1>
                            <p className='text-[#60737a]'>Utilisateurs</p>
                        </div>
                    </div>
                    {/* Dernier bloc de statistique */}
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <FaGraduationCap size={30} style={{ color:'#ed4459' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>300 +</h1>
                            <p className='text-[#60737a]'>Étudiants</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Partie droite: image */}
            <div className="border justify-center items-center">
                <img src={Achieve} alt="hero" className='md:order-last m-auto order-first'/>
            </div>
        </div>
    </section>
  )
}

export default Achievement
