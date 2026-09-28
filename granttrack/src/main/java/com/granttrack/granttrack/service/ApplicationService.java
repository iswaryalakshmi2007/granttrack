package com.granttrack.granttrack.service;

import com.granttrack.granttrack.entity.ApplicationEntity;
import com.granttrack.granttrack.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public ApplicationEntity createApplication(ApplicationEntity application) {
        return applicationRepository.save(application);
    }

    public List<ApplicationEntity> getAllApplications() {
        return applicationRepository.findAll();
    }

    public ApplicationEntity getApplicationById(int id) {
        return applicationRepository.findById(id).orElse(null);
    }

    public ApplicationEntity updateApplication(ApplicationEntity application) {
        return applicationRepository.save(application);
    }

    public void deleteApplication(int id) {
        applicationRepository.deleteById(id);
    }
}