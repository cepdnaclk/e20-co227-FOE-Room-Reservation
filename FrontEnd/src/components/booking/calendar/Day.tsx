import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import { availableRooms } from '../../../services/RoomService';
import { Room } from '../../Interfaces';
import { useNavigate } from 'react-router-dom';

interface DayProps {
  day: dayjs.Dayjs;
  rowIdx: number;
}

const Day = ({ day, rowIdx }: DayProps) => {
  const navigator = useNavigate();
  const [availableRoomNames, setAvailableRoomNames] = useState<string[]>([]);
  const { setDayIndex } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      const response = await availableRooms(day.format('YYYY-MM-DD'));
      const roomNames = response.data.roomList.map(
        (room: Room) => room.roomName
      );
      setAvailableRoomNames(roomNames);
    }
    fetchData();
  }, [day]);

  const handleClick = () => {
    setDayIndex(day.date());
    navigator('/booking/day');
    console.log(day.format('YYYY-MM-DD'));
  };

  // Function to mark the current date background to blue
  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  };

  // List of all room names to display
  const importantRooms = ['EoE', 'SR1', 'SR2', 'SR3'];

  return (
    <div className="border border-gray-200 bg-gray-50 flex flex-col px-3">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-base font-semibold mt-1">
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div className="flex-1 cursor-pointer ml-1" onClick={handleClick}>
        {importantRooms.map((roomName) => (
          <div
            key={roomName}
            className={`p-1 text-sm rounded mb-1 ${
              availableRoomNames.includes(roomName)
                ? 'bg-green-200 text-gray-700'
                : 'bg-red-200 text-gray-700'
            }`}>
            {roomName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
