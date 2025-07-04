package com.itticket.itticketsys.controller;

import com.itticket.itticketsys.dto.TicketDto;
import com.itticket.itticketsys.model.Ticket;
import com.itticket.itticketsys.model.User;
import com.itticket.itticketsys.repository.TicketRepository;
import com.itticket.itticketsys.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    // Assign handler with fewest open tickets
    public User assignHandler() {
        List<User> handlers = userRepository.findByRole("SUPPORT");
        if (handlers.isEmpty()) {
            throw new IllegalStateException("No support handlers available");
        }

        User selectedHandler = null;
        long minOpenTicketCount = Long.MAX_VALUE;

        for (User handler : handlers) {
            long openTickets = ticketRepository.countByHandlerIdAndStatus(handler.getEmployeeId(), "In Progress");
            if (openTickets < minOpenTicketCount) {
                minOpenTicketCount = openTickets;
                selectedHandler = handler;
            }
        }

        return selectedHandler;
    }

    @PostMapping
    public ResponseEntity<String> createTicket(
            @RequestBody TicketDto ticketDto,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            return ResponseEntity.status(401).body("❌ Unauthorized: Missing or invalid Authorization header");
        }

        try {
            String base64Credentials = authHeader.substring("Basic ".length());
            byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
            String credentials = new String(decodedBytes);
            String[] values = credentials.split(":", 2);

            if (values.length != 2) {
                return ResponseEntity.status(400).body("❌ Invalid Basic auth format");
            }

            String email = values[0];
            String password = values[1];

            return userRepository.findByEmail(email)
                    .map(user -> {
                        if (!user.getPassword().equals(password)) {
                            return ResponseEntity.status(403).body("❌ Invalid credentials");
                        }

                        if ("SUPPORT".equalsIgnoreCase(user.getRole())) {
                            return ResponseEntity.status(403).body("⛔ Support team cannot create tickets.");
                        }

                        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                        String randomPart = String.format("%04d", new Random().nextInt(10000));
                        String generatedId = "TICKET-" + datePart + "-" + randomPart;

                        Ticket ticket = new Ticket();
                        ticket.setRequestId(generatedId);
                        ticket.setEmployeeId(ticketDto.getEmployeeId());
                        ticket.setSystemId(ticketDto.getSystemId());
                        ticket.setSubject(ticketDto.getSubject());
                        ticket.setDescription(ticketDto.getDescription());
                        ticket.setPriority(ticketDto.getPriority());
                        ticket.setRequestType(ticketDto.getRequestType());
                        ticket.setCriticalSystem(ticketDto.isCriticalSystem());
                        ticket.setCreatedById(ticketDto.getCreatedById());
                        ticket.setCreatedByName(ticketDto.getCreatedByName());
                        ticket.setCreatedByEmail(ticketDto.getCreatedByEmail());
                        ticket.setStatus(ticketDto.getStatus() != null ? ticketDto.getStatus() : "In Progress");
                        ticket.setCreatedDate(LocalDate.now());

                        User assignedHandler = assignHandler();
                        ticket.setHandlerId(assignedHandler.getEmployeeId());

                        ticketRepository.save(ticket);
                        return ResponseEntity.ok("✅ Ticket created with ID: " + generatedId);
                    })
                    .orElse(ResponseEntity.status(403).body("❌ User not found"));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Error: " + e.getMessage());
        }
    }

    // Employee Views
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<TicketDto>> getTicketsByEmployee(@PathVariable Long employeeId) {
        List<TicketDto> tickets = ticketRepository.findByEmployeeId(employeeId)
                .stream().map(TicketDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/employee/{employeeId}/current")
    public ResponseEntity<List<TicketDto>> getCurrentTicketsByEmployee(@PathVariable Long employeeId) {
        List<TicketDto> tickets = ticketRepository.findByEmployeeIdAndStatus(employeeId, "In Progress")
                .stream().map(TicketDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/employee/{employeeId}/history")
    public ResponseEntity<List<TicketDto>> getClosedTicketsByEmployee(@PathVariable Long employeeId) {
        List<TicketDto> tickets = ticketRepository.findByEmployeeIdAndStatus(employeeId, "Closed")
                .stream().map(TicketDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(tickets);
    }

    // Support Views
    @GetMapping("/handler/{handlerId}/current")
    public ResponseEntity<List<TicketDto>> getCurrentTicketsByHandler(@PathVariable Long handlerId) {
        List<TicketDto> tickets = ticketRepository.findByHandlerIdAndStatus(handlerId, "In Progress")
                .stream().map(TicketDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/handler/{handlerId}/history")
    public ResponseEntity<List<TicketDto>> getClosedTicketsByHandler(@PathVariable Long handlerId) {
        List<TicketDto> tickets = ticketRepository.findByHandlerIdAndStatus(handlerId, "Closed")
                .stream().map(TicketDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(tickets);
    }

    // Tickets by systemId (now Long)
    @GetMapping("/system/{systemId}")
    public ResponseEntity<List<TicketDto>> getTicketsBySystem(@PathVariable Long systemId) {
        List<TicketDto> tickets = ticketRepository.findBySystemId(systemId)
                .stream().map(TicketDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(tickets);
    }

    // By request ID
    @GetMapping("/{requestId}")
    public ResponseEntity<TicketDto> getTicketByRequestId(@PathVariable String requestId) {
        return ticketRepository.findById(requestId)
                .map(ticket -> ResponseEntity.ok(new TicketDto(ticket)))
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete ticket
    @DeleteMapping("/{requestId}")
    public ResponseEntity<String> deleteTicket(@PathVariable String requestId) {
        if (!ticketRepository.existsById(requestId)) {
            return ResponseEntity.notFound().build();
        }
        ticketRepository.deleteById(requestId);
        return ResponseEntity.ok("🗑 Deleted ticket: " + requestId);
    }

    // Update status
    @PutMapping("/{requestId}/status")
    public ResponseEntity<String> updateTicketStatus(
            @PathVariable String requestId,
            @RequestParam String status,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            return ResponseEntity.status(401).body("❌ Unauthorized");
        }

        try {
            String[] values = new String(Base64.getDecoder().decode(authHeader.substring(6))).split(":", 2);
            if (values.length != 2) return ResponseEntity.status(400).body("❌ Invalid Basic auth format");

            String email = values[0];
            String password = values[1];

            return userRepository.findByEmail(email)
                    .map(user -> {
                        if (!user.getPassword().equals(password))
                            return ResponseEntity.status(403).body("❌ Invalid credentials");

                        if (!"SUPPORT".equalsIgnoreCase(user.getRole()))
                            return ResponseEntity.status(403).body("⛔ Only SUPPORT role can update status");

                        return ticketRepository.findById(requestId)
                                .map(ticket -> {
                                    ticket.setStatus(status);
                                    if ("Closed".equalsIgnoreCase(status)) {
                                        ticket.setClosedDate(LocalDate.now());
                                    }
                                    ticketRepository.save(ticket);
                                    return ResponseEntity.ok("✅ Status updated to " + status);
                                })
                                .orElse(ResponseEntity.notFound().build());
                    })
                    .orElse(ResponseEntity.status(403).body("❌ User not found"));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Error: " + e.getMessage());
        }
    }
}
