package com.pizzaapp.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class OrderRequest {

    @NotBlank
    private String customerName;

    @NotBlank
    private String street;

    @NotBlank
    private String city;

    @NotBlank
    private String zip;

    @NotEmpty
    @Valid
    private List<OrderItemRequest> items;

    @Valid
    private PaymentRequest payment;

    public static class OrderItemRequest {
        private Long pizzaId;
        private Integer quantity;

        public Long getPizzaId() { return pizzaId; }
        public void setPizzaId(Long pizzaId) { this.pizzaId = pizzaId; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class PaymentRequest {
        private String cardNumber;
        private String expiry;
        private String cvv;

        public String getCardNumber() { return cardNumber; }
        public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

        public String getExpiry() { return expiry; }
        public void setExpiry(String expiry) { this.expiry = expiry; }

        public String getCvv() { return cvv; }
        public void setCvv(String cvv) { this.cvv = cvv; }
    }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }

    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }

    public PaymentRequest getPayment() { return payment; }
    public void setPayment(PaymentRequest payment) { this.payment = payment; }
}
