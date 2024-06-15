import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const OrderPopup = ({ orderPopup, setOrderPopup }) => {
  const clientId = "433164282464-hlp597o0pe9hvgqsiognj6gn75omn168.apps.googleusercontent.com";
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const response = await axios.post("http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Authenticate.php", formData);
      if (response.data.status === "success") {
        // Handle success
        Swal.fire({
          icon: 'success',
          title: 'Login Success',
          text: 'You have been successfully logged in!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Close the popup
            setOrderPopup(false);
          }
        });
      } else {
        // Handle error
        console.error('Failed to login');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to login. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Google sign-in success callback
  const onSuccess = async (res) => {
    const token = res.credential;
    const decodedToken = jwtDecode(token);

    const name = decodedToken.given_name;
    const email = decodedToken.email;

    const formDataGoogle = {
      name: name,
      email: email,
      address: '' // No need to set address for Google sign-in
    };
  

    try {
      const response = await axios.post("http://localhost/Backend/Cources/LMS_3/Elearning/src/php/Authenticate.php", formDataGoogle);
      if (response.data.status === "success") {
        // Handle success
        Swal.fire({
          icon: 'success',
          title: 'Login Success',
          text: 'You have been successfully logged in!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Close the popup
            setOrderPopup(false);
          }
        });
      } else {
        // Handle error
        console.error('Failed to login');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to login. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Google sign-in failure callback
  const onFailure = (res) => {
    console.log("Login Failed ", res);
  };

  return (
    <>
      {orderPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]"> 
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl justify-center items-center  font-semibold text-black/70">
                  Login
                </h1>
              </div>
              <div>
                <IoCloseOutline
                  className="text-2xl cursor-pointer"
                  onClick={() => setOrderPopup(false)}
                />
              </div>
            </div>
            {/* Body */}
            <div className="mt-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
              />
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white bg-black py-1 px-4 rounded-full"
                >
                  Login Now
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Login with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                  name="googleLogin"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-full"
                    >
                      Login with Google
                    </button>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPopup;
