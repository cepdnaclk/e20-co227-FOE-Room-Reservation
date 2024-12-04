import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { addRoom } from '../../services/RoomService';
import { AxiosError } from 'axios';

interface AddRoomFromProps {
  onRoomAddition: () => void;
}

const AddRoomForm = ({ onRoomAddition }: AddRoomFromProps) => {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setShowAddRoomForm } = useContext(GlobalContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Close the form and navigate back
  const closeRoomForm = () => {
    setShowAddRoomForm(false);
    navigator('/room/all');
  };

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    try {
      console.log('Submitting data:', data);
      const response = await addRoom(data);
      console.log('Room added successfully:', response.data);
      onRoomAddition();
      closeRoomForm();
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        setErrorMessage(message);
        console.error('Error adding room:', message);
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
              Add Room details
            </h1>
            <button
              onClick={closeRoomForm}
              className="text-gray-400 hover:bg-gray-200 rounded-full p-1 transition duration-200">
              <CloseIcon />
            </button>
          </header>

          {/* Room Name Field */}
          <div className="mt-5">
            <label htmlFor="roomName" className="block text-lg font-medium">
              Room Name
            </label>
            <input
              {...register('roomName', { required: true })}
              id="roomName"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room name"
              onFocus={() => setErrorMessage(null)}
            />
            {errors.roomName?.type === 'required' && (
              <p className="text-red-600 mt-1">Room name is required</p>
            )}
          </div>

          {/* Capacity Field */}
          <div className="mt-5">
            <label htmlFor="capacity" className="block text-lg font-medium">
              Capacity
            </label>
            <input
              {...register('capacity', { required: true })}
              id="capacity"
              type="number"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room capacity"
              onFocus={() => setErrorMessage(null)}
            />
            {errors.capacity?.type === 'required' && (
              <p className="text-red-600 mt-1">Room capacity is required</p>
            )}
          </div>

          {/* Description Field */}
          <div className="mt-5">
            <label htmlFor="description" className="block text-lg font-medium">
              Room Description
            </label>
            <textarea
              {...register('description')}
              id="description"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room description"
            />
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
              onClick={closeRoomForm}
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

export default AddRoomForm;
