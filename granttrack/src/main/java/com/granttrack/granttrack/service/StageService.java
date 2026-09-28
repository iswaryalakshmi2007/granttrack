package com.granttrack.granttrack.service;

import com.granttrack.granttrack.entity.StageEntity;
import com.granttrack.granttrack.repository.StageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StageService {

    private final StageRepository stageRepository;

    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    public StageEntity createStage(StageEntity stage) {
        return stageRepository.save(stage);
    }

    public List<StageEntity> getAllStages() {
        return stageRepository.findAll();
    }

    public StageEntity getStageById(int id) {
        return stageRepository.findById(id).orElse(null);
    }

    public StageEntity updateStage(StageEntity stage) {
        return stageRepository.save(stage);
    }

    public void deleteStage(int id) {
        stageRepository.deleteById(id);
    }
}