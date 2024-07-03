import React, { useState } from 'react';
import Logo from '../assets/logoLMS.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GoogleLogin } from "@react-oauth/google";
import Signupimg from '../assets/Signupimg.jpg';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

function SignUp() {
  const clientId = "433164282464-hlp597o0pe9hvgqsiognj6gn75omn168.apps.googleusercontent.com";
  const [formData, setFormData] = useState({
    Nom: '',
    Prénom: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Etudiant_donnes_insertion.php", formData);
      if (response.status === 200) {
        // Handle success
        Swal.fire({
          icon: 'success',
          title: 'Account Created',
          text: 'Your account has been created successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to home page
            window.location.href = '/'; // Replace '/' with your home page URL
          }
        });
      } else {
        // Handle error
        console.error('Failed to insert data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Google sign-up success callback
  const onSuccess = async (res) => {
    const token = res.credential;
    const decodedToken = jwtDecode(token);

    const firstName = decodedToken.given_name;
    const lastName = decodedToken.family_name;
    const email = decodedToken.email;

    const formDataGoogle = {
      Nom: firstName,
      Prénom: lastName,
      email: email,
      password: '' // No need to set password for Google sign-up
    };

    try {
      const response = await axios.post('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Etudiant_donnes_insertion.php', formDataGoogle);
      if (response.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Account Created',
          text: 'Your account has been created successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to home page
            window.location.href = '/'; // Replace '/' with your home page URL
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred. Please try again later.'
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred. Please try again later.'
      });
    }
  };

  // Google sign-up failure callback
  const onFailure = (res) => {
    console.log("Login Failed ", res);
  };

  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src={Signupimg}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="w-4 h-4 text-gray-400"
                  />
                </span>
              </a>
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Manhaj : Votre guide vers l'excellence académique
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
              Manhaj représente bien plus qu'une simple plateforme d'e-learning.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                  href="#"
                >
                  <span className="sr-only">Home</span>
                  <span className="absolute inset-y-0 end-0 z-10 grid place-content-center px-4">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="w-4 h-4 text-gray-400"
                    />
                  </span>
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Manhaj : Votre guide vers l'excellence académique                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                Manhaj représente bien plus qu'une simple plateforme d'e-learning.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Nom" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="Nom"
                    name="Nom"
                    value={formData.Nom}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md p-2 bg-white text-sm border border-zinc-300 text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Prénom" className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="Prénom"
                    name="Prénom"
                    value={formData.Prénom}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border p-2 border-zinc-300 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="Email" className="block border  text-sm font-medium text-gray-700"> Email </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border p-2 border-zinc-300 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Password" className="block text-sm font-medium border "> Password </label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border p-2 border-zinc-300 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    onClick={handleSubmit}
                  >
                    Créer un compte
                  </button>
                  <div id="signInButton" className="w-full">
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="Login"
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={true}
                      name="googleSignup"
                      render={(renderProps) => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="py-2 px-4 bg-white text-black border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Sign up with Google
                        </button>
                      )}
                    />
                  </div>
                
                </div>
              </form>
              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Vous avez déjà un compte?
                    <Link className="text-gray-700 underline" to="/Login">Connectez-vous</Link>
                  </p>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default SignUp;
