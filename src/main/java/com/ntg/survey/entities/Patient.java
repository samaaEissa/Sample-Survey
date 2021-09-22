package com.ntg.survey.entities;

import java.time.LocalDate;
import java.time.Period;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

@Entity
public class Patient extends BaseEntity {

	private String name;
	private String address;
	private String medicalcondition;
	private LocalDate dob;
	@Transient
	private int age;
	@ManyToOne
	@JoinColumn(name = "userid")
	private User user;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}	

	public String getMedicalcondition() {
		return medicalcondition;
	}

	public void setMedicalcondition(String medicalcondition) {
		this.medicalcondition = medicalcondition;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public int getAge() {
		return Period.between(this.dob, LocalDate.now()).getYears();
	}

	public void setAge(int age) {
		this.age = age;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
