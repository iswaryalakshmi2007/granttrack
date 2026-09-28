package com.granttrack.granttrack.controller;

import com.granttrack.granttrack.service.GrantMonitoringService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/grant-monitoring")
@CrossOrigin
public class GrantMonitoringController {

    private final GrantMonitoringService grantMonitoringService;

    public GrantMonitoringController(
            GrantMonitoringService grantMonitoringService) {

        this.grantMonitoringService = grantMonitoringService;
    }

    @GetMapping("/{applicationId}")
    public Map<String, Object> getGrantMonitoring(
            @PathVariable int applicationId) {

        return grantMonitoringService.getGrantMonitoring(applicationId);
    }
}