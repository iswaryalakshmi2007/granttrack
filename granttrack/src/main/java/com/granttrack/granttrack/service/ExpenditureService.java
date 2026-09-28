package com.granttrack.granttrack.service;

import com.granttrack.granttrack.entity.ApplicationEntity;
import com.granttrack.granttrack.entity.ExpenditureEntity;
import com.granttrack.granttrack.repository.ApplicationRepository;
import com.granttrack.granttrack.repository.ExpenditureRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenditureService {

    private final ExpenditureRepository expenditureRepository;
    private final ApplicationRepository applicationRepository;

    public ExpenditureService(
            ExpenditureRepository expenditureRepository,
            ApplicationRepository applicationRepository) {

        this.expenditureRepository = expenditureRepository;
        this.applicationRepository = applicationRepository;
    }

    public ExpenditureEntity createExpenditure(ExpenditureEntity expenditure) {

        int applicationId = expenditure.getApplication().getId();

        ApplicationEntity application =
                applicationRepository.findById(applicationId).orElse(null);

        if (application == null) {
            throw new RuntimeException("Application not found");
        }

        if (!"APPROVED".equalsIgnoreCase(application.getStatus())) {
            throw new RuntimeException(
                    "Expenditure is allowed only for APPROVED applications");
        }

        List<ExpenditureEntity> existing =
                expenditureRepository.findByApplicationId(applicationId);

        double totalExisting = existing.stream()
                .mapToDouble(ExpenditureEntity::getAmount)
                .sum();

        double newTotal = totalExisting + expenditure.getAmount();

        if (newTotal > application.getApprovedAmount()) {
            throw new RuntimeException(
                    "Total expenditure cannot exceed approved amount");
        }

        return expenditureRepository.save(expenditure);
    }

    public List<ExpenditureEntity> getAllExpenditures() {
        return expenditureRepository.findAll();
    }

    public ExpenditureEntity getExpenditureById(int id) {
        return expenditureRepository.findById(id).orElse(null);
    }

    public ExpenditureEntity updateExpenditure(ExpenditureEntity expenditure) {
        return expenditureRepository.save(expenditure);
    }

    public void deleteExpenditure(int id) {
        expenditureRepository.deleteById(id);
    }
}