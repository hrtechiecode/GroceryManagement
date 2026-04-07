package com.grocery.groceryapp.controller;

import com.grocery.groceryapp.model.Cart;
import com.grocery.groceryapp.repository.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    // ✅ Add to Cart
    @PostMapping
    public Cart addToCart(@RequestBody Cart cart) {
        return cartRepository.save(cart);
    }

    // ✅ Get Cart by User
    @GetMapping("/{email}")
    public List<Cart> getCart(@PathVariable String email) {
        return cartRepository.findByUserEmail(email);
    }

    // ✅ Delete Item from Cart
    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {
        cartRepository.deleteById(id);
        return "Item removed from cart";
    }
}