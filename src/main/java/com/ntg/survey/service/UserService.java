package com.ntg.survey.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntg.survey.dto.UserDTO;
import com.ntg.survey.entities.User;
import com.ntg.survey.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public List<UserDTO> GetAll() {
		List<User> users = userRepository.findAll();
		List<UserDTO> listuserdtos = new ArrayList<UserDTO>();
		for (User user : users) {
			UserDTO userDTO = new UserDTO();
			userDTO.setId(user.getId());
			userDTO.setName(user.getName());
			userDTO.setEmail(user.getEmail());
			userDTO.setAddress(user.getAddress());
			listuserdtos.add(userDTO);
		}

		return listuserdtos;
	}

	public UserDTO GetById(long id) {
		User user = userRepository.getById(id);
		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setName(user.getName());
		userDTO.setEmail(user.getEmail());
		userDTO.setAddress(user.getAddress());
		return userDTO;
	}

	public List<User> getByName(String name) {
		return userRepository.findByName(name);
	}

	public void addUser(User user) {
		userRepository.save(user);
	}

	@Transactional
	public void updateUser(User user) throws Exception {
		Optional<User> U = userRepository.findById(user.getId());
		if (U.isPresent()) {
			User user1 = U.get();
			user1.setAddress(user.getAddress());
			user1.setEmail(user.getEmail());
			user1.setName(user.getName());
			user1.setUseerName(user.getUseerName());
			user1.setUserType(user.getUserType());
			user1.setPatients(user.getPatients());
		} else
			throw new Exception("User Not exists");
	}

	public void deletUser(Long id) {

		boolean exist = userRepository.existsById(id);
		if (exist) {
			userRepository.deleteById(id);
		} else {
			throw new IllegalStateException("Object Not Deleted");
		}
	}

	public User Login(String password, String email) throws Exception {
		User user = userRepository.findByEmail(email);
		String userPassword = user.getPassword();
		if (password.equals(userPassword)) {

			return user;
		} else {
			throw new Exception("wrong email or password");
		}

	}
}
