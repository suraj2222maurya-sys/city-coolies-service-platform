import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

import { NextResponse } from "next/server";

import { getRazorpayClient } from "@/lib/payments/razorpay";
import {
  calculateAdvanceAmount,
  calculateCustomCleaningPlan,
  calculateCustomKitchenCleaningPlan,
  calculateCustomBathroomCleaningPlan,
  getServicePackage,
} from "@/lib/services/serviceCatalog";

import { calculateIndustrialCleaningPlan } from "@/lib/services/industrialCleaningCatalog";

const COMPANY_WHATSAPP_NUMBER = "919710946484";

type AddressData = {
  houseNumber?: string;
  buildingName?: string;
  street?: string;
  area?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  googleMapsUrl?: string;
};

type PaymentData = {
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
};

type BookingRequest = {
  packageId?: string;
  customServices?: unknown;
  paymentMethod?: "advance" | "cash";
  payment?: PaymentData;
  customer?: {
    name?: string;
    phone?: string;
    email?: string;
    preferredDate?: string;
    address?: AddressData;
  };
};

function cleanValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function createBookingId(): string {
  const datePart = new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  const randomPart = Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase();

  return `CC-${datePart}-${randomPart}`;
}

function formatAmount(amount: number): string {
  return amount.toLocaleString("en-IN");
}

function signaturesMatch(
  expectedSignature: string,
  receivedSignature: string,
): boolean {
  const expectedBuffer = Buffer.from(expectedSignature);
  const receivedBuffer = Buffer.from(receivedSignature);

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingRequest;

    const packageId = cleanValue(body.packageId);
    const customer = body.customer;
    const address = customer?.address;

    if (
      body.paymentMethod !== "advance" &&
      body.paymentMethod !== "cash"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid payment method.",
        },
        { status: 400 },
      );
    }

   let trustedCustomServices: Array<{
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}> = [];

let servicePackage = getServicePackage(packageId);

