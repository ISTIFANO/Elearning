import React from 'react'
import img from '/public/Cover/Profile/Amir.png';

const Admin = () => {
  return (
   <>
   <div className="max-w-sm mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
            <div className="flex justify-end">
                <button className="text-zinc-500 dark:text-zinc-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4l10-10-4-4L4 12z" />
                    </svg>
                </button>
            </div>
            <div className="text-center">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">Admin</h2>
                <div className="mt-4">
                    <img className="w-24 h-24 rounded-full mx-auto" src={img} alt="Profile Picture" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-zinc-800 dark:text-white">Amir El Amiri</h3>
                <button className="mt-4 flex items-center justify-center w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-zinc-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M12.293 3.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-9 9a1 1 0 01-.707.293H5a1 1 0 01-1-1v-2a1 1 0 01.293-.707l9-9zM5 13.414V15h1.586l8.293-8.293-1.586-1.586L5 13.414z" />
                    </svg>
                    Partager le lien de profil
                </button>
                <a href="#" className="mt-4 block text-blue-500 hover:underline">Mettre à jour la visibilité du profil</a>
            </div>
        </div>
   
   </>
  )
}

export default Admin
