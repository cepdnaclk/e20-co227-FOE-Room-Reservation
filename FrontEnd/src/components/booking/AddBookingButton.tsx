import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';

const AddBookingButton = () => {
  const { setShowBookingForm } = useContext(GlobalContext);
  const addBooking = () => {
    setShowBookingForm(true);
  };

  return (
    <div>
      <button
        className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={addBooking}>
        Add Booking
      </button>
    </div>
  );
};

export default AddBookingButton;
