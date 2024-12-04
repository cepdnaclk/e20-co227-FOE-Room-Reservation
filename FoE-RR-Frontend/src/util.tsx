import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

const year = dayjs().year();
const month = dayjs().month();
const week = dayjs().week();

const getMonth = (month = dayjs().month()) => {
  month = Math.floor(month);
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
};

export const getDay = (day = dayjs().date()) => {
  let startHour = 5;
  const hourArray = new Array(16).fill([]).map(() => {
    startHour++;
    return dayjs(new Date(year, month, day)).hour(startHour).minute(0);
  });
  return hourArray;
};

export const getWeek = (week = dayjs().week()) => {
  const startOfWeek = dayjs().year(year).week(week).startOf('week');
  const endOfWeek = startOfWeek.add(6, 'day');
  const weekArray = [];
  let currentDay = startOfWeek;

  while (
    currentDay.isBefore(endOfWeek) ||
    currentDay.isSame(endOfWeek, 'day')
  ) {
    weekArray.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }
  return weekArray;
};

export default getMonth;