if (packageId === "custom-cleaning-plan") {
  const customPlan = calculateCustomCleaningPlan(
    body.customServices,
  );

  if (!customPlan) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please select at least one valid cleaning service.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = customPlan.services;

  servicePackage = {
    id: "custom-cleaning-plan",
    name: "Customized Cleaning Plan",
    originalPrice: customPlan.total,
    offerPrice: customPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "custom-kitchen-cleaning-plan") {
  const customKitchenPlan =
    calculateCustomKitchenCleaningPlan(
      body.customServices,
    );

  if (!customKitchenPlan) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please select at least one valid kitchen-cleaning service.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = customKitchenPlan.services;

  servicePackage = {
    id: "custom-kitchen-cleaning-plan",
    name: "Custom Kitchen Cleaning Plan",
    originalPrice: customKitchenPlan.total,
    offerPrice: customKitchenPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "custom-bathroom-cleaning-plan") {
  const customBathroomPlan =
    calculateCustomBathroomCleaningPlan(
      body.customServices,
    );

  if (!customBathroomPlan) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please select at least one valid bathroom-cleaning service.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = customBathroomPlan.services;

  servicePackage = {
    id: "custom-bathroom-cleaning-plan",
    name: "Custom Bathroom Cleaning Plan",
    originalPrice: customBathroomPlan.total,
    offerPrice: customBathroomPlan.total,
    advancePercentage: 50,
  };
}
if (packageId === "industrial-cleaning-plan") {
  const industrialPlan = calculateIndustrialCleaningPlan(
    body.customServices,
  );

  if (!industrialPlan) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please enter a valid industrial service quantity.",
      },
      { status: 400 },
    );
  }

  trustedCustomServices = [...industrialPlan.services];

  servicePackage = {
    id: "industrial-cleaning-plan",
    name: "Industrial Cleaning Plan",
    originalPrice: industrialPlan.total,
    offerPrice: industrialPlan.total,
    advancePercentage: 50,
  };
}
if (!servicePackage) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Selected service package is not available.",
    },
    { status: 404 },
  );
}

    const customerName = cleanValue(customer?.name);
    const phone = cleanValue(customer?.phone);
    const email = cleanValue(customer?.email);
    const preferredDate = cleanValue(
      customer?.preferredDate,
    );

    const houseNumber = cleanValue(address?.houseNumber);
    const buildingName = cleanValue(address?.buildingName);
    const street = cleanValue(address?.street);
    const area = cleanValue(address?.area);
    const landmark = cleanValue(address?.landmark);
    const city = cleanValue(address?.city);
    const state = cleanValue(address?.state);
    const pinCode = cleanValue(address?.pinCode);

    if (!customerName || !phone || !preferredDate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, phone number and preferred date are required.",
        },
        { status: 400 },
      );
    }

    if (
      !houseNumber ||
      !street ||
      !area ||
      !city ||
      !state ||
      !pinCode
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter your complete service address.",
        },
        { status: 400 },
      );
    }

    const completeAddress = [
      houseNumber,
      buildingName,
      street,
      area,
      landmark,
      city,
      state,
      pinCode,
    ]
      .filter(Boolean)
      .join(", ");

    const googleMapsUrl =
      cleanValue(address?.googleMapsUrl) ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        completeAddress,
      )}`;

    const advanceAmount =
      calculateAdvanceAmount(servicePackage);

    let paidAmount = 0;
    let remainingAmount = servicePackage.offerPrice;
    let paymentId = "";
    let paymentLabel = "Cash on Service";

    if (body.paymentMethod === "advance") {
      const orderId = cleanValue(
        body.payment?.razorpayOrderId,
      );

      paymentId = cleanValue(
        body.payment?.razorpayPaymentId,
      );

      const receivedSignature = cleanValue(
        body.payment?.razorpaySignature,
      );

      if (!orderId || !paymentId || !receivedSignature) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Complete online payment details are required.",
          },
          { status: 400 },
        );
      }

      const keySecret =
        process.env.RAZORPAY_KEY_SECRET?.trim();

      if (!keySecret) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Online payment is not configured yet.",
          },
          { status: 503 },
        );
      }

      const expectedSignature = createHmac(
        "sha256",
        keySecret,
      )
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      if (
        !signaturesMatch(
          expectedSignature,
          receivedSignature,
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Payment verification failed.",
          },
          { status: 400 },
        );
      }

      const razorpay = getRazorpayClient();

      const [payment, order] = await Promise.all([
        razorpay.payments.fetch(paymentId),
        razorpay.orders.fetch(orderId),
      ]);

      const expectedAmount = advanceAmount * 100;
      const orderNotes = order.notes as
        | Record<string, unknown>
        | undefined;
        const expectedCustomServiceIds =
  trustedCustomServices
    .map(
      (service) =>
        `${service.id}:${service.quantity}`,
    )
    .join("|");
     const expectedCustomPlanType =
        packageId === "industrial-cleaning-plan"
          ? "industrial"
          : packageId === "custom-bathroom-cleaning-plan"
            ? "bathroom"
            : packageId === "custom-kitchen-cleaning-plan"
              ? "kitchen"
              : packageId === "custom-cleaning-plan"
                ? "home"
                : "fixed";
      if (
        payment.order_id !== orderId ||
        Number(payment.amount) !== expectedAmount ||
        payment.currency !== "INR" ||
        Number(order.amount) !== expectedAmount ||
        order.currency !== "INR" ||
               cleanValue(orderNotes?.packageId) !== packageId ||
        cleanValue(orderNotes?.customPlanType) !==
          expectedCustomPlanType ||
        cleanValue(orderNotes?.customServiceIds) !==
          expectedCustomServiceIds
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Payment details do not match the selected service.",
          },
          { status: 400 },
        );
      }

      if (payment.status !== "captured") {
        return NextResponse.json(
          {
            success: false,
            paymentPending: true,
            message:
              "Payment is processing. Booking will be confirmed after payment capture.",
          },
          { status: 202 },
        );
      }

      paidAmount = advanceAmount;
      remainingAmount =
        servicePackage.offerPrice - advanceAmount;
      paymentLabel = "50% Advance Online Payment";
    }

    const bookingId = createBookingId();
const customServicesMessage =
  trustedCustomServices.length > 0
    ? [
        "",
       packageId === "industrial-cleaning-plan"
          ? "Selected Industrial Cleaning Service:"
          : packageId === "custom-bathroom-cleaning-plan"
            ? "Selected Custom Bathroom Services:"
            : packageId === "custom-kitchen-cleaning-plan"
              ? "Selected Custom Kitchen Services:"
              : "Selected Custom Cleaning Services:",
        ...trustedCustomServices.map(
          (service) =>
            `${service.name} Ã— ${service.quantity} = â‚¹${formatAmount(
              service.lineTotal,
            )}`,
        ),
      ]
    : [];
    const bookingMessage = [
      "CITY COOLIES - NEW SERVICE BOOKING",
      "",
      `Booking ID: ${bookingId}`,
      `Service: ${servicePackage.name}`,
      ...customServicesMessage,
      `Customer Name: ${customerName}`,
      `Phone Number: ${phone}`,
      `Email Address: ${email || "Not provided"}`,
      `Preferred Date: ${preferredDate}`,
      "",
      `Service Address: ${completeAddress}`,
      `Google Maps Location: ${googleMapsUrl}`,
      "",
      `Original Price: â‚¹${formatAmount(
        servicePackage.originalPrice,
      )}`,
      `Service Price: â‚¹${formatAmount(
        servicePackage.offerPrice,
      )}`,
      `Payment Method: ${paymentLabel}`,
      `Pay Now: â‚¹${formatAmount(paidAmount)}`,
      `Amount Due: â‚¹${formatAmount(remainingAmount)}`,
      ...(paymentId
        ? [`Razorpay Payment ID: ${paymentId}`]
        : []),
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${COMPANY_WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(bookingMessage)}`;

    return NextResponse.json(
      {
        success: true,
        message:
          body.paymentMethod === "advance"
            ? "Payment verified and booking confirmed."
            : "Booking details are ready to send on WhatsApp.",
        bookingId,
        paymentVerified:
          body.paymentMethod === "advance",
        whatsappUrl,
        googleMapsUrl,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Booking could not be completed. Please try again.",
      },
      { status: 500 },
    );
  }
}
