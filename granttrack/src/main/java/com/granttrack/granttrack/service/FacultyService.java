package com.granttrack.granttrack.service;

import com.granttrack.granttrack.entity.FacultyEntity;
import com.granttrack.granttrack.repository.FacultyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    private final FacultyRepository facultyRepository;

    public FacultyService(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    public FacultyEntity createFaculty(FacultyEntity faculty) {
        return facultyRepository.save(faculty);
    }

    public List<FacultyEntity> getAllFaculty() {
        return facultyRepository.findAll();
    }

    public FacultyEntity getFacultyById(int id) {
        return facultyRepository.findById(id).orElse(null);
    }

    public FacultyEntity updateFaculty(FacultyEntity faculty) {
        return facultyRepository.save(faculty);
    }

    public void deleteFaculty(int id) {
        facultyRepository.deleteById(id);
    }
}