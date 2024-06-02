import React, { useState } from 'react'
import Logo from '../assets/logoLMS.png'
import { Link } from 'react-router-dom'
import lock from '../assets/lock.svg'
import Hamburger from '../assets/hamburgerMenu.svg'
import Close from '../assets/close.svg'
import { motion } from 'framer-motion'

const Navbar = () => {
    // Utilisation de useState pour gérer l'état du menu déroulant
    const [toggle, setToggle] = useState(false)

    // Fonction pour basculer l'état du menu déroulant
    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div className='w-full h-[96px] bg-white shadow-sm'>
            <div className='p-4 md:max-w-[1080px] max-w-[500px] m-auto w-full h-full flex justify-between items-center'>
                {/* Logo */}
                <img src={Logo} alt="logo" className='h-[156px] cursor-pointer' />
                <div className="flex items-center">
                    {/* Menu principal sur les écrans larges */}
                    <ul className='hidden md:flex gap-4 '>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/a-propos">À propos</Link></li>
                    <li><Link to="/support">Support</Link></li>
                    <li><Link to="/plateforme">Plateforme</Link></li>
                    <li><Link to="/tarification">Tarification</Link></li>
                    </ul>
                </div>
                <div className='md:flex hidden'>
                    {/* Boutons de connexion et d'inscription sur les écrans larges */}
                    <button className='flex justify-content-between items-center bg-transparent px-6 gap-2'>
                        <img src={lock} alt='lock' />
                        <Link to="/Login">Connexion</Link>
                        
                    </button>
                    <button  className='px-8 py-3 bg-[#219ebc]'><Link to="/SignUp">Inscription gratuite</Link></button>
                </div>
                {/* Bouton de menu déroulant pour les écrans mobiles */}
                <motion.div whileTap={{ scale: 0.6 }} className="md:hidden cursor-pointer" onClick={handleToggle}>
                    <img src={toggle ? Close : Hamburger} alt="hamburger" />
                </motion.div>
            </div>
            <div>
                {/* Menu déroulant sur les écrans mobiles */}
                <motion.ul
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 200 }}
                    className={toggle ? 'absolute z-10 p-4 bg-white w-full px-8 md:hidden' : 'hidden'}>
                    <li className='p-4 hover:bg-gray-50'>Accueil</li>
                    <li className='p-4 hover:bg-gray-50'>À propos</li>
                    <li className='p-4 hover:bg-gray-50'>Support</li>
                    <li className='p-4 hover:bg-gray-50'>Plateforme</li>
                    <li className='p-4 hover:bg-gray-50'>Tarification</li>
                    <div className='flex flex-col my-4 gap-4'>
                        {/* Boutons de connexion et d'inscription dans le menu déroulant */}
                        <button className='flex border border-[240136] justify-center items-center bg-transparent px-6 gap-2 py-4'>
                            <img src={lock} alt='lock' />
                            Connexion
                        </button>
                        <button className='px-8 py-5 bg-[#219ebc]'>Inscription gratuite</button>
                    </div>
                </motion.ul>
            </div>
        </div>
    )
}

export default Navbar
