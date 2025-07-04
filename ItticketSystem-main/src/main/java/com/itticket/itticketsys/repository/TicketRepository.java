package com.itticket.itticketsys.repository;

import com.itticket.itticketsys.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {

    // 🔍 All tickets created by an employee
    List<Ticket> findByEmployeeId(Long employeeId);

    // 🔍 All tickets for a given system
    List<Ticket> findBySystemId(Long systemId);

    // 🔍 Tickets by handler and status (e.g., In Progress or Closed)
    List<Ticket> findByHandlerIdAndStatus(Long handlerId, String status);

    // 🔍 Tickets by employee and status
    List<Ticket> findByEmployeeIdAndStatus(Long employeeId, String status);

    // 🔍 Optional: All tickets by status (if needed in future)
    List<Ticket> findByStatus(String status);

    // ✅ Used for auto-assigning to handler with fewest active tickets
    long countByHandlerIdAndStatus(Long handlerId, String status);
}
