import { ReactNode, useState } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';

interface ContextWrapperProps {
  children: ReactNode;
}

const ContextWrapper = ({ children }: ContextWrapperProps) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [weekIndex, setWeekIndex] = useState(dayjs().week());
  const [dayIndex, setDayIndex] = useState(dayjs().date());
  const [view, setView] = useState('Month');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUpdateRoomForm, setShowUpdateRoomForm] = useState(false);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [selectingBooking, setSelectingBooking] = useState(false);
  const [bookingSelection, setBookingSelection] = useState<{
    roomName: string | null;
    startTime: dayjs.Dayjs | null;
    endTime: dayjs.Dayjs | null;
    details: string | null;
  }>({
    roomName: null,
    startTime: null,
    endTime: null,
    details: null,
  });
  const [isCellSelected, setIsCellSelected] = useState(false);
  const [fetch, setFetch] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        weekIndex,
        setWeekIndex,
        dayIndex,
        setDayIndex,
        view,
        setView,
        showBookingForm,
        setShowBookingForm,
        showAddRoomForm,
        setShowAddRoomForm,
        showAddUserForm,
        setShowAddUserForm,
        showUpdateRoomForm,
        setShowUpdateRoomForm,
        daySelected,
        setDaySelected,
        selectingBooking,
        setSelectingBooking,
        bookingSelection,
        setBookingSelection,
        isCellSelected,
        setIsCellSelected,
        fetch,
        setFetch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
