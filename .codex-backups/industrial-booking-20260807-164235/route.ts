import { NextResponse } from "next/server";

import {
  getRazorpayClient,
  getRazorpayKeyId,
} from "@/lib/payments/razorpay";
import {
  calculateAdvanceAmount,
  calculateCustomCleaningPlan,
  calculateCustomKitchenCleaningPlan,
  calculateCustomBathroomCleaningPlan,
  getServicePackage,
} from "@/lib/services/serviceCatalog";

type CreateOrderRequest = {
  packageId?: string;
  customServices?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderRequest;
    const packageId = body.packageId?.trim();

    if (!packageId) {
      return NextResponse.json(
        {
          success: false,
          message: "Service package is required.",
        },
        { status: 400 },
      );
    }

       const isCustomHomeCleaning =
      packageId === "custom-cleaning-plan";

    const isCustomKitchenCleaning =
  packageId === "custom-kitchen-cleaning-plan";

const isCustomBathroomCleaning =
  packageId === "custom-bathroom-cleaning-plan";

const isCustomCleaning =
  isCustomHomeCleaning ||
  isCustomKitchenCleaning ||
  isCustomBathroomCleaning;
let serviceName: string;
let originalPrice: number;
let offerPrice: number;
let advanceAmount: number;

let trustedCustomServices: Array<{
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}> = [];

if (isCustomCleaning) {
 const customPlan = isCustomBathroomCleaning
  ? calculateCustomBathroomCleaningPlan(
      body.customServices,
    )
  : isCustomKitchenCleaning
    ? calculateCustomKitchenCleaningPlan(
        body.customServices,
      )
    : calculateCustomCleaningPlan(
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

  serviceName = isCustomBathroomCleaning
  ? "Custom Bathroom Cleaning Plan"
  : isCustomKitchenCleaning
    ? "Custom Kitchen Cleaning Plan"
    : "Customized Cleaning Plan";

  originalPrice = customPlan.total;
  offerPrice = customPlan.total;
  advanceAmount = customPlan.advanceAmount;
  trustedCustomServices = customPlan.services;
} else {
  const servicePackage = getServicePackage(packageId);

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

  serviceName = servicePackage.name;
  originalPrice = servicePackage.originalPrice;
  offerPrice = servicePackage.offerPrice;
  advanceAmount =
    calculateAdvanceAmount(servicePackage);
}

    const receipt = `cc_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const razorpay = getRazorpayClient();

    const order = await razorpay.orders.create({
      amount: advanceAmount * 100,
      currency: "INR",
      receipt,
           notes: {
        packageId,
        serviceName,
        paymentType: "50_percent_advance",
       customPlanType: isCustomBathroomCleaning
  ? "bathroom"
  : isCustomKitchenCleaning
    ? "kitchen"
    : isCustomHomeCleaning
      ? "home"
      : "fixed",
        customServiceIds: trustedCustomServices
  .map(
    (service) =>
      `${service.id}:${service.quantity}`,
  )
  .join("|"),
      },
    });

    return NextResponse.json(
      {
        success: true,
        keyId: getRazorpayKeyId(),
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
       serviceName,
originalPrice,
offerPrice,
        advanceAmount,
        customServices: trustedCustomServices,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Razorpay order creation error:", error);

    const message =
      error instanceof Error &&
      error.message.includes("not configured")
        ? "Online payment is not configured yet."
        : "Payment order could not be created.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: message.includes("not configured") ? 503 : 500,
      },
    );
  }
}
