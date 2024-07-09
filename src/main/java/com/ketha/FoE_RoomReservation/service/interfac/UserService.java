package com.ketha.FoE_RoomReservation.service.interfac;

import com.ketha.FoE_RoomReservation.dto.LoginDto;
import com.ketha.FoE_RoomReservation.dto.ResponseDto;
import com.ketha.FoE_RoomReservation.model.User;

public interface UserService {
		
	ResponseDto register(User user);

	ResponseDto getAllUsers();

	ResponseDto login(LoginDto loginDto);

	ResponseDto getUserById(int userId);

	ResponseDto deleteUser(int userId);
}