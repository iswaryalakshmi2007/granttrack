package com.granttrack.granttrack.repository;

import com.granttrack.granttrack.entity.FacultyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepository extends JpaRepository<FacultyEntity, Integer> {
}