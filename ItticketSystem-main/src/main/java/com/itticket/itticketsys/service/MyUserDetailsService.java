package com.itticket.itticketsys.service;

import com.itticket.itticketsys.model.User;
import com.itticket.itticketsys.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 🔍 Look up user by email (used as the username)
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("❌ User not found with email: " + email));

        // ✅ Return Spring Security-compatible UserDetails instance
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPassword())
            .authorities(Collections.emptyList()) // You can replace with actual roles later
            .build();
    }
}
