import axios from 'axios';
import qs from 'qs';

// Base URL for the API
const BASE_URL = 'http://localhost:8082/room';

// Endpoints
const GET_ROOMS = `${BASE_URL}/all`;
const ADD_ROOM = `${BASE_URL}/add-room`;
const UPDATE_ROOM = (roomId: number) => `${BASE_URL}/update-room/${roomId}`;
const DELETE_ROOM = (roomId: number) => `${BASE_URL}/delete-room/${roomId}`;
const AVAILABLE_ROOMS = (date: string) =>
  `${BASE_URL}/available-rooms-by-date/${date}`;

export const getAllRooms = () => axios.get(GET_ROOMS);

export const addRoom = (room: any) => {
  return axios.post(ADD_ROOM, qs.stringify(room), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const updateRoom = (roomId: number, room: any) => {
  return axios.put(UPDATE_ROOM(roomId), room, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const deleteRoom = (roomId: number) => axios.delete(DELETE_ROOM(roomId));

export const availableRooms = async (date: string) => {
  return await axios.get(AVAILABLE_ROOMS(date));
};
