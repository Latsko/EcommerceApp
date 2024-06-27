package com.latsko.ecommerce.service;

import com.latsko.ecommerce.dto.Purchase;
import com.latsko.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
