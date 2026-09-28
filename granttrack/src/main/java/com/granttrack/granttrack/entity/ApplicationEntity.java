package com.granttrack.granttrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

@Entity
@Table(name = "applications")
public class ApplicationEntity {

    @Id
    private int id;

    @NotBlank(message = "Title is required")
    private String title;

    @Positive(message = "Requested amount must be positive")
    private double requestedAmount;

    private double approvedAmount;

    @NotBlank(message = "Abstract is required")
    @Column(columnDefinition = "TEXT")
    private String abstractText;

    private String status;

    private LocalDate submissionDate;

    private LocalDate utilizationDeadline;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private FacultyEntity faculty;

    public ApplicationEntity() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getRequestedAmount() {
        return requestedAmount;
    }

    public void setRequestedAmount(double requestedAmount) {
        this.requestedAmount = requestedAmount;
    }

    public double getApprovedAmount() {
        return approvedAmount;
    }

    public void setApprovedAmount(double approvedAmount) {
        this.approvedAmount = approvedAmount;
    }

    public String getAbstractText() {
        return abstractText;
    }

    public void setAbstractText(String abstractText) {
        this.abstractText = abstractText;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }

    public LocalDate getUtilizationDeadline() {
        return utilizationDeadline;
    }

    public void setUtilizationDeadline(LocalDate utilizationDeadline) {
        this.utilizationDeadline = utilizationDeadline;
    }

    public FacultyEntity getFaculty() {
        return faculty;
    }

    public void setFaculty(FacultyEntity faculty) {
        this.faculty = faculty;
    }
}