package com.grocery.groceryapp.service;

import com.grocery.groceryapp.dto.AuthRequest;
import com.grocery.groceryapp.repository.UserRepository;
import com.grocery.groceryapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail());

        if(user != null && user.getPassword().equals(request.getPassword())) {
            return user;
        }
        throw new RuntimeException("Invalid credentials");
    }
}
