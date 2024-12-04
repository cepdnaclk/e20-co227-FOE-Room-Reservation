import dayjs from 'dayjs';
import { useContext, useEffect, useRef, useState } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import { getWeekBookings } from '../../../services/BookingService';
import { getAllRooms } from '../../../services/RoomService';
import DragAndAddBooking from '../DragAndAddBooking';
import TimeTable from './TimeTable';
import { Booking, Room } from '../../Interfaces';
import BookingForm from '../BookingForm';

interface WeekViewProps {
  week: dayjs.Dayjs[];
  day: dayjs.Dayjs[];
}

const WeekView = ({ day, week }: WeekViewProps) => {
  const [weekBookings, setWeekBookings] = useState<Booking[]>([]);
  const [roomNames, setRoomNames] = useState<string[]>([]);
  const { weekIndex, showBookingForm, fetch, setFetch } =
    useContext(GlobalContext);

  // Track room colum scrrolling for each day in the week
  const roomColumnRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get start and end of the current week for that date
  const startOfWeek = dayjs()
    .week(weekIndex)
    .startOf('week')
    .format('YYYY-MM-DD');
  const endOfWeek = dayjs().week(weekIndex).endOf('week').format('YYYY-MM-DD');

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
  const fetchWeekBookings = async () => {
    try {
      const response = await getWeekBookings(startOfWeek, endOfWeek);
      const bookings = response.data.bookingList;
      // console.log('Week bookings', bookings);
      setWeekBookings(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Render booking when date or time or room changes
  useEffect(() => {
    fetchWeekBookings();
    setFetch(false);
  }, [weekIndex, fetch]);

  // Sync scroll positions for room columns across all days of the week
  const handleScroll = (index: number) => {
    const currentScrollLeft = roomColumnRefs.current[index]?.scrollLeft;
    roomColumnRefs.current.forEach((col, i) => {
      if (col && i !== index) {
        col.scrollLeft = currentScrollLeft || 0;
      }
    });
  };

  return (
    <div className="h-fit w-full bg-color-3 mt-28">
      <div className="p-10">
        {week.map((currentDay, dayIndex) => {
          return (
            <div className="w-full flex mb-2" key={dayIndex}>
              {/* Fixed Time column */}
              <TimeTable day={day} currentDay={currentDay} />

              {/* Scrollable Room Columns */}
              <div
                ref={(e) => (roomColumnRefs.current[dayIndex] = e)}
                onScroll={() => handleScroll(dayIndex)}
                className="flex-1 overflow-x-auto rounded-r-xl border-r border-gray-300">
                <table className="w-max border-collapse">
                  <thead>
                    <tr className="bg-color-1">
                      {roomNames.map((roomName, roomIndex) => (
                        <th
                          key={roomIndex}
                          className="border-b border-r border-border-1 text-center select-none p-3 w-28 h-12">
                          <div className="text-gray-700 text-sm text-center">
                            {roomName}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <DragAndAddBooking
                    bookings={weekBookings}
                    currentDay={currentDay}
                  />
                </table>
              </div>
            </div>
          );
        })}
        <div>{showBookingForm && <BookingForm />}</div>
      </div>
    </div>
  );
};

export default WeekView;
