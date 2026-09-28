package com.granttrack.granttrack.controller;

import com.granttrack.granttrack.entity.ApplicationEntity;
import com.granttrack.granttrack.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<ApplicationEntity> createApplication(
            @Valid @RequestBody ApplicationEntity application) {

        return new ResponseEntity<>(
                applicationService.createApplication(application),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<ApplicationEntity>> getAllApplications() {
        return ResponseEntity.ok(
                applicationService.getAllApplications()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationEntity> getApplicationById(
            @PathVariable int id) {

        ApplicationEntity application =
                applicationService.getApplicationById(id);

        if (application == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationEntity> updateApplication(
            @PathVariable int id,
            @Valid @RequestBody ApplicationEntity application) {

        application.setId(id);

        return ResponseEntity.ok(
                applicationService.updateApplication(application)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable int id) {

        applicationService.deleteApplication(id);

        return ResponseEntity.noContent().build();
    }
}