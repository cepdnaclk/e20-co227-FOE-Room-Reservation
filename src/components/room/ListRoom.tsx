import { useContext, useEffect, useState } from 'react';
import { deleteRoom, getAllRooms } from '../../services/RoomService';
import { AxiosError } from 'axios';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DeleteConformation from '../DeleteConfirmation';
import AddRoomForm from './AddRoomForm';
import GlobalContext from '../../context/GlobalContext';
import UpdateRoom from './UpdateRoom';
import { Room } from '../Interfaces';
import { isAdmin, isSuperAdmin } from '../../services/AuthService';
import { Tooltip } from '@mui/material';

const ListRoom = () => {
  const admin = isAdmin();
  const superAdmin = isSuperAdmin();
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteConformation, setShowDeleteConformation] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    showAddRoomForm,
    setShowAddRoomForm,
    showUpdateRoomForm,
    setShowUpdateRoomForm,
  } = useContext(GlobalContext);

  // Get all the room details from backend
  const fetchRooms = async () => {
    try {
      const response = await getAllRooms();
      setRoomList(response.data.roomList);
    } catch (error) {
      setErrorMessage((error as AxiosError).message);
    }
  };
  // Render room details once when the page is loaded
  useEffect(() => {
    fetchRooms();
  }, []);

  // Delete the selected room details
  const handleDelete = async (room: Room) => {
    try {
      await deleteRoom(room.roomId);
      fetchRooms();
    } catch (error) {
      setErrorMessage((error as AxiosError).message);
      console.log('Error in getting the rooms:', error);
    }
  };

  const handleUpdate = (room: Room) => {
    setSelectedRoom(room);
    setShowUpdateRoomForm(true);
  };

  // Filter rooom according to the search query
  useEffect(() => {
    const filtered = roomList.filter((room) => {
      const roomName = room.roomName ? room.roomName.toLowerCase() : '';
      return roomName.includes(searchQuery.toLowerCase());
    });
    setFilteredRooms(filtered);
  }, [searchQuery, roomList]);

  // Show the conformation dialog box
  const confirmDelete = (room: Room) => {
    setShowDeleteConformation(true);
    setSelectedRoom(room);
  };

  // Cancel deletion action
  const cancelDelete = () => {
    setShowDeleteConformation(false);
  };

  // Proceed with deletion
  const proceedDelete = () => {
    setShowDeleteConformation(false);
    selectedRoom && handleDelete(selectedRoom);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg mt-20 px-10 py-6 bg-gray-100">
      {/* Error Display */}
      {errorMessage && (
        <div className="text-grey-700 h-full">Error: {errorMessage}</div>
      )}

      {/* Render the components if there are no errors */}
      {!errorMessage && (
        <div className="flex flex-col">
          <div className="px-8 flex items-center justify-start mb-5 space-x-8">
            <div className="text-2xl font-semibold text-gray-800">
              Room details
            </div>

            {/* <AddRoomButton /> */}
            {(admin || superAdmin) && (
              <div>
                <button
                  className="ml-10 rounded-md bg-indigo-600 px-3 py-1 h-9 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  onClick={() => setShowAddRoomForm(true)}>
                  Add Room
                </button>
              </div>
            )}

            {/* Get the search query */}
            <input
              type="text"
              value={searchQuery}
              // Update search query
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by room name..."
              className="border border-gray-300 rounded-md w-72 h-9 shadow-lg"
            />
          </div>

          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border border-gray-200 shadow-xl rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-300">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Room Name
                    </th>
                    <th
                      scope="col"
                      className="text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th
                      scope="col"
                      className="text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Description
                    </th>
                    <th
                      scope="col"
                      className="text-left text-sm font-bold text-gray-700 uppercase tracking-wider"></th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                      <tr
                        key={room.roomId}
                        className="hover:bg-blue-50 transition duration-200 ease-in-out">
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">
                          {room.roomName}
                        </td>
                        <td className="whitespace-nowrap text-sm text-gray-600">
                          {room.capacity}
                        </td>
                        <td className="whitespace-nowrap text-sm text-gray-600">
                          {room.description}
                        </td>

                        <td className="whitespace-nowrap text-right text-sm font-medium">
                          {(admin || superAdmin) && (
                            <span className="px-6">
                              <Tooltip title="Edit" arrow>
                                <button
                                  className="text-indigo-600 hover:bg-indigo-500 hover:text-white p-0.5 w-8 h-8 rounded-full"
                                  onClick={() => handleUpdate(room)}>
                                  <EditOutlinedIcon fontSize="small" />
                                </button>
                              </Tooltip>
                              <Tooltip title="Delete" arrow>
                                <button
                                  className="ml-4 text-red-600 hover:bg-red-500 hover:text-white p-0.5 w-8 h-8 rounded-full"
                                  onClick={() => confirmDelete(room)}>
                                  <DeleteOutlinedIcon fontSize="small" />
                                </button>
                              </Tooltip>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-start text-sm text-red-500">
                        No rooms found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showAddRoomForm && <AddRoomForm onRoomAddition={fetchRooms} />}
      {showUpdateRoomForm && (
        <UpdateRoom room={selectedRoom} onRoomUpdate={fetchRooms} />
      )}

      {/* Show the deletion confiramation component */}
      {showDeleteConformation && (
        <DeleteConformation
          deleteItem={`Room ${selectedRoom?.roomName}`}
          onConfirm={proceedDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ListRoom;
