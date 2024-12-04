import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import dayjs from 'dayjs';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { isAuthenticated } from '../../../services/AuthService';
import { MenuItem } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AddBookingButton from '../AddBookingButton';

const CalendarHeader = () => {
  const authenticated = isAuthenticated();
  const location = useLocation();
  const {
    dayIndex,
    setDayIndex,
    weekIndex,
    setWeekIndex,
    monthIndex,
    setMonthIndex,
    view,
    setView,
  } = useContext(GlobalContext);
  // Throttle state is to prevent rapid clicks
  const [isThrottled, setIsThrottled] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<
    'next' | 'prev' | null
  >(null);

  // Update view state based on route
  useEffect(() => {
    if (location.pathname.includes('day')) {
      setView('Day');
    } else if (location.pathname.includes('week')) {
      setView('Week');
    } else if (location.pathname.includes('month')) {
      setView('Month');
    }
  }, [location.pathname, setView]);

  const weekStart = dayjs()
    .week(weekIndex)
    .startOf('week')
    .format('DD MMM YYYY');
  const weekEnd = dayjs().week(weekIndex).endOf('week').format('DD MMM YYYY');

  const handlePrevDay = () => {
    if (!isThrottled) {
      setAnimationDirection('prev');
      view == 'Day' && setDayIndex(dayIndex - 1);
      view == 'Week' && setWeekIndex(weekIndex - 1);
      view == 'Month' && setMonthIndex(monthIndex - 1);
      setIsThrottled(true);
      setTimeout(() => {
        setIsThrottled(false);
        setAnimationDirection(null);
      }, 300);
    }
    console.log(dayIndex, weekIndex);
  };

  const handleNextDay = () => {
    if (!isThrottled) {
      setAnimationDirection('next');
      view == 'Day' && setDayIndex(dayIndex + 1);
      view == 'Week' && setWeekIndex(weekIndex + 1);
      view == 'Month' && setMonthIndex(monthIndex + 1);
      setIsThrottled(true);
      setTimeout(() => {
        setIsThrottled(false);
        setAnimationDirection(null);
      }, 300);
    }
    console.log(dayIndex, weekIndex);
  };

  const handleToday = () => {
    setDayIndex(dayjs().date());
    setWeekIndex(dayjs().week());
    setMonthIndex(dayjs().month());
    console.log(weekIndex);
  };

  const transitionClass =
    animationDirection === 'next'
      ? 'transform translate-x-full opacity-0 transition-transform duration-150'
      : animationDirection === 'prev'
      ? 'transform -translate-x-full opacity-0 transition-transform duration-150'
      : 'opacity-100 transition-opacity duration-300';

  return (
    <>
      <header className="flex px-6 py-3 items-center justify-between bg-gradient-to-r from-blue-500 to-purple-400 border-b border-blue-200 shadow-lg fixed top-14 left-0 right-0 z-40">
        <div className="flex items-center space-x-12">
          <h2
            className={`text-2xl text-white font-bold transition-transform duration-150 ${transitionClass}`}
            style={{ minWidth: '250px' }}>
            {view === 'Day' &&
              dayjs(new Date(dayjs().year(), dayjs().month(), dayIndex)).format(
                'DD MMMM YYYY'
              )}
            {view === 'Week' && `${weekStart} - ${weekEnd}`}
            {view === 'Month' && dayjs().month(monthIndex).format('MMMM YYYY')}
          </h2>

          <div className="relative flex items-center rounded-lg bg-white shadow-lg md:items-stretch">
            <button
              className="right-arrow text-blue-600 hover:bg-blue-50"
              onClick={handlePrevDay}>
              <ChevronLeftIcon />
            </button>
            <button
              onClick={handleToday}
              className="hidden border-y border-gray-300 px-2 text-lg font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:relative md:block">
              Today
            </button>
            <button
              className="left-arrow text-blue-600 hover:bg-blue-50"
              onClick={handleNextDay}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        <div className="flex items-center">
          {/* Drop down for calendar view */}
          <Menu as="div" className="relative ml-3">
            {({ close }) => (
              <>
                <div>
                  <MenuButton className="flex items-center justify-between mr-6 px-3 py-1 text-lg font-semibold rounded-lg shadow-lg bg-white border border-gray-300 text-gray-800 hover:bg-purple-50 focus:outline-none">
                    <span className="mr-1">{view} View</span>
                    <ArrowDropDownOutlinedIcon className="w-5 h-5 text-gray-600" />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-6 z-20 mt-1 w-28 origin-top-right rounded-md bg-gray-100 py-0 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  {view !== 'Day' && (
                    <MenuItem>
                      <a
                        href="/booking/day"
                        className="block py-0 text-base font-medium text-gray-800 data-[focus]:bg-gray-100"
                        onClick={() => {
                          setView('Day');
                          setDayIndex(dayjs().date());
                          close();
                        }}>
                        Day View
                      </a>
                    </MenuItem>
                  )}
                  {view !== 'Week' && (
                    <MenuItem>
                      <a
                        href="/booking/week"
                        className="block py-0 text-base font-medium text-gray-800 data-[focus]:bg-gray-100"
                        onClick={() => {
                          setView('Week');
                          setDayIndex(dayjs().week());
                          close();
                        }}>
                        Week View
                      </a>
                    </MenuItem>
                  )}
                  {view !== 'Month' && (
                    <MenuItem>
                      <a
                        href="/booking/month"
                        className="block py-0 text-base font-medium text-gray-800 data-[focus]:bg-gray-100"
                        onClick={() => {
                          setView('Month');
                          setDayIndex(dayjs().month());
                          close();
                        }}>
                        Month View
                      </a>
                    </MenuItem>
                  )}
                </MenuItems>
              </>
            )}
          </Menu>

          {/* {authenticated && <div className="ml-0 h-6 w-px bg-gray-500"></div>} */}
          {authenticated && <AddBookingButton />}
        </div>
      </header>
    </>
  );
};

export default CalendarHeader;
