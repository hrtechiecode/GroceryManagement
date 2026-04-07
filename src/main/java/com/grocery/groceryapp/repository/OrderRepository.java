

package com.grocery.groceryapp.repository;

import com.grocery.groceryapp.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}