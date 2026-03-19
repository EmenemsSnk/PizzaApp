package com.pizzaapp.service;

import com.pizzaapp.dto.OrderRequest;
import com.pizzaapp.dto.OrderResponse;
import com.pizzaapp.entity.Order;
import com.pizzaapp.entity.OrderItem;
import com.pizzaapp.entity.Payment;
import com.pizzaapp.entity.Pizza;
import com.pizzaapp.repository.OrderRepository;
import com.pizzaapp.repository.PizzaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PizzaRepository pizzaRepository;

    public OrderService(OrderRepository orderRepository, PizzaRepository pizzaRepository) {
        this.orderRepository = orderRepository;
        this.pizzaRepository = pizzaRepository;
    }

    @Transactional
    public Order placeOrder(OrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setStreet(request.getStreet());
        order.setCity(request.getCity());
        order.setZip(request.getZip());
        order.setStatus("CONFIRMED");

        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderRequest.OrderItemRequest itemReq : request.getItems()) {
            Pizza pizza = pizzaRepository.findById(itemReq.getPizzaId())
                    .orElseThrow(() -> new IllegalArgumentException("Pizza not found: " + itemReq.getPizzaId()));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setPizza(pizza);
            item.setQuantity(itemReq.getQuantity());
            item.setUnitPrice(pizza.getPrice());
            items.add(item);

            total = total.add(pizza.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity())));
        }

        order.setTotal(total);
        order.setItems(items);

        if (request.getPayment() != null && request.getPayment().getCardNumber() != null) {
            String cardNumber = request.getPayment().getCardNumber().replaceAll("\\s+", "");
            String last4 = cardNumber.length() >= 4
                    ? cardNumber.substring(cardNumber.length() - 4)
                    : cardNumber;

            Payment payment = new Payment();
            payment.setOrder(order);
            payment.setCardLast4(last4);
            payment.setStatus("APPROVED");
            order.setPayment(payment);
        }

        Order saved = orderRepository.save(order);
        // Force initialization of lazy associations within the transaction
        saved.getItems().size();
        if (saved.getPayment() != null) saved.getPayment().getCardLast4();
        return saved;
    }

    @Transactional(readOnly = true)
    public Optional<Order> getOrder(Long id) {
        return orderRepository.findById(id).map(o -> {
            o.getItems().size();
            if (o.getPayment() != null) o.getPayment().getCardLast4();
            return o;
        });
    }
}
