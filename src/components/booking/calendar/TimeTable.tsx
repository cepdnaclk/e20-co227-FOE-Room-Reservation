import dayjs from 'dayjs';

interface TimeTableProps {
  day: dayjs.Dayjs[];
  currentDay: dayjs.Dayjs;
}

const TimeTable = ({ day, currentDay }: TimeTableProps) => {
  const today = dayjs();
  return (
    // Fixed Time column
    <div className="w-36 sticky left-0 bg-color-2 border-l border-t border-b border-border-2 z-30 h-fit shadow-lg rounded-l-xl">
      <table className="border-r border-gray-200">
        <thead>
          <tr>
            <th className="border-b text-sm text-gray-700 items-center justify-center border-border-2 p-1 w-36 h-12">
              <span
                className={`px-2 py-1 rounded-full ${
                  currentDay.isSame(today, 'day')
                    ? 'bg-blue-600 text-white'
                    : ''
                }`}>
                {currentDay.format('DD')}{' '}
                {currentDay.format('ddd').toUpperCase()}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {day.map((time, i) => (
            <tr key={i}>
              <td className="select-none h-11 border-t border-border-3">
                <div className="text-xs justify-center p-1 ml-1">
                  {time.format('hh:mm A')} -{' '}
                  {time.add(1, 'hour').format('hh:mm A')}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
