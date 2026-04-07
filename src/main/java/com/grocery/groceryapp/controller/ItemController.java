package com.grocery.groceryapp.controller;

import com.grocery.groceryapp.model.Item;
import com.grocery.groceryapp.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    // ✅ CREATE ITEM
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item); // already correct
    }

    // ✅ GET ALL ITEMS
    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // ✅ GET ITEM BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemRepository.findById(id)
                .map(item -> ResponseEntity.ok(item))
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ UPDATE ITEM (FIXED)
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item newItem) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setName(newItem.getName());
                    item.setCategory(newItem.getCategory());
                    item.setPrice(newItem.getPrice());
                    item.setImageUrl(newItem.getImageUrl()); // ✅ FIX ADDED
                    return ResponseEntity.ok(itemRepository.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ DELETE ITEM
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        return itemRepository.findById(id)
                .map(item -> {
                    itemRepository.delete(item);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}