import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Loginimg from '../assets/Loginimg.jpg';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (email && password) {
        const formDataToSend = new FormData();
        formDataToSend.append("email", email);
        formDataToSend.append("password", password);

        setLoading(true);
        console.log(formData);
        try {
            const response = await fetch('http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Authentication/Authenticate2.php', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const responseData = await response.json();

            if (responseData.status === 'success') {
                Cookies.set('userId', responseData.userId, { expires: 7 });
                if (responseData.userType === 'student') {
                    navigate('/Cours');
                } else if (responseData.userType === 'teacher') {
                    navigate('/Dashboard_Enseignant');
                }else if (responseData.userType === 'admin') {
                  navigate('/Dashboard_Admin');
              }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: responseData.message || 'An unexpected error occurred.'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred. Please try again later.'
            });
        } finally {
            setLoading(false);
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email or password not provided. Please fill in both fields.'
        });
    }
};

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Bienvenue sur Manhaj!</h1>
          <p className="mt-4 text-gray-500">
          Commencez votre voyage éducatif dès aujourd'hui avec Manhaj. Connectez-vous pour accéder à une vaste gamme de cours, modules interactifs et ressources
           pédagogiques. Rejoignez notre communauté d'apprenants et d'enseignants dévoués.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Pas de compte ?
              <Link className="underline" to="/SignUp">S'inscrire</Link>
            </p>
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Login"
          src={Loginimg}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

export default Login;
