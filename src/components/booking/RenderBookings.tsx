import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useContext, useEffect, useRef, useState } from 'react';
import { deleteBooking } from '../../services/BookingService';
import { useNavigate } from 'react-router-dom';
import BookingXtaDetails from './BookingXtaDetails';
import React from 'react';
import { Booking } from '../Interfaces';
import GlobalContext from '../../context/GlobalContext';

dayjs.extend(isBetween);

interface RenderBookingsProps {
  date: string;
  bookings: Booking[];
}

const RenderBookings = ({ date, bookings }: RenderBookingsProps) => {
  const navigator = useNavigate();
  const [showXtraBookingDetails, setShowXtraBookingDetails] = useState(false);
  const [moveBlock, setMoveBlock] = useState(false);
  const bookingDetailsRef = useRef<HTMLDivElement>(null);
  const { setFetch, setShowBookingForm, setBookingSelection } =
    useContext(GlobalContext);

  // Close the extra details block if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bookingDetailsRef.current &&
        !bookingDetailsRef.current.contains(event.target as Node)
      ) {
        setShowXtraBookingDetails(false);
        setMoveBlock(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show extra details block and moving transition when clicking the booking
  const handleClick = () => {
    setMoveBlock(!moveBlock);
    setShowXtraBookingDetails(!showXtraBookingDetails);
    console.log(showXtraBookingDetails);
  };
  // Hide the extra details and set the transition of details block to false when clicking the close button
  const handleCloseDetails = () => {
    setMoveBlock(false);
    setShowXtraBookingDetails(false);
    console.log('Close');

    // navigator(`/booking/${view}`);
  };
  // Render update booking form when clicking the edit button
  const handleClickEdit = (booking: Booking) => {
    setBookingSelection({
      roomName: booking.room.roomName,
      startTime: dayjs(`${booking.startDate} ${booking.startTime}`),
      endTime: dayjs(`${booking.startDate} ${booking.endTime}`),
      details: booking.details,
    });
    setShowBookingForm(true);
    // navigator('/booking/update-booking', { state: { booking } });
  };

  // Get a speciic color for the booking strip
  const getColor = (booking: Booking) => {
    if (booking.user.userType === 'regularUser') {
      return 'bg-yellow-500';
    }
    if (booking.user.userType === 'admin') {
      switch (booking.recurrence) {
        case 'none':
          return 'bg-purple-500';
        case 'daily':
          return 'bg-violet-500';
        case 'weekly':
          return 'bg-blue-500';
      }
    }
    if (booking.user.userType === 'superAdmin') {
      switch (booking.recurrence) {
        case 'none':
          return 'bg-purple-500';
        case 'daily':
          return 'bg-violet-500';
        case 'weekly':
          return 'bg-blue-500';
      }
    }
  };

  return (
    <div className="h-full w-full">
      {bookings.map((booking) => {
        const stripColor = getColor(booking);
        const bookingStart = dayjs(`${booking.date} ${booking.startTime}`);
        const bookingEnd = dayjs(`${booking.date} ${booking.endTime}`);
        const startOffsetMinutes = bookingStart.diff(
          dayjs(`${date} 00:00`),
          'minute'
        );
        const spanMinutes = bookingEnd.diff(bookingStart, 'minute');
        const topPercentage =
          (startOffsetMinutes / 60 - bookingStart.hour()) * 100;
        const heightPercentage = (spanMinutes / 60) * 102;

        // Delete selected booking and re-render bookings
        const handleDelete = async () => {
          try {
            const userIdString = localStorage.getItem('userId');
            const userId = userIdString ? parseInt(userIdString) : -1;
            await deleteBooking(booking.bookingId,userId);
            setFetch(true);
            handleCloseDetails();
            console.log('deleted');
          } catch (error) {
            console.error('Error deleting booking:', error);
          }
        };

        return (
          startOffsetMinutes >= 0 && (
            // Display booking according to the start time and time duration
            <React.Fragment key={booking.bookingId}>
              <div
                onClick={() => handleClick()}
                className="absolute group z-10 bg-white shadow-lg shadow-gray-300 rounded-md h-full flex justify-start items-center"
                style={{
                  top: `${topPercentage}%`,
                  height: `${heightPercentage}%`,
                  width: '85%',
                }}>
                {/* strip */}
                <div className={`${stripColor} w-3 h-full rounded-l-md`}></div>
                {/* White background for the rest */}
                <div className="flex-1 bg-white p-1 rounded-r-md">
                  {/* Added padding for spacing */}
                  <div className="text-gray-600 text-xs select-none">
                    <div>
                      {dayjs(bookingStart).format('h:mma')}-
                      {dayjs(bookingEnd).format('h:mma')} <br />
                    </div>
                    <div className="mt-1 text-gray-400">{booking.details}</div>
                  </div>
                </div>
              </div>
              <div
                className="z-20"
                ref={bookingDetailsRef}
                style={{
                  top: '180px',
                  transformOrigin: 'top',
                  transform: moveBlock
                    ? 'translateX(125px)'
                    : 'translateX(60px)',
                  transition: 'transform 0.4s ease',
                  position: 'absolute',
                  overflow: 'visible',
                }}>
                {/* Show the extra details for the bookings */}
                {showXtraBookingDetails && (
                  <BookingXtaDetails
                    closeBookingDetails={handleCloseDetails}
                    editBookingDetails={() => handleClickEdit(booking)}
                    deleteBookingDetails={handleDelete}
                    booking={booking}
                  />
                )}
              </div>
            </React.Fragment>
          )
        );
      })}
    </div>
  );
};

export default RenderBookings;
