package com.granttrack.granttrack.controller;

import com.granttrack.granttrack.entity.ExpenditureEntity;
import com.granttrack.granttrack.service.ExpenditureService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenditures")
public class ExpenditureController {

    private final ExpenditureService expenditureService;

    public ExpenditureController(ExpenditureService expenditureService) {
        this.expenditureService = expenditureService;
    }

    @PostMapping
    public ResponseEntity<ExpenditureEntity> createExpenditure(
            @Valid @RequestBody ExpenditureEntity expenditure) {

        return new ResponseEntity<>(
                expenditureService.createExpenditure(expenditure),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<ExpenditureEntity>> getAllExpenditures() {
        return ResponseEntity.ok(
                expenditureService.getAllExpenditures()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenditureEntity> getExpenditureById(
            @PathVariable int id) {

        ExpenditureEntity expenditure =
                expenditureService.getExpenditureById(id);

        if (expenditure == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(expenditure);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenditureEntity> updateExpenditure(
            @PathVariable int id,
            @Valid @RequestBody ExpenditureEntity expenditure) {

        expenditure.setId(id);

        return ResponseEntity.ok(
                expenditureService.updateExpenditure(expenditure)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpenditure(
            @PathVariable int id) {

        expenditureService.deleteExpenditure(id);

        return ResponseEntity.noContent().build();
    }
}