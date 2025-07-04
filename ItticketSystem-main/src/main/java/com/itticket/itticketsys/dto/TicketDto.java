package com.itticket.itticketsys.dto;

import com.itticket.itticketsys.model.Ticket;
import java.time.LocalDate;

public class TicketDto {
    private String requestId;
    private Long employeeId;
    private Long systemId;
    private String subject;
    private String description;
    private String priority;
    private String requestType;
    private boolean criticalSystem;
    private String createdById;
    private String createdByName;
    private String createdByEmail;
    private String status;
    private Long handlerId;
    private LocalDate createdDate;
    private LocalDate closedDate;

    public TicketDto() {
    }

    public TicketDto(Ticket ticket) {
        this.requestId = ticket.getRequestId();
        this.employeeId = ticket.getEmployeeId();
        this.systemId = ticket.getSystemId() != null ? ticket.getSystemId() : -1L;
        this.subject = ticket.getSubject();
        this.description = ticket.getDescription();
        this.priority = ticket.getPriority();
        this.requestType = ticket.getRequestType();
        this.criticalSystem = ticket.isCriticalSystem();
        this.createdById = ticket.getCreatedById();
        this.createdByName = ticket.getCreatedByName();
        this.createdByEmail = ticket.getCreatedByEmail();
        this.status = ticket.getStatus();
        this.handlerId = ticket.getHandlerId() != null ? ticket.getHandlerId() : -1L;
        this.createdDate = ticket.getCreatedDate();
        this.closedDate = ticket.getClosedDate();
    }

    // --- Getters ---
    public String getRequestId() { return requestId; }
    public Long getEmployeeId() { return employeeId; }
    public Long getSystemId() { return systemId; }
    public String getSubject() { return subject; }
    public String getDescription() { return description; }
    public String getPriority() { return priority; }
    public String getRequestType() { return requestType; }
    public boolean isCriticalSystem() { return criticalSystem; }
    public String getCreatedById() { return createdById; }
    public String getCreatedByName() { return createdByName; }
    public String getCreatedByEmail() { return createdByEmail; }
    public String getStatus() { return status; }
    public Long getHandlerId() { return handlerId; }
    public LocalDate getCreatedDate() { return createdDate; }
    public LocalDate getClosedDate() { return closedDate; }

    // --- Setters ---
    public void setRequestId(String requestId) { this.requestId = requestId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public void setSystemId(Long systemId) { this.systemId = systemId; }
    public void setSubject(String subject) { this.subject = subject; }
    public void setDescription(String description) { this.description = description; }
    public void setPriority(String priority) { this.priority = priority; }
    public void setRequestType(String requestType) { this.requestType = requestType; }
    public void setCriticalSystem(boolean criticalSystem) { this.criticalSystem = criticalSystem; }
    public void setCreatedById(String createdById) { this.createdById = createdById; }
    public void setCreatedByName(String createdByName) { this.createdByName = createdByName; }
    public void setCreatedByEmail(String createdByEmail) { this.createdByEmail = createdByEmail; }
    public void setStatus(String status) { this.status = status; }
    public void setHandlerId(Long handlerId) { this.handlerId = handlerId; }
    public void setCreatedDate(LocalDate createdDate) { this.createdDate = createdDate; }
    public void setClosedDate(LocalDate closedDate) { this.closedDate = closedDate; }

    // --- toString ---
    @Override
    public String toString() {
        return "TicketDto{" +
                "requestId='" + requestId + '\'' +
                ", employeeId=" + employeeId +
                ", systemId=" + systemId +
                ", subject='" + subject + '\'' +
                ", description='" + description + '\'' +
                ", priority='" + priority + '\'' +
                ", requestType='" + requestType + '\'' +
                ", criticalSystem=" + criticalSystem +
                ", createdById='" + createdById + '\'' +
                ", createdByName='" + createdByName + '\'' +
                ", createdByEmail='" + createdByEmail + '\'' +
                ", status='" + status + '\'' +
                ", handlerId=" + handlerId +
                ", createdDate=" + createdDate +
                ", closedDate=" + closedDate +
                '}';
    }
}
