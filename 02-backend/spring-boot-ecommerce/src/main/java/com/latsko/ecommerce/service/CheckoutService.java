package com.latsko.ecommerce.service;

import com.latsko.ecommerce.dto.PaymentInfo;
import com.latsko.ecommerce.dto.Purchase;
import com.latsko.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
