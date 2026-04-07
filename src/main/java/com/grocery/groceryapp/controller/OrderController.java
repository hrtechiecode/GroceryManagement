package com.grocery.groceryapp.controller;

import com.grocery.groceryapp.model.Cart;
import com.grocery.groceryapp.model.Order;
import com.grocery.groceryapp.repository.CartRepository;
import com.grocery.groceryapp.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    // ✅ GET ALL ORDERS
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ✅ CHECKOUT (Cart → Order)
    @PostMapping("/checkout/{email}")
    public Order checkout(@PathVariable String email) {

        List<Cart> cartItems = cartRepository.findByUserEmail(email);

        double total = 0;
        List<String> itemNames = new ArrayList<>();

        for (Cart c : cartItems) {
            total += c.getPrice() * c.getQuantity();
            itemNames.add(c.getItemName());
        }

        Order order = new Order();
        order.setUserEmail(email);
        order.setItemNames(itemNames);
        order.setTotalPrice(total);

        // save order
        Order savedOrder = orderRepository.save(order);

        // clear cart
        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }
}