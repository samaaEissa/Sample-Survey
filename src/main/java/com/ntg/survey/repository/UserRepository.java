package com.ntg.survey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ntg.survey.entities.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	public List<User> findByName (String name);
	public User findByEmail(String email);

}
