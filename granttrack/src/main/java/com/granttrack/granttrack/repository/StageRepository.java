package com.granttrack.granttrack.repository;

import com.granttrack.granttrack.entity.StageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StageRepository extends JpaRepository<StageEntity, Integer> {
}