package com.ntg.survey.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ntg.survey.entities.Patient;
import com.ntg.survey.repository.PatientRepository;

@Service
public class PatientService {

	@Autowired
	private PatientRepository patientRepository;

	public List<Patient> GetAll() {
		return patientRepository.findAll();
	}

	public List<Patient> getByName(String name) {
		return patientRepository.findByName(name);
	}

	public List<Patient> getByCondition(String condition) {
		return patientRepository.findByMedicalcondition(condition);
	}

	public void addPatient(Patient patient) {
		patientRepository.save(patient);
	}

	@Transactional
	public void updatePatient(Patient patien) {
		Optional<Patient> P = patientRepository.findById(patien.getId());
		if (P.isPresent()) {
			Patient patien1 = P.get();
			patien1.setName(patien.getName());
			patien1.setAddress(patien.getAddress());
			patien1.setDob(patien.getDob());
			patien1.setMedicalcondition(patien.getMedicalcondition());

		}
	}

	public void deletPatient(Long id) {

		boolean exist = patientRepository.existsById(id);
		if (exist) {
			patientRepository.deleteById(id);
		} else {
			throw new IllegalStateException("Object Not Deleted");
		}
	}

}
