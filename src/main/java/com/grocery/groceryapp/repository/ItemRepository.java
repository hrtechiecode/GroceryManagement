package com.grocery.groceryapp.repository;

import com.grocery.groceryapp.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}