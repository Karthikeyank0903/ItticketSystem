package com.itticket.itticketsys.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private Long handlerId;
    private Long systemId;
    private String contact;
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String role; // EMPLOYEE or SUPPORT

    // ====== Constructors ======
    public User() {
    }

    public User(Long employeeId, Long handlerId, Long systemId,
                String contact, String name, String email,
                String password, String role) {
        this.employeeId = employeeId;
        this.handlerId = handlerId;
        this.systemId = systemId;
        this.contact = contact;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // ====== Getters and Setters (unchanged) ======

    public Long getId() { return id; }

    public Long getEmployeeId() { return employeeId; }

    public Long getHandlerId() { return handlerId; }

    public Long getSystemId() { return systemId; }

    public String getContact() { return contact; }

    public String getName() { return name; }

    public String getEmail() { return email; }

    public String getPassword() { return password; }

    public String getRole() { return role; }

    public void setId(Long id) { this.id = id; }

    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public void setHandlerId(Long handlerId) { this.handlerId = handlerId; }

    public void setSystemId(Long systemId) { this.systemId = systemId; }

    public void setContact(String contact) { this.contact = contact; }

    public void setName(String name) { this.name = name; }

    public void setEmail(String email) { this.email = email; }

    public void setPassword(String password) { this.password = password; }

    public void setRole(String role) { this.role = role; }

    // ====== Manual Builder ======
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long employeeId;
        private Long handlerId;
        private Long systemId;
        private String contact;
        private String name;
        private String email;
        private String password;
        private String role;

        public Builder employeeId(long employeeId) {
            this.employeeId = employeeId;
            return this;
        }

        public Builder handlerId(long handlerId) {
            this.handlerId = handlerId;
            return this;
        }

        public Builder systemId(long systemId) {
            this.systemId = systemId;
            return this;
        }

        public Builder contact(String contact) {
            this.contact = contact;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public Builder role(String role) {
            this.role = role;
            return this;
        }

        public User build() {
            return new User(employeeId, handlerId, systemId, contact, name, email, password, role);
        }
    }
}
