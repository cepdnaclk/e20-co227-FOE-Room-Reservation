import React from 'react';

type BookingType = {
  userType: string;
  bookingType: string;
  color: string;
};

const bookingColors: BookingType[] = [
  { userType: 'Regular User', bookingType: 'One day', color: 'bg-red-500' },
  { userType: 'Admin', bookingType: 'One day', color: 'bg-yellow-500' },
  { userType: 'Admin', bookingType: 'Daily', color: 'bg-green-500' },
  { userType: 'Admin', bookingType: 'Weekly', color: 'bg-blue-500' },
  { userType: 'Super admin', bookingType: 'One day', color: 'bg-yellow-500' },
  { userType: 'Super admin', bookingType: 'Daily', color: 'bg-green-500' },
  { userType: 'Super admin', bookingType: 'Weekly', color: 'bg-blue-500' },
];

const InfoPage = () => {
  return (
    <div className="max-w-full mx-auto mt-16">
      <h1>
        Faculty of Engineering, University of Peradeniya room booking system
      </h1>
      <h2>Procedure to place the booking</h2>
      {/* Regular user */}
      <h3>Check the room availablity</h3>
      <p>
        With the day view and week view you can check the availablity of rooms
        for the specific date and time
      </p>
      <h3>Place a booking</h3>
      <p>
        Restricted to book only for one day. If you want to place a racurrence
        booking or if you want to place the booking in a restricted time (Shown
        in red){' '}
      </p>
      <h2 className="text-xl font-bold mb-4">
        Different colors for diferent type of bookings
      </h2>

      {/* Regular User */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-2">Regular User</h3>
        <div className="flex space-x-4">
          {bookingColors
            .filter((booking) => booking.userType === 'Regular User')
            .map((booking, index) => (
              <div key={index} className="flex items-center">
                <span
                  className={`inline-block w-8 h-8 rounded-full mr-2 ${booking.color}`}></span>
                <p>{booking.bookingType}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Admin */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-2">Admin</h3>
        <div className="flex space-x-4">
          {bookingColors
            .filter((booking) => booking.userType === 'Admin')
            .map((booking, index) => (
              <div key={index} className="flex items-center">
                <span
                  className={`inline-block w-8 h-8 rounded-full mr-2 ${booking.color}`}></span>
                <p>{booking.bookingType}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Super Admin */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-2">Super Admin</h3>
        <div className="flex space-x-4">
          {bookingColors
            .filter((booking) => booking.userType === 'Super admin')
            .map((booking, index) => (
              <div key={index} className="flex items-center">
                <span
                  className={`inline-block w-8 h-8 rounded-full mr-2 ${booking.color}`}></span>
                <p>{booking.bookingType}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
