import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { getAllRooms } from '../../../services/RoomService';
import GlobalContext from '../../../context/GlobalContext';
import { getDayBookings } from '../../../services/BookingService';
import TimeTable from './TimeTable';
import DragAndAddBooking from '../DragAndAddBooking';
import { Booking, Room } from '../../Interfaces';
import BookingForm from '../BookingForm';

interface DayViewProps {
  day: dayjs.Dayjs[];
}

const DayView = ({ day }: DayViewProps) => {
  const { dayIndex, showBookingForm, fetch, setFetch, setSelectingBooking } =
    useContext(GlobalContext);
  const [roomNames, setRoomNames] = useState<string[]>([]);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  const currentDateObj = dayjs(
    new Date(dayjs().year(), dayjs().month(), dayIndex)
  );
  const currentDate = currentDateObj.format('YYYY-MM-DD');

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

  // Fetch the bookings for the specific date
  const fetchDayBookings = async () => {
    try {
      const response = await getDayBookings(currentDate);
      const bookings = response.data.bookingList;
      // console.log('Day booking', bookings);
      setDayBookings(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Render booking when date or time or room changes
  useEffect(() => {
    fetchDayBookings();
    setFetch(false);
  }, [currentDate, fetch]);

  return (
    <div className="h-fit w-full flex bg-color-3 p-10 mt-28">
      {/* Fixed Time column */}
      <TimeTable day={day} currentDay={currentDateObj} />

      {/* Scrollable Room Columns */}
      <div
        onMouseLeave={() => setSelectingBooking(false)}
        className="flex-1 overflow-x-auto rounded-r-xl border-r border-gray-300">
        <table className="w-max border-collapse">
          <thead>
            <tr className="bg-color-1">
              {roomNames.map((roomName, idx) => (
                <th
                  key={idx}
                  className="border-r border-b border-border-1 text-center select-none p-3 h-12 w-28">
                  <div className="text-gray-700 text-sm text-center">
                    {roomName}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <DragAndAddBooking
            bookings={dayBookings}
            currentDay={currentDateObj}
          />
        </table>
      </div>
      {showBookingForm && <BookingForm />}
    </div>
  );
};

export default DayView;
