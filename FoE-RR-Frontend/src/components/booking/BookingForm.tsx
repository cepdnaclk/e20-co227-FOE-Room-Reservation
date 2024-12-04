import { useContext, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import GlobalContext from '../../context/GlobalContext';
import CloseIcon from '@mui/icons-material/Close';
import { addBooking } from '../../services/BookingService';
import { AxiosError } from 'axios';
import { isAdmin, isSuperAdmin } from '../../services/AuthService';
import { getAllRooms } from '../../services/RoomService';
import { Room } from '../Interfaces';

const recurrenceTypes = ['none', 'daily', 'weekly'];

const BookingForm = () => {
  const admin = isAdmin();
  const superAdmin = isSuperAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [roomNames, setRoomNames] = useState<string[]>([]);
  const {
    setShowBookingForm,
    daySelected,
    bookingSelection,
    setBookingSelection,
    setFetch,
  } = useContext(GlobalContext);

  const closeBookingForm = () => {
    setBookingSelection({
      roomName: null,
      startTime: null,
      endTime: null,
      details: null,
    });
    setShowBookingForm(false);
  };

  const [booking, setBooking] = useState({
    roomName: '',
    details: '',
    startTime: '',
    endTime: '',
    date: daySelected.format('YYYY-MM-DD'),
    recurrence: 'none',
    recurrencePeriod: 0,
  });

  const handleRecurrenceType = (event: any) =>
    setBooking({ ...booking, recurrence: event.target.value });

  // Fetch room details
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await getAllRooms();
      const roomNameList = response.data.roomList.map(
        (room: Room) => room.roomName
      );
      setRoomNames(roomNameList);
    };
    fetchRooms();
  }, []);

  // Add the seconds to the time as the time is stored in hh:mm:ss format
  const formatTime = (time: string) => {
    if (!time) return null;
    return `${time}:00`;
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const formattedBooking = {
        ...data,
        startTime: formatTime(data.startTime),
        endTime: formatTime(data.endTime),
        recurrence: admin || superAdmin ? data.recurrence : 'none',
        recurrencePeriod: admin || superAdmin ? data.recurrencePeriod : 0,
      };
      const userIdString = localStorage.getItem('userId');
      const userId = userIdString ? parseInt(userIdString) : -1;
      console.log(formattedBooking);
      const response = await addBooking(
        data.roomName,
        userId,
        formattedBooking
      );
      setErrorMessage(null);
      console.log('Booking added successfully: ', response.data);
      setBookingSelection({
        roomName: null,
        startTime: null,
        endTime: null,
        details: null,
      });
      setShowBookingForm(false);
      setFetch(true);
    } catch (error) {
      console.error(
        'Error adding booking:',
        (error as AxiosError).response?.data || (error as AxiosError).message
      );
      setErrorMessage((error as AxiosError).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed inset-0 mt-12 flex justify-center items-center bg-gray-900 bg-opacity-70 backdrop-blur-sm z-40">
        <div className="sm:w-1/2 w-full max-w-2xl p-7 shadow-xl rounded-lg bg-white transition-transform transform hover:scale-105 duration-300">
          {/* Header section of the booking form */}
          <header className="flex justify-between items-center border-b pb-3">
            <h1 className="text-xl font-semibold text-gray-800">Add Booking</h1>
            {/* Close booking form button */}
            <button
              onClick={closeBookingForm}
              className="text-gray-400 hover:bg-gray-200 rounded-full p-1 transition duration-200">
              <CloseIcon />
            </button>
          </header>

          <div className="mt-5">
            {/* Room name dropdown */}
            <div className="mt-4">
              <label htmlFor="roomName" className="text-lg font-medium">
                Room
              </label>
              <div className="relative">
                <select
                  {...register('roomName', { required: true })}
                  id="roomName"
                  defaultValue={bookingSelection.roomName || ''}
                  className="w-full border-2 border-gray-100 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-400">
                  <option>
                    {bookingSelection.roomName
                      ? bookingSelection.roomName
                      : 'Select a room'}
                  </option>
                  {roomNames.map((roomName) => (
                    <option key={roomName} value={roomName}>
                      {roomName}
                    </option>
                  ))}
                </select>
              </div>
              {errors.roomName?.type === 'required' && (
                <p className="text-red-600">Room field is required</p>
              )}
            </div>

            {/* Booking Purpose */}
            <div className="mt-4">
              <label htmlFor="details" className="text-lg font-medium">
                Purpose
              </label>
              <input
                {...register('details', { required: true })}
                id="details"
                type="string"
                className="w-full border-2 border-gray-100 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter the purpose or subject of booking"
                defaultValue={
                  bookingSelection.details ? bookingSelection.details : ''
                }
              />
              {errors.details?.type === 'required' && (
                <p className="text-red-600">
                  Description for the booking is required
                </p>
              )}
            </div>

            <div className="mt-4 flex gap-x-4">
              {/* Start time */}
              <div className="flex-1">
                <label
                  htmlFor="startTime"
                  className="block text-lg font-medium">
                  Start Time
                </label>
                <input
                  {...register('startTime', { required: true })}
                  id="startTime"
                  type="time"
                  className="w-full border-2 border-gray-100 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                  defaultValue={
                    bookingSelection.startTime
                      ? bookingSelection.startTime.format('HH:mm')
                      : ''
                  }
                />
                {errors.startTime?.type === 'required' && (
                  <p className="text-red-600">Start time field is required</p>
                )}
              </div>

              {/* End time */}
              <div className="flex-1">
                <label htmlFor="endTime" className="text-lg font-medium">
                  End Time
                </label>
                <input
                  {...register('endTime', { required: true })}
                  id="endTime"
                  type="time"
                  className="w-full border-2 border-gray-100 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                  defaultValue={
                    bookingSelection.endTime
                      ? bookingSelection.endTime?.format('HH:mm')
                      : ''
                  }
                />
                {errors.endTime?.type === 'required' && (
                  <p className="text-red-600">End time field is required</p>
                )}
              </div>
            </div>

            {/* Booking Date */}
            <div className="mt-4">
              <label htmlFor="date" className="text-lg font-medium">
                Booking Date
              </label>
              <input
                {...register('date', { required: true })}
                id="date"
                type="date"
                className="w-full border-2 border-gray-100 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                placeholder="Select the room to make booking"
                defaultValue={booking.date}
              />
              {errors.date?.type === 'required' && (
                <p className="text-red-600">Start date field is required</p>
              )}
            </div>

            {/* Recurrence Type Radio Buttons */}
            {(admin || superAdmin) && (
              <div className="mt-4">
                <label className="block text-lg font-medium">
                  Recurrence Type
                </label>
                <div className="flex space-x-4 mt-1">
                  {recurrenceTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={type}
                        checked={booking.recurrence === type}
                        onClick={handleRecurrenceType}
                        {...register('recurrence')}
                      />
                      <span>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Recurrence Period */}
            {(admin || superAdmin) && (
              <div className="mt-4">
                <label
                  htmlFor="recurrencePeriod"
                  className="block text-lg font-medium">
                  Recurrence Period (No. of Days)
                </label>
                <input
                  {...register('recurrencePeriod')}
                  type="number"
                  defaultValue={1}
                  className="w-full border-2 border-gray-100 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Save booking and cancel buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeBookingForm}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
                Save Booking
              </button>
            </div>
          </div>
        </div>
        {/* {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    <p>Error: {errorMessage}</p>
                </div>
                )} */}
      </div>
    </form>
  );
};

export default BookingForm;
