import { NextResponse } from "next/server";

import {
  getRazorpayClient,
  getRazorpayKeyId,
} from "@/lib/payments/razorpay";

import {
  calculateAdvanceAmount,
  calculateCustomBathroomCleaningPlan,
  calculateCustomCleaningPlan,
  calculateCustomKitchenCleaningPlan,
  getServicePackage,
} from "@/lib/services/serviceCatalog";

import { calculateCobwebCleaningPlan } from "@/lib/services/cobwebCleaningCatalog";
import { calculateCommercialCleaningPlan } from "@/lib/services/commercialCleaningCatalog";
import { calculateIndustrialCleaningPlan } from "@/lib/services/industrialCleaningCatalog";
import { calculateOfficeCleaningPlan } from "@/lib/services/officeCleaningCatalog";
import { calculateVillaCleaningPlan } from "@/lib/services/villaCleaningCatalog";
import { calculateUpholsteryCleaningPlan } from "@/lib/services/upholsteryCleaningCatalog";
import { calculateWaterTankCleaningPlan } from "@/lib/services/waterTankCleaningCatalog";

type CreateOrderRequest = {
  packageId?: string;
  customServices?: unknown;
};

type TrustedService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
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

    const isIndustrialCleaningPlan =
      packageId === "industrial-cleaning-plan";

    const isCommercialCleaningPlan =
      packageId === "commercial-cleaning-plan";

    const isCobwebCleaningPlan =
  packageId === "cobweb-cleaning-plan";

const isOfficeCleaningPlan =
  packageId === "office-cleaning-plan";

const isVillaCleaningPlan =
  packageId === "villa-cleaning-plan";

const isUpholsteryCleaningPlan =
packageId === "upholstery-cleaning-plan";

const isWaterTankCleaningPlan =
packageId === "water-tank-cleaning-plan";

    const isDynamicPlan =
      isCustomHomeCleaning ||
      isCustomKitchenCleaning ||
      isCustomBathroomCleaning ||
      isIndustrialCleaningPlan ||
          isCommercialCleaningPlan ||
    isCobwebCleaningPlan ||
    isOfficeCleaningPlan ||
    isVillaCleaningPlan ||
isUpholsteryCleaningPlan ||
isWaterTankCleaningPlan;

    let serviceName: string;
    let originalPrice: number;
    let offerPrice: number;
    let advanceAmount: number;
    let trustedCustomServices: TrustedService[] = [];

    if (isDynamicPlan) {
      const customPlan = isWaterTankCleaningPlan
? calculateWaterTankCleaningPlan(body.customServices)
: isUpholsteryCleaningPlan
? calculateUpholsteryCleaningPlan(body.customServices)
    : isVillaCleaningPlan
    ? calculateVillaCleaningPlan(body.customServices)
    : isOfficeCleaningPlan
    ? calculateOfficeCleaningPlan(body.customServices)
    : isCobwebCleaningPlan
    ? calculateCobwebCleaningPlan(body.customServices)
        : isCommercialCleaningPlan
          ? calculateCommercialCleaningPlan(body.customServices)
        : isIndustrialCleaningPlan
          ? calculateIndustrialCleaningPlan(body.customServices)
          : isCustomBathroomCleaning
            ? calculateCustomBathroomCleaningPlan(body.customServices)
            : isCustomKitchenCleaning
              ? calculateCustomKitchenCleaningPlan(body.customServices)
              : calculateCustomCleaningPlan(body.customServices);

      if (!customPlan) {
        const message = isWaterTankCleaningPlan
  ? "Please select a valid tank capacity and quantity."
  : isUpholsteryCleaningPlan
  ? "Please select valid upholstery-cleaning quantities."
      : isVillaCleaningPlan
      ? "Please enter a valid villa cleaning area."
      : isOfficeCleaningPlan
      ? "Please enter a valid office cleaning area."
      : isCobwebCleaningPlan
      ? "Please enter a valid cobweb cleaning quantity."
          : isCommercialCleaningPlan
            ? "Please enter a valid commercial cleaning area."
          : isIndustrialCleaningPlan
            ? "Please enter a valid industrial service quantity."
            : isCustomBathroomCleaning
              ? "Please select at least one valid bathroom-cleaning service."
              : isCustomKitchenCleaning
                ? "Please select at least one valid kitchen-cleaning service."
                : "Please select at least one valid cleaning service.";

        return NextResponse.json(
          {
            success: false,
            message,
          },
          { status: 400 },
        );
      }

      serviceName = isWaterTankCleaningPlan
? "Water Tank Cleaning Plan"
: isUpholsteryCleaningPlan
? "Mattress & Sofa Cleaning Plan"
    : isVillaCleaningPlan
    ? "Villa Cleaning Plan"
    : isOfficeCleaningPlan
    ? "Office Cleaning Plan"
    : isCobwebCleaningPlan
    ? "Cobweb Cleaning Plan"
        : isCommercialCleaningPlan
          ? "Commercial Cleaning Plan"
        : isIndustrialCleaningPlan
          ? "Industrial Cleaning Plan"
          : isCustomBathroomCleaning
            ? "Custom Bathroom Cleaning Plan"
            : isCustomKitchenCleaning
              ? "Custom Kitchen Cleaning Plan"
              : "Customized Cleaning Plan";

      originalPrice = customPlan.total;
      offerPrice = customPlan.total;
      advanceAmount = customPlan.advanceAmount;
      trustedCustomServices = [...customPlan.services];
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

    if (
      !Number.isSafeInteger(advanceAmount) ||
      advanceAmount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid payment amount is required.",
        },
        { status: 400 },
      );
    }

    const receipt = `cc_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    const customPlanType = isWaterTankCleaningPlan
? "water-tank"
: isUpholsteryCleaningPlan
  ? "upholstery"
  : isVillaCleaningPlan
  ? "villa"
  : isOfficeCleaningPlan
  ? "office"
  : isCobwebCleaningPlan
  ? "cobweb"
      : isCommercialCleaningPlan
        ? "commercial"
      : isIndustrialCleaningPlan
        ? "industrial"
        : isCustomBathroomCleaning
          ? "bathroom"
          : isCustomKitchenCleaning
            ? "kitchen"
            : isCustomHomeCleaning
              ? "home"
              : "fixed";

    const customServiceIds = trustedCustomServices
      .map(
        (service) =>
          `${service.id}:${service.quantity}`,
      )
      .join("|");

    const razorpay = getRazorpayClient();

    const order = await razorpay.orders.create({
      amount: advanceAmount * 100,
      currency: "INR",
      receipt,
      notes: {
        packageId,
        serviceName,
        paymentType: "50_percent_advance",
        customPlanType,
        customServiceIds,
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
    console.error(
      "Razorpay order creation error:",
      error,
    );

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
        status: message.includes("not configured")
          ? 503
          : 500,
      },
    );
  }
}

