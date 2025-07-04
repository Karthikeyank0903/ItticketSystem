package com.itticket.itticketsys.repository;

import com.itticket.itticketsys.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // ✅ Add this:
    List<User> findByRole(String role);
}
