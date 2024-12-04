import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:8082/booking';

// Endpoints
const GET_DAY_BOOKING = (date: string) => `${BASE_URL}/day/${date}`;
const GET_WEEK_BOOKING = (weekStartDate: string, weekEndDate: string) =>
  `${BASE_URL}/week/${weekStartDate}/${weekEndDate}`;
const ADD_BOOKING = (roomName: string, userId: number) =>
  `${BASE_URL}/add-booking/${roomName}/${userId}`;
const UPDATE_BOOKING = (bookingId: number, userId: number) =>
  `${BASE_URL}/update-booking/${bookingId}/${userId}`;
const DELETE_BOOKING = (bookingId: number) =>
  `${BASE_URL}/delete-booking/${bookingId}`;
const CHECK_ROOM_AVAILABILITY = (date: string, roomName: string) =>
  `${BASE_URL}/is-room-available/${date}/${roomName}`;

export const getAllBookings = () => axios.get(`${BASE_URL}/all`);

export const getDayBookings = async (date: string) => {
  return await axios.get(GET_DAY_BOOKING(date));
};

export const getWeekBookings = async (
  weekStartDate: string,
  weekEndDate: string
) => {
  return await axios.get(GET_WEEK_BOOKING(weekStartDate, weekEndDate));
};

export const addBooking = (roomName: string, userId: number, booking: any) => {
  return axios.post(ADD_BOOKING(roomName, userId), booking, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateBooking = (
  bookingId: number,
  userId: number,
  booking: any
) => {
  return axios.put(UPDATE_BOOKING(bookingId, userId), booking, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteBooking = (bookingId: number) => {
  return axios.delete(DELETE_BOOKING(bookingId));
};

export const isRoomAvailable = async (date: string, roomName: string) => {
  return await axios.get(CHECK_ROOM_AVAILABILITY(date, roomName));
};
