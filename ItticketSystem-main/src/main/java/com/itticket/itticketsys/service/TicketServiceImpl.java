package com.itticket.itticketsys.service;

import com.itticket.itticketsys.dto.TicketDto;
import com.itticket.itticketsys.model.Ticket;
import com.itticket.itticketsys.model.User;
import com.itticket.itticketsys.repository.TicketRepository;
import com.itticket.itticketsys.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public String createTicket(TicketDto ticketDto) {
        // 🎫 Generate unique ticket ID
        String datePart = LocalDate.now().toString().replace("-", "");
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
        ticket.setStatus("In Progress");
        ticket.setCreatedDate(LocalDate.now());

        // ✅ Corrected: Set handlerId to the custom handler ID, not the DB ID
        User assignedHandler = assignAvailableHandler();
        ticket.setHandlerId(assignedHandler.getHandlerId());

        ticketRepository.save(ticket);
        return "✅ Ticket saved to database with ID: " + generatedId;
    }

    private User assignAvailableHandler() {
        List<User> supportHandlers = userRepository.findByRole("SUPPORT");
        if (supportHandlers.isEmpty()) {
            throw new IllegalStateException("❌ No support handlers available.");
        }

        User selectedHandler = null;
        long minTickets = Long.MAX_VALUE;

        for (User handler : supportHandlers) {
            long openTickets = ticketRepository.countByHandlerIdAndStatus(handler.getHandlerId(), "In Progress");
            if (openTickets < minTickets) {
                minTickets = openTickets;
                selectedHandler = handler;
            }
        }

        return selectedHandler;
    }

    @Override
    public List<TicketDto> getTicketsByEmployee(Long employeeId) {
        return ticketRepository.findByEmployeeId(employeeId)
                .stream().map(TicketDto::new).collect(Collectors.toList());
    }

    @Override
    public List<TicketDto> getTicketsByHandler(Long handlerId) {
        return ticketRepository.findByHandlerIdAndStatus(handlerId, "In Progress")
                .stream().map(TicketDto::new).collect(Collectors.toList());
    }

    @Override
    public TicketDto getTicketByRequestId(String requestId) {
        return ticketRepository.findById(requestId)
                .map(TicketDto::new)
                .orElse(null);
    }

    @Override
    public List<TicketDto> getClosedTicketsByHandler(Long handlerId) {
        return ticketRepository.findByHandlerIdAndStatus(handlerId, "Closed")
                .stream().map(TicketDto::new).collect(Collectors.toList());
    }

    @Override
    public List<TicketDto> getClosedTicketsByEmployee(Long employeeId) {
        return ticketRepository.findByEmployeeIdAndStatus(employeeId, "Closed")
                .stream().map(TicketDto::new).collect(Collectors.toList());
    }

    @Override
    public boolean updateStatus(String requestId, String newStatus) {
        return ticketRepository.findById(requestId).map(ticket -> {
            ticket.setStatus(newStatus);
            if ("Closed".equalsIgnoreCase(newStatus)) {
                ticket.setClosedDate(LocalDate.now());
            }
            ticketRepository.save(ticket);
            return true;
        }).orElse(false);
    }

    @Override
    public boolean deleteTicket(String requestId) {
        if (!ticketRepository.existsById(requestId)) {
            return false;
        }
        ticketRepository.deleteById(requestId);
        return true;
    }
}
