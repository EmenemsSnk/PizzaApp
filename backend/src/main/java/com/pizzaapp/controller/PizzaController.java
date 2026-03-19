package com.pizzaapp.controller;

import com.pizzaapp.entity.Pizza;
import com.pizzaapp.repository.PizzaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pizzas")
@CrossOrigin
public class PizzaController {

    private final PizzaRepository pizzaRepository;

    public PizzaController(PizzaRepository pizzaRepository) {
        this.pizzaRepository = pizzaRepository;
    }

    @GetMapping
    public List<Pizza> getAll() {
        return pizzaRepository.findAll();
    }
}
