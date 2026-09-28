package com.granttrack.granttrack.controller;

import com.granttrack.granttrack.entity.StageEntity;
import com.granttrack.granttrack.service.StageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stages")
public class StageController {

    private final StageService stageService;

    public StageController(StageService stageService) {
        this.stageService = stageService;
    }

    @PostMapping
    public ResponseEntity<StageEntity> createStage(
            @Valid @RequestBody StageEntity stage) {

        return new ResponseEntity<>(
                stageService.createStage(stage),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<StageEntity>> getAllStages() {
        return ResponseEntity.ok(
                stageService.getAllStages()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<StageEntity> getStageById(
            @PathVariable int id) {

        StageEntity stage = stageService.getStageById(id);

        if (stage == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(stage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StageEntity> updateStage(
            @PathVariable int id,
            @Valid @RequestBody StageEntity stage) {

        stage.setId(id);

        return ResponseEntity.ok(
                stageService.updateStage(stage)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStage(
            @PathVariable int id) {

        stageService.deleteStage(id);

        return ResponseEntity.noContent().build();
    }
}