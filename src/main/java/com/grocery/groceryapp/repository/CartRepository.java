package com.grocery.groceryapp.repository;

import com.grocery.groceryapp.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    // ✅ CORRECT METHOD
    List<Cart> findByUserEmail(String userEmail);
}