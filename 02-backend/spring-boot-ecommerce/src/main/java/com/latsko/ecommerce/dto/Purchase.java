package com.latsko.ecommerce.dto;

import com.latsko.ecommerce.entity.Address;
import com.latsko.ecommerce.entity.Customer;
import com.latsko.ecommerce.entity.Order;
import com.latsko.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
