package com.granttrack.granttrack.repository;

import com.granttrack.granttrack.entity.ExpenditureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenditureRepository extends JpaRepository<ExpenditureEntity, Integer> {

    List<ExpenditureEntity> findByApplicationId(int applicationId);
}