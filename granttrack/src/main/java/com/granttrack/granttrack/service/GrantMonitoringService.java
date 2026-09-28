package com.granttrack.granttrack.service;

import com.granttrack.granttrack.entity.ApplicationEntity;
import com.granttrack.granttrack.entity.ExpenditureEntity;
import com.granttrack.granttrack.repository.ApplicationRepository;
import com.granttrack.granttrack.repository.ExpenditureRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GrantMonitoringService {

    private final ApplicationRepository applicationRepository;
    private final ExpenditureRepository expenditureRepository;

    public GrantMonitoringService(
            ApplicationRepository applicationRepository,
            ExpenditureRepository expenditureRepository) {

        this.applicationRepository = applicationRepository;
        this.expenditureRepository = expenditureRepository;
    }

    public Map<String, Object> getGrantMonitoring(int applicationId) {

        ApplicationEntity application =
                applicationRepository.findById(applicationId).orElse(null);

        if (application == null) {
            throw new RuntimeException("Application not found");
        }

        // Get all expenditures for this application
        List<ExpenditureEntity> expenditures =
                expenditureRepository.findByApplicationId(applicationId);

        // Calculate total expenditure
        double totalExpenditure = expenditures.stream()
                .mapToDouble(ExpenditureEntity::getAmount)
                .sum();

        // Get approved amount
        double approvedAmount = application.getApprovedAmount();

        // Calculate remaining amount
        double remainingAmount = approvedAmount - totalExpenditure;

        // Calculate utilization percentage
        double utilizationPercentage = 0;

        if (approvedAmount > 0) {
            utilizationPercentage =
                    (totalExpenditure / approvedAmount) * 100;
        }

        // Determine budget status
        String budgetStatus;

        if (utilizationPercentage < 70) {
            budgetStatus = "NORMAL";
        } else if (utilizationPercentage < 90) {
            budgetStatus = "WARNING";
        } else if (utilizationPercentage <= 100) {
            budgetStatus = "CRITICAL";
        } else {
            budgetStatus = "EXCEEDED";
        }

        // Calculate deadline status
        String deadlineStatus = "NOT SET";
        long daysRemaining = -1;

        LocalDate deadline = application.getUtilizationDeadline();

        if (deadline != null) {

            daysRemaining =
                    ChronoUnit.DAYS.between(
                            LocalDate.now(),
                            deadline
                    );

            if (daysRemaining < 0) {
                deadlineStatus = "OVERDUE";
            } else if (daysRemaining < 7) {
                deadlineStatus = "URGENT";
            } else if (daysRemaining <= 30) {
                deadlineStatus = "NEARING DEADLINE";
            } else {
                deadlineStatus = "ON TRACK";
            }
        }

        // Prepare response
        Map<String, Object> result = new HashMap<>();

        result.put("applicationId", application.getId());
        result.put("title", application.getTitle());
        result.put("status", application.getStatus());

        result.put("approvedAmount", approvedAmount);
        result.put("totalExpenditure", totalExpenditure);
        result.put("remainingAmount", remainingAmount);
        result.put("utilizationPercentage",
                Math.round(utilizationPercentage * 100.0) / 100.0);

        result.put("budgetStatus", budgetStatus);

        result.put("utilizationDeadline", deadline);
        result.put("daysRemaining", daysRemaining);
        result.put("deadlineStatus", deadlineStatus);

        return result;
    }
}