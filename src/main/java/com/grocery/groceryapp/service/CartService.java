package com.grocery.groceryapp.service;

import com.grocery.groceryapp.model.Cart;
import com.grocery.groceryapp.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // ✅ Add to Cart
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // ✅ Get Cart by Email (THIS WAS MISSING)
    public List<Cart> getCartByUserEmail(String userEmail) {
        return cartRepository.findByUserEmail(userEmail);
    }

    // ✅ Delete Item
    public void deleteCartItem(Long id) {
        cartRepository.deleteById(id);
    }
}