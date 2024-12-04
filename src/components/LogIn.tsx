import { FieldValues, useForm } from 'react-hook-form';
import logo from '../assets/logo.png';
import { signin } from '../services/AuthService';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiUser, HiLockClosed } from 'react-icons/hi';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';

const LoginIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSignIn = async (data: FieldValues) => {
    try {
      await signin({
        userName: data.username,
        password: data.password,
      });
      console.log('User login successful');
      navigate('/booking/month');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          setErrorMessage(
            'Network error or server not responding. Please try again later.'
          );
        } else if (error.response?.status === 400) {
          setErrorMessage('Invalid username or password. Please try again.');
        } else if (error.response?.status === 500) {
          setErrorMessage(
            'An internal server error occurred. Please try again later.'
          );
        } else {
          const message = error.response?.data.message || error.message;
          console.log('Error in login: ', message);
          setErrorMessage(message);
        }
      } else {
        // Handle other unexpected errors
        setErrorMessage('An unexpected error occurred.');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-blue-200 px-32 py-20">
      {/* Login page Description */}
      <div className="w-1/2 hidden md:flex flex-col justify-center items-center text-white bg-gradient-to-r from-violet-600 to-blue-500 p-8 mt-14 rounded-l-3xl">
        <img alt="FoE-Room Reservation" src={logo} className="h-16 mb-6" />
        <h1 className="text-4xl font-bold mb-4">
          Welcome to FoE Room Reservation
        </h1>
        <p className="text-lg leading-relaxed text-center">
          A platform to efficiently book and manage rooms at the Faculty of
          Engineering, University of Peradeniya. Log in to create new bookings,
          manage existing reservations, and view room availability.
        </p>
      </div>

      {/* User login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 mt-14 rounded-r-3xl">
        <div className="w-full max-w-md px-8 py-12 shadow-xl rounded-lg bg-white">
          <div className="flex flex-col items-center">
            <img
              alt="FoE-Room Reservation"
              src={logo}
              className="h-12 mb-4 md:hidden"
            />
            <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
              Sign in to your account
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSignIn)} className="space-y-6">
            {/* User Name */}
            <div>
              <label
                htmlFor="username"
                className="block text-lg font-medium text-gray-700">
                Username
              </label>
              <div className="relative mt-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <HiUser className="text-gray-400" />
                </span>
                <input
                  {...register('username', { required: true })}
                  id="username"
                  type="text"
                  className="block w-full pl-10 pr-4 rounded-md border border-gray-300 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your username"
                  onClick={() => setErrorMessage(null)}
                />
              </div>
              {errors.username?.type === 'required' && (
                <p className="text-red-600 mt-2">Username field is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <HiLockClosed className="text-gray-400" />
                </span>
                <input
                  {...register('password', { required: true })}
                  id="password"
                  type="password"
                  className="block w-full pl-10 pr-4 rounded-md border border-gray-300 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                  onClick={() => setErrorMessage(null)}
                />
              </div>
              {errors.password?.type === 'required' && (
                <p className="text-red-600 mt-2">Password field is required</p>
              )}
            </div>

            {errorMessage && (
              <div className="p-2 bg-red-600 text-gray-100 hover:bg-red-500 rounded-md flex items-start space-x-3 shadow-sm">
                <div
                  className="flex-shrink-0 text-white transition-transform transform hover:scale-110 duration-100"
                  onClick={() => setErrorMessage(null)}>
                  {/* Error Icon */}
                  <HighlightOffIcon />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Error</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Sign in Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginIn;
