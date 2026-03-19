package com.pizzaapp.dto;

import com.pizzaapp.entity.Order;
import com.pizzaapp.entity.OrderItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class OrderResponse {
    private Long id;
    private LocalDateTime createdAt;
    private String status;
    private String customerName;
    private String street;
    private String city;
    private String zip;
    private BigDecimal total;
    private List<ItemResponse> items;
    private String cardLast4;

    public static OrderResponse from(Order order) {
        OrderResponse r = new OrderResponse();
        r.id = order.getId();
        r.createdAt = order.getCreatedAt();
        r.status = order.getStatus();
        r.customerName = order.getCustomerName();
        r.street = order.getStreet();
        r.city = order.getCity();
        r.zip = order.getZip();
        r.total = order.getTotal();
        if (order.getItems() != null) {
            r.items = order.getItems().stream().map(ItemResponse::from).collect(Collectors.toList());
        }
        if (order.getPayment() != null) {
            r.cardLast4 = order.getPayment().getCardLast4();
        }
        return r;
    }

    public static class ItemResponse {
        private Long pizzaId;
        private String pizzaName;
        private Integer quantity;
        private BigDecimal unitPrice;

        public static ItemResponse from(OrderItem item) {
            ItemResponse r = new ItemResponse();
            r.pizzaId = item.getPizza().getId();
            r.pizzaName = item.getPizza().getName();
            r.quantity = item.getQuantity();
            r.unitPrice = item.getUnitPrice();
            return r;
        }

        public Long getPizzaId() { return pizzaId; }
        public String getPizzaName() { return pizzaName; }
        public Integer getQuantity() { return quantity; }
        public BigDecimal getUnitPrice() { return unitPrice; }
    }

    public Long getId() { return id; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getStatus() { return status; }
    public String getCustomerName() { return customerName; }
    public String getStreet() { return street; }
    public String getCity() { return city; }
    public String getZip() { return zip; }
    public BigDecimal getTotal() { return total; }
    public List<ItemResponse> getItems() { return items; }
    public String getCardLast4() { return cardLast4; }
}
