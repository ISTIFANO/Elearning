import React from 'react'
import header from '../assets/header.jpg'; // Importing header image
import { FaSearch } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="">
        <section className="relative bg-cover bg-center w-auto  pt-[219px] h-[800px] bg-no-repeat md:max-w-[1300px] m-auto max-w-[500px] " style={{backgroundImage: `url(${header})`}}>
          {/* <Link to="/" className="block text-teal-600">
            <span className="sr-only ">Home</span>
            <img src={header} alt="header" className="bg-no-repeat" />
          </Link> */}
        
          <div className="mx-auto  text-center relative md:max-w-[1100px] m-auto max-w-[400px]">
            <h1 className="text-3xl text-blue-50 font-extrabold mb-[49px] sm:text-4xl">
              DÉVELOPPEZ GRATUITEMENT VOS COMPÉTENCES EN LIGNE
            </h1>
            <div className="relative max-w-5xl w-full mx-auto bg-white  flex items-center">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Que souhaitez-vous apprendre ?" 
                className="input input-bordered input-primary w-full px-10 py-2   outline-none "
              />
              <button className="bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 absolute right-0 top-0 bottom-0">
                Rechercher
              </button>
            </div>
            <div className="mt-4 ml-[699px] md:max-w-[1100px] m-auto max-w-[400px]">
              
              <span className="mx-2 text-blue-50 text-2xl transition hover:text-blue-950">Ou laissez nous </span>
              <a href="#" className="text-blue-50 text-2xl transition hover:text-green-300 underline"> vous guider</a>
            </div>
            <div className="mt-8">
              <button className="bg-blue-400 text-white px-12 mt-[79px] py-3 rounded hover:bg-blue-400 focus:outline-none focus:ring active:bg-blue-950 md:max-w-[1100px] m-auto max-w-[400px] ">REJOINDRE LA COMMUNAUTÉ</button>
            </div>
          </div>
        
        </section>
            
      
      </div>
  
  )
}

export default HeroSection