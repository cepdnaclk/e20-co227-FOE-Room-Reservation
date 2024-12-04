import CloseIcon from '@mui/icons-material/Close';
import { FieldValues, useForm } from 'react-hook-form';
import { isAdmin, isSuperAdmin } from '../../services/AuthService';
import { addUser } from '../../services/UserService';
import { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import GlobalContext from '../../context/GlobalContext';

interface AddUserFormProps {
  onUserAddition: () => void;
}

const AddUserForm = ({ onUserAddition }: AddUserFormProps) => {
  const admin = isAdmin();
  const superAdmin = isSuperAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setShowAddUserForm } = useContext(GlobalContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Close the form and navigate back
  const closeUserForm = () => {
    setShowAddUserForm(false);
  };

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    try {
      await addUser(data);
      onUserAddition();
      closeUserForm();
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        setErrorMessage(message);
        console.log('Error in adding user:', message);
      } else {
        // Handle other unexpected errors
        setErrorMessage('An unexpected error occurred.');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Background Blur and Centering */}
      <div className="fixed inset-0 mt-12 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm z-40">
        <div className="sm:w-1/2 w-full max-w-2xl p-7 shadow-2xl rounded-lg bg-white transition-transform transform hover:scale-105 duration-300">
          {/* Header Section */}
          <header className="flex justify-between items-center border-b pb-3">
            <h1 className="text-xl font-semibold text-gray-800">
              Add User details
            </h1>
            <button
              className="text-gray-400 hover:bg-gray-200 rounded-full p-1 transition duration-200"
              onClick={closeUserForm}>
              <CloseIcon />
            </button>
          </header>

          <div className="flex space-x-4 mt-5">
            {/* First name Field */}
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-lg font-medium">
                First name
              </label>
              <input
                {...register('firstName', { required: true })}
                id="firstName"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter firstName"
              />
              {errors.firstName?.type === 'required' && (
                <p className="text-red-600 mt-1">First name is required</p>
              )}
            </div>

            {/* Last name Field */}
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-lg font-medium">
                Last name
              </label>
              <input
                {...register('lastName', { required: true })}
                id="lastName"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter lastName"
              />
              {errors.lastName?.type === 'required' && (
                <p className="text-red-600 mt-1">Last name is required</p>
              )}
            </div>
          </div>

          {/* User type Field */}
          {admin && (
            <div className="mt-5">
              <label htmlFor="userType" className="block text-lg font-medium">
                User type
              </label>
              <select
                {...register('userType', { required: true })}
                id="userType"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500">
                <option value="regularUser">Regular user</option>
                {superAdmin && <option value="admin">Admin</option>}{' '}
                {/* <option value="superadmin">Super admin</option> */}
              </select>
              {errors.userType?.type === 'required' && (
                <p className="text-red-600 mt-1">User type is required</p>
              )}
            </div>
          )}

          <div className="flex space-x-4 mt-5">
            {/* Username Field */}
            <div className="w-1/2">
              <label htmlFor="userName" className="block text-lg font-medium">
                Username
              </label>
              <input
                {...register('userName', { required: true })}
                id="userName"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user name"
                onFocus={() => setErrorMessage(null)}
              />
              {errors.userName?.type === 'required' && (
                <p className="text-red-600 mt-1">Username is required</p>
              )}
            </div>

            {/* Password Field */}
            <div className="w-1/2">
              <label htmlFor="password" className="block text-lg font-medium">
                Password
              </label>
              <input
                {...register('password', { required: true })}
                id="password"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
              {errors.password?.type === 'required' && (
                <p className="text-red-600 mt-1">Password is required</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="mt-5">
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <input
              {...register('email', {
                // Message for the required field
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  // Message for valid email pattern
                  message: 'Please enter a valid email address',
                },
              })}
              id="email"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              onFocus={() => setErrorMessage(null)}
            />
            {errors.email && (
              <p className="text-red-600 mt-1">
                {typeof errors.email.message === 'string' &&
                  errors.email.message}
              </p>
            )}
          </div>

          {/* Phone number Field */}
          <div className="mt-5">
            <label htmlFor="phoneNo" className="block text-lg font-medium">
              Phone number
            </label>
            <input
              {...register('phoneNo', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Enter a valid phone number',
                },
              })}
              id="phoneNo"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the phone number"
            />
            {errors.phoneNo && (
              <p className="text-red-600 mt-1">
                {typeof errors.phoneNo.message === 'string' &&
                  errors.phoneNo.message}
              </p>
            )}
          </div>

          {/* Display error message if exists */}
          {errorMessage && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
              {errorMessage}
            </div>
          )}

          {/* Submit and cancel Button */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeUserForm}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddUserForm;
