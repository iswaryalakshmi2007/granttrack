package com.granttrack.granttrack.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Table(name = "stages")
public class StageEntity {

    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "application_id")
    private ApplicationEntity application;

    @NotBlank(message = "Stage name is required")
    private String stageName;

    private String remarks;

    private LocalDate stageDate;

    public StageEntity() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ApplicationEntity getApplication() {
        return application;
    }

    public void setApplication(ApplicationEntity application) {
        this.application = application;
    }

    public String getStageName() {
        return stageName;
    }

    public void setStageName(String stageName) {
        this.stageName = stageName;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDate getStageDate() {
        return stageDate;
    }

    public void setStageDate(LocalDate stageDate) {
        this.stageDate = stageDate;
    }
}