export {};

declare global {
  type RazorpaySuccessResponse = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };

  type RazorpayFailureResponse = {
    error: {
      code: string;
      description: string;
      source: string;
      step: string;
      reason: string;
      metadata?: {
        order_id?: string;
        payment_id?: string;
      };
    };
  };

  type RazorpayCheckoutOptions = {
    key: string;
    amount: number | string;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    image?: string;
    handler: (
      response: RazorpaySuccessResponse,
    ) => void | Promise<void>;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
      color?: string;
      backdrop_color?: string;
    };
    modal?: {
      confirm_close?: boolean;
      escape?: boolean;
      animation?: boolean;
      ondismiss?: () => void;
    };
    retry?: {
      enabled: boolean;
      max_count?: number;
    };
  };

  type RazorpayCheckout = {
    open: () => void;
    close: () => void;
    on: (
      event: "payment.failed",
      callback: (response: RazorpayFailureResponse) => void,
    ) => void;
  };

  interface Window {
    Razorpay: new (
      options: RazorpayCheckoutOptions,
    ) => RazorpayCheckout;
  }
}
