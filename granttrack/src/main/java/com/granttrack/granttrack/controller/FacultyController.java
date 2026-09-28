package com.granttrack.granttrack.controller;

import com.granttrack.granttrack.entity.FacultyEntity;
import com.granttrack.granttrack.service.FacultyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculties")
public class FacultyController {

    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @PostMapping
    public ResponseEntity<FacultyEntity> createFaculty(
            @Valid @RequestBody FacultyEntity faculty) {

        return new ResponseEntity<>(
                facultyService.createFaculty(faculty),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<FacultyEntity>> getAllFaculty() {
        return ResponseEntity.ok(facultyService.getAllFaculty());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacultyEntity> getFacultyById(
            @PathVariable int id) {

        FacultyEntity faculty = facultyService.getFacultyById(id);

        if (faculty == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(faculty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacultyEntity> updateFaculty(
            @PathVariable int id,
            @Valid @RequestBody FacultyEntity faculty) {

        faculty.setId(id);

        return ResponseEntity.ok(
                facultyService.updateFaculty(faculty)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaculty(
            @PathVariable int id) {

        facultyService.deleteFaculty(id);

        return ResponseEntity.noContent().build();
    }
}