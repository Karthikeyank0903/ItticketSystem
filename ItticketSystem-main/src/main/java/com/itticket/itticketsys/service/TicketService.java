package com.itticket.itticketsys.service;

import com.itticket.itticketsys.dto.TicketDto;
import java.util.List;

public interface TicketService {
    
    // Creates a new ticket and returns the generated request ID
    String createTicket(TicketDto ticketDto);

    // Retrieves tickets by employee ID
    List<TicketDto> getTicketsByEmployee(Long employeeId);

    // Retrieves open tickets assigned to a handler
    List<TicketDto> getTicketsByHandler(Long handlerId);

    // Retrieves ticket details by request ID
    TicketDto getTicketByRequestId(String requestId);

    // Retrieves closed tickets by handler ID
    List<TicketDto> getClosedTicketsByHandler(Long handlerId);

    // Retrieves closed tickets by employee ID
    List<TicketDto> getClosedTicketsByEmployee(Long employeeId);

    // Updates the status of a ticket (e.g., to "Closed")
    boolean updateStatus(String requestId, String newStatus);

    // Deletes a ticket by request ID
    boolean deleteTicket(String requestId);
}
