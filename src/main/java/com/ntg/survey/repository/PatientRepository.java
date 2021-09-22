package com.ntg.survey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ntg.survey.entities.Patient;


@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
	public List<Patient> findByName (String name);
	public List<Patient> findByMedicalcondition(String condition);
}
