package com.ntg.survey.cotroller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ntg.survey.dto.UserDTO;
import com.ntg.survey.dto.UserLoginDTO;
import com.ntg.survey.entities.User;
import com.ntg.survey.service.UserService;

@RestController
@CrossOrigin
@RequestMapping(path = "api/hospitals")
public class UserController {
	@Autowired
	private UserService userservice;

	@PostMapping(value = "/login")
	public boolean login(@RequestBody UserLoginDTO userLoginDTO) {

		try {
			User user = userservice.Login(userLoginDTO.getPassword(), userLoginDTO.getEmail());

			if (user != null) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			System.err.println(e.toString());
			return false;
		}
	}

	@GetMapping(value = "/users")
	public List<UserDTO> getAll() {
		return userservice.GetAll();
		
	}
	@GetMapping(value = "/users/{id}")
	public UserDTO getById(@PathVariable(value = "id") Long id) {
		return userservice.GetById(id);	
	}

	@PostMapping(value = "/save")
	public boolean addUser(@RequestBody User user) {
		try {
		userservice.addUser(user);
		return true;}
		catch (Exception e) {
			System.err.println(e.toString());
			return false;
		}
	}

	@DeleteMapping(value = "/delete/{id}")
	public boolean deleteUser(@PathVariable(value = "id") Long id) {
		try {
			userservice.deletUser(id);
			return true;}
			catch (Exception e) {
				System.err.println(e.toString());
				return false;
			}
	}

	@PutMapping(value = "/update")
	public boolean updateUser(@RequestBody User user) {
		
		try {
			userservice.updateUser(user);
			return true;}
			catch (Exception e) {
				System.err.println(e.toString());
				return false;
			}
	}

}
