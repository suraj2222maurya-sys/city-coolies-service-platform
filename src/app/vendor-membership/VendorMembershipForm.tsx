"use client";

import Image from "next/image";
import Script from "next/script";
import {
  type ChangeEvent,
  type FormEvent,
  useRef,
  useState,
} from "react";

type VendorType = "individual" | "company";

type LocationData = {
  latitude: number;
  longitude: number;
  accuracy: number;
  googleMapsUrl: string;
  embedUrl: string;
};

type PaymentPrefill = {
  name: string;
  email: string;
  contact: string;
};

type CreateVendorOrderResponse = {
  success?: boolean;
  message?: string;
  keyId?: string;
  orderId?: string;
  amount?: number | string;
  currency?: string;
  membershipPrice?: number;
  membershipDuration?: string;
};

type VerifyVendorPaymentResponse = {
  success?: boolean;
  verified?: boolean;
  message?: string;
  paymentId?: string;
  orderId?: string;
  paidAmount?: number;
  membershipDuration?: string;
};

type ServiceWork = {
  id: string;
  label: string;
};

type ServiceGroup = {
  id: string;
  name: string;
  works: readonly ServiceWork[];
};

const MEMBERSHIP_PRICE = 999;
const MEMBERSHIP_DURATION = "1 Year";

const SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    works: [
      { id: "deep-all", label: "All / Complete Deep Cleaning Work" },
      { id: "deep-home", label: "Full Home Deep Cleaning" },
      { id: "deep-kitchen", label: "Kitchen Deep Cleaning" },
      { id: "deep-bathroom", label: "Bathroom Deep Cleaning" },
      { id: "deep-office", label: "Office Cleaning" },
      { id: "deep-commercial", label: "Commercial Cleaning" },
      { id: "deep-industrial", label: "Industrial Cleaning" },
      { id: "deep-villa", label: "Villa Cleaning" },
      { id: "deep-sofa", label: "Sofa & Upholstery Cleaning" },
      { id: "deep-mattress", label: "Mattress Cleaning" },
      { id: "deep-water-tank", label: "Water Tank Cleaning" },
      { id: "deep-cobweb", label: "Cobweb Cleaning" },
      { id: "deep-other", label: "Other Deep Cleaning Work" },
    ],
  },
  {
    id: "renovation",
    name: "Renovation",
    works: [
      { id: "renovation-all", label: "All / Complete Renovation Work" },
      { id: "renovation-home", label: "Full Home Renovation" },
      { id: "renovation-apartment", label: "Apartment Renovation" },
      { id: "renovation-villa", label: "Villa Renovation" },
      { id: "renovation-kitchen", label: "Kitchen Renovation" },
      { id: "renovation-bathroom", label: "Bathroom Renovation" },
      { id: "renovation-office", label: "Office Renovation" },
      { id: "renovation-shop", label: "Shop / Commercial Renovation" },
      { id: "renovation-partial", label: "Partial Property Renovation" },
      { id: "renovation-turnkey", label: "Turnkey Renovation" },
      { id: "renovation-other", label: "Other Renovation Work" },
    ],
  },
  {
    id: "electrical",
    name: "Electrical Works",
    works: [
      { id: "electrical-all", label: "All / Complete Electrical Work" },
      { id: "electrical-wiring", label: "New Wiring & Rewiring" },
      { id: "electrical-switch", label: "Switch & Socket Work" },
      { id: "electrical-light", label: "Light Installation & Repair" },
      { id: "electrical-fan", label: "Fan Installation & Repair" },
      { id: "electrical-db", label: "MCB / DB / Fuse Work" },
      { id: "electrical-fault", label: "Electrical Fault & Short Circuit" },
      { id: "electrical-earthing", label: "Earthing Work" },
      { id: "electrical-inverter", label: "Inverter / UPS Work" },
      { id: "electrical-commercial", label: "Commercial Electrical Work" },
      { id: "electrical-ac-service", label: "AC Service" },
      { id: "electrical-other", label: "Other Electrical Work" },
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing Works",
    works: [
      { id: "plumbing-all", label: "All / Complete Plumbing Work" },
      { id: "plumbing-leak", label: "Water Leakage Repair" },
      { id: "plumbing-tap", label: "Tap & Fixture Work" },
      { id: "plumbing-toilet", label: "Toilet / WC Plumbing" },
      { id: "plumbing-sink", label: "Sink & Wash Basin Work" },
      { id: "plumbing-drain", label: "Drainage & Blockage Work" },
      { id: "plumbing-pipe", label: "Pipeline Installation & Repair" },
      { id: "plumbing-tank", label: "Water Tank Plumbing" },
      { id: "plumbing-pump", label: "Water Pump Work" },
      { id: "plumbing-bathroom", label: "Bathroom Plumbing" },
      { id: "plumbing-other", label: "Other Plumbing Work" },
    ],
  },
  {
    id: "painting",
    name: "Painting Services",
    works: [
      { id: "painting-all", label: "All / Complete Painting Work" },
      { id: "painting-interior", label: "Interior Painting" },
      { id: "painting-exterior", label: "Exterior Painting" },
      { id: "painting-texture", label: "Texture Painting" },
      { id: "painting-waterproof", label: "Waterproof Coating" },
      { id: "painting-wood", label: "Wood Painting / Polish" },
      { id: "painting-metal", label: "Metal Painting" },
      { id: "painting-commercial", label: "Commercial Painting" },
      { id: "painting-touchup", label: "Touch-up & Repainting" },
      { id: "painting-other", label: "Other Painting Work" },
    ],
  },
  {
    id: "civil",
    name: "Civil Construction & Maintenance",
    works: [
      { id: "civil-all", label: "All / Complete Civil Work" },
      { id: "civil-masonry", label: "Masonry Work" },
      { id: "civil-brick", label: "Brick / Block Work" },
      { id: "civil-plaster", label: "Plastering Work" },
      { id: "civil-concrete", label: "Concrete Work" },
      { id: "civil-floor", label: "Flooring Work" },
      { id: "civil-tiles", label: "Tile Work" },
      { id: "civil-waterproof", label: "Civil Waterproofing" },
      { id: "civil-repair", label: "Structural & Civil Repair" },
      { id: "civil-demolition", label: "Minor Demolition Work" },
      { id: "civil-other", label: "Other Civil Work" },
    ],
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    works: [
      { id: "appliance-all", label: "All / Complete Appliance Repair" },
      { id: "appliance-washing", label: "Washing Machine Repair" },
      { id: "appliance-fridge", label: "Refrigerator Repair" },
      { id: "appliance-microwave", label: "Microwave Repair" },
      { id: "appliance-dishwasher", label: "Dishwasher Repair" },
      { id: "appliance-geyser", label: "Geyser Repair" },
      { id: "appliance-chimney", label: "Kitchen Chimney Repair" },
      { id: "appliance-tv", label: "TV Repair" },
      { id: "appliance-water-purifier", label: "Water Purifier Repair" },
      { id: "appliance-other", label: "Other Appliance Repair" },
    ],
  },
  {
    id: "carpentry",
    name: "Carpentry & Interior Works",
    works: [
      { id: "carpentry-all", label: "All / Complete Carpentry & Interior Work" },
      { id: "carpentry-furniture", label: "Furniture Repair & Making" },
      { id: "carpentry-door", label: "Door Work" },
      { id: "carpentry-window", label: "Window Work" },
      { id: "carpentry-wardrobe", label: "Wardrobe Work" },
      { id: "carpentry-kitchen", label: "Modular Kitchen Work" },
      { id: "carpentry-cabinet", label: "Cabinet & Storage Work" },
      { id: "carpentry-partition", label: "Wooden Partition Work" },
      { id: "carpentry-interior", label: "Complete Interior Work" },
      { id: "carpentry-other", label: "Other Carpentry / Interior Work" },
    ],
  },
  {
    id: "packers",
    name: "Packers & Movers",
    works: [
      { id: "packers-all", label: "All / Complete Packers & Movers Work" },
      { id: "packers-home", label: "Home Shifting" },
      { id: "packers-office", label: "Office Shifting" },
      { id: "packers-local", label: "Local Shifting" },
      { id: "packers-intercity", label: "Intercity Shifting" },
      { id: "packers-packing", label: "Packing Service" },
      { id: "packers-unpacking", label: "Unpacking Service" },
      { id: "packers-loading", label: "Loading & Unloading" },
      { id: "packers-furniture", label: "Furniture Moving" },
      { id: "packers-other", label: "Other Moving Work" },
    ],
  },
  {
    id: "pest",
    name: "Pest Control",
    works: [
      { id: "pest-all", label: "All / Complete Pest Control Work" },
      { id: "pest-cockroach", label: "Cockroach Control" },
      { id: "pest-termite", label: "Termite Control" },
      { id: "pest-bedbug", label: "Bed Bug Control" },
      { id: "pest-mosquito", label: "Mosquito Control" },
      { id: "pest-rodent", label: "Rodent Control" },
      { id: "pest-ant", label: "Ant Control" },
      { id: "pest-general", label: "General Pest Control" },
      { id: "pest-commercial", label: "Commercial Pest Control" },
      { id: "pest-other", label: "Other Pest Control Work" },
    ],
  },
  {
    id: "spa-salon",
    name: "Spa & Salon Services",
    works: [
      { id: "spa-all", label: "All / Complete Spa & Salon Work" },
      { id: "spa-haircut", label: "Haircut & Hair Styling" },
      { id: "spa-facial", label: "Facial & Cleanup" },
      { id: "spa-waxing", label: "Waxing" },
      { id: "spa-manicure", label: "Manicure" },
      { id: "spa-pedicure", label: "Pedicure" },
      { id: "spa-hair-treatment", label: "Hair Treatment" },
      { id: "spa-makeup", label: "Makeup Service" },
      { id: "spa-relaxation", label: "Spa & Relaxation Service" },
      { id: "spa-other", label: "Other Spa / Salon Work" },
    ],
  },
  {
    id: "fabrication",
    name: "Fabrication Works",
    works: [
      { id: "fabrication-all", label: "All / Complete Fabrication Work" },
      { id: "fabrication-gate", label: "Gate Fabrication" },
      { id: "fabrication-grill", label: "Grill Fabrication" },
      { id: "fabrication-railing", label: "Railing Fabrication" },
      { id: "fabrication-shed", label: "Metal Shed Work" },
      { id: "fabrication-stair", label: "Metal Staircase Work" },
      { id: "fabrication-welding", label: "Welding Work" },
      { id: "fabrication-structure", label: "Metal Structure Work" },
      { id: "fabrication-repair", label: "Fabrication Repair Work" },
      { id: "fabrication-other", label: "Other Fabrication Work" },
    ],
  },
  {
    id: "gardening",
    name: "Gardening & Landscaping",
    works: [
      { id: "gardening-all", label: "All / Complete Gardening & Landscaping" },
      { id: "gardening-lawn", label: "Lawn Development & Care" },
      { id: "gardening-landscape", label: "Landscape Design" },
      { id: "gardening-plant", label: "Planting Work" },
      { id: "gardening-pruning", label: "Pruning & Trimming" },
      { id: "gardening-maintenance", label: "Garden Maintenance" },
      { id: "gardening-terrace", label: "Terrace Garden" },
      { id: "gardening-irrigation", label: "Garden Irrigation Work" },
      { id: "gardening-cleanup", label: "Garden Cleanup" },
      { id: "gardening-other", label: "Other Gardening / Landscaping Work" },
    ],
  },] as const;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

async function readJson<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!text) {
    throw new Error("Server returned an empty response.");
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Server returned an invalid response.");
  }
}

export default function VendorMembershipForm() {
  const [vendorType, setVendorType] =
    useState<VendorType>("individual");

  const [selectedWorks, setSelectedWorks] =
    useState<Set<string>>(new Set());

  const [location, setLocation] =
    useState<LocationData | null>(null);

  const [locationMessage, setLocationMessage] =
    useState("");

  const [profileFile, setProfileFile] =
    useState<File | null>(null);

  const [profilePreview, setProfilePreview] =
    useState("");

  const [companyDocument, setCompanyDocument] =
    useState<File | null>(null);

  const [formError, setFormError] =
    useState("");

  const [paymentOpen, setPaymentOpen] =
    useState(false);

  const [paymentStatus, setPaymentStatus] =
    useState<
      "idle" | "loading" | "success" | "error"
    >("idle");

  const [paymentMessage, setPaymentMessage] =
    useState("");

  const [paymentPrefill, setPaymentPrefill] =
    useState<PaymentPrefill>({
      name: "",
      email: "",
      contact: "",
    });

  const galleryInputRef =
    useRef<HTMLInputElement>(null);

  const cameraInputRef =
    useRef<HTMLInputElement>(null);

  const allSelectedLabels = SERVICE_GROUPS.flatMap(
    (group) => group.works,
  )
    .filter((work) => selectedWorks.has(work.id))
    .map((work) => work.label);

  function toggleWork(workId: string) {
    setSelectedWorks((current) => {
      const next = new Set(current);

      if (next.has(workId)) {
        next.delete(workId);
      } else {
        next.add(workId);
      }

      return next;
    });
  }

  function handleProfileFile(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFormError("Please select a valid profile image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError(
        "Profile image must be 5 MB or smaller.",
      );
      return;
    }

    setProfileFile(file);
    setFormError("");

    const reader = new FileReader();

    reader.onload = () => {
      setProfilePreview(
        typeof reader.result === "string"
          ? reader.result
          : "",
      );
    };

    reader.readAsDataURL(file);
  }

  function handleCompanyDocument(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      setCompanyDocument(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFormError(
        "Company document must be 10 MB or smaller.",
      );
      event.target.value = "";
      return;
    }

    setCompanyDocument(file);
    setFormError("");
  }

  function captureCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationMessage(
        "Your browser does not support location access.",
      );
      return;
    }

    setLocationMessage(
      "Getting your exact current location...",
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        const accuracy =
          position.coords.accuracy;

        setLocation({
          latitude,
          longitude,
          accuracy,
          googleMapsUrl:
            `https://www.google.com/maps?q=${latitude},${longitude}`,
          embedUrl:
            `https://www.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`,
        });

        setLocationMessage(
          "Exact Google Maps location added successfully.",
        );

        setFormError("");
      },
      () => {
        setLocation(null);
        setLocationMessage(
          "Location could not be captured. Please allow location permission and try again.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormError("");

    if (!location) {
      setFormError(
        "Please capture your Google Maps location before continuing.",
      );
      return;
    }

    if (!profileFile) {
      setFormError(
        "Please upload or capture your profile image.",
      );
      return;
    }

    if (selectedWorks.size === 0) {
      setFormError(
        "Please select at least one service or work you provide.",
      );
      return;
    }

    if (vendorType === "company") {
      const gstNumber = String(
        formData.get("gstNumber") ?? "",
      ).trim();

      const companyName = String(
        formData.get("companyName") ?? "",
      ).trim();

      if (!companyName) {
        setFormError(
          "Please enter your company or shop name.",
        );
        return;
      }

      if (!gstNumber) {
        setFormError(
          "GST number is required for Company / Shop registration.",
        );
        return;
      }

      if (!companyDocument) {
        setFormError(
          "Please upload your company or shop registration document.",
        );
        return;
      }
    }

    const bankName = String(
      formData.get("bankName") ?? "",
    ).trim();

    const accountNumber = String(
      formData.get("accountNumber") ?? "",
    ).trim();

    const ifscCode = String(
      formData.get("ifscCode") ?? "",
    ).trim();

    const upiId = String(
      formData.get("upiId") ?? "",
    ).trim();

    const hasCompleteBankDetails =
      Boolean(bankName) &&
      Boolean(accountNumber) &&
      Boolean(ifscCode);

    if (!hasCompleteBankDetails && !upiId) {
      setFormError(
        "Please provide complete bank details or a valid UPI ID.",
      );
      return;
    }

    setPaymentPrefill({
      name: String(
        formData.get("fullName") ?? "",
      ),
      email: String(
        formData.get("email") ?? "",
      ),
      contact: String(
        formData.get("mobile") ?? "",
      ),
    });

    setPaymentStatus("idle");
    setPaymentMessage("");
    setPaymentOpen(true);
  }

  async function startPayment() {
    try {
      setPaymentStatus("loading");
      setPaymentMessage(
        "Creating your secure membership payment...",
      );

      if (!window.Razorpay) {
        throw new Error(
          "Payment window is still loading. Please wait a moment and try again.",
        );
      }

      const orderResponse = await fetch(
        "/api/vendor-membership/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            membershipPlan: "vendor-annual-999",
          }),
        },
      );

      const orderResult =
        await readJson<CreateVendorOrderResponse>(
          orderResponse,
        );

      if (
        !orderResponse.ok ||
        !orderResult.success ||
        !orderResult.keyId ||
        !orderResult.orderId ||
        !orderResult.amount ||
        !orderResult.currency
      ) {
        throw new Error(
          orderResult.message ||
            "Membership payment could not be started.",
        );
      }

      const checkout = new window.Razorpay({
        key: orderResult.keyId,
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: "City Coolies",
        description:
          "Vendor Membership - 1 Year",
        order_id: orderResult.orderId,
        prefill: {
          name: paymentPrefill.name,
          email: paymentPrefill.email,
          contact: paymentPrefill.contact,
        },
        notes: {
          membershipPlan:
            "vendor-annual-999",
          membershipDuration:
            MEMBERSHIP_DURATION,
        },
        theme: {
          color: "#ef1b23",
          backdrop_color: "#fff5f6",
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
        modal: {
          confirm_close: true,
          escape: true,
          animation: true,
          ondismiss: () => {
            setPaymentStatus("idle");
            setPaymentMessage(
              "Payment was not completed. You can try again.",
            );
          },
        },
        handler: async (
          response: RazorpaySuccessResponse,
        ) => {
          try {
            setPaymentStatus("loading");
            setPaymentMessage(
              "Verifying your membership payment...",
            );

            const verifyResponse = await fetch(
              "/api/vendor-membership/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  razorpayOrderId:
                    response.razorpay_order_id,
                  razorpayPaymentId:
                    response.razorpay_payment_id,
                  razorpaySignature:
                    response.razorpay_signature,
                }),
              },
            );

            const verifyResult =
              await readJson<VerifyVendorPaymentResponse>(
                verifyResponse,
              );

            if (
              !verifyResponse.ok ||
              !verifyResult.success ||
              !verifyResult.verified
            ) {
              throw new Error(
                verifyResult.message ||
                  "Payment verification failed.",
              );
            }

            setPaymentStatus("success");
            setPaymentMessage(
              `Payment verified successfully. ${formatCurrency(
                MEMBERSHIP_PRICE,
              )} membership payment received for ${MEMBERSHIP_DURATION}.`,
            );
          } catch (error) {
            setPaymentStatus("error");
            setPaymentMessage(
              error instanceof Error
                ? error.message
                : "Payment verification failed.",
            );
          }
        },
      });

      checkout.on(
        "payment.failed",
        (
          failure: RazorpayFailureResponse,
        ) => {
          setPaymentStatus("error");
          setPaymentMessage(
            failure.error.description ||
              "Payment failed. Please try another payment method.",
          );
        },
      );

      checkout.open();

      setPaymentStatus("idle");
      setPaymentMessage("");
    } catch (error) {
      setPaymentStatus("error");
      setPaymentMessage(
        error instanceof Error
          ? error.message
          : "Membership payment could not be started.",
      );
    }
  }

  return (
    <>
      <Script
        id="razorpay-vendor-checkout"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-[#fffafa] text-[#191919]">
                <section className="relative overflow-hidden border-b border-red-100 bg-[#fff4f5]">
          <Image
            src="/vendor-membership-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none absolute inset-0 h-full w-full object-fill"
          />

          <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(255,247,248,0.98)_0%,rgba(255,247,248,0.92)_28%,rgba(255,247,248,0.72)_42%,rgba(255,247,248,0.30)_54%,rgba(255,247,248,0.06)_68%,rgba(255,247,248,0)_78%)]" />
<div className="mx-auto flex min-h-[310px] max-w-[1480px] items-center px-5 py-10 sm:px-8 lg:px-10">
            <div className="relative z-10 max-w-[620px]">
              <p className="mb-3 text-xs font-black tracking-[0.18em] text-[#ef1b23] uppercase">
                City Coolies Vendor Network
              </p>

              <h1 className="text-[34px] font-black tracking-[-0.04em] text-[#171717] sm:text-[46px] lg:text-[54px]">
                Vendor{" "}
                <span className="text-[#ef1b23]">
                  Registration
                </span>
              </h1>

              <p className="mt-4 max-w-[570px] text-sm leading-7 text-neutral-600 sm:text-base">
                Join City Coolies as a trusted vendor
                partner and grow your service business
                with professional opportunities.
              </p>

              <div className="mt-7 grid max-w-[620px] gap-3 sm:grid-cols-3">
                {[
                  [
                    "✓",
                    "Verified & Trusted",
                    "Professional network",
                  ],
                  [
                    "↗",
                    "More Work",
                    "Grow your opportunities",
                  ],
                  [
                    "₹",
                    "Secure Payments",
                    "Safe payment process",
                  ],
                ].map(([icon, title, text]) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-2xl border border-red-100 bg-white/90 p-4 shadow-[0_12px_35px_-25px_rgba(239,27,35,0.55)] backdrop-blur"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-50 font-black text-[#ef1b23]">
                      {icon}
                    </span>

                    <span>
                      <strong className="block text-xs font-black text-neutral-900">
                        {title}
                      </strong>
                      <small className="mt-1 block text-[10px] text-neutral-500">
                        {text}
                      </small>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1480px] gap-7 px-4 py-9 sm:px-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-10">
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-[26px] border border-red-100 bg-white shadow-[0_24px_70px_-45px_rgba(95,20,29,0.28)]"
          >
            <div className="border-b border-red-100 bg-gradient-to-r from-red-50/80 to-white px-5 py-5 sm:px-7">
              <h2 className="text-xl font-black tracking-[-0.025em]">
                Vendor Registration Form
              </h2>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Fill your details carefully. Fields
                marked with * are required.
              </p>
            </div>

            <div className="space-y-8 p-5 sm:p-7">
              {/* PERSONAL INFORMATION */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ef1b23] text-xs font-black text-white">
                    1
                  </span>
                  <h3 className="text-base font-black">
                    Personal Information
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    Full Name *
                    <input
                      required
                      name="fullName"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none transition focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>

                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    Date of Birth *
                    <input
                      required
                      name="dateOfBirth"
                      type="date"
                      min="1968-01-01"
                      max="2050-12-31"
                      className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none transition focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>

                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    Gender *
                    <select
                      required
                      name="gender"
                      defaultValue=""
                      className="h-12 rounded-xl border border-neutral-200 bg-white px-4 font-normal outline-none transition focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="male">
                        Male
                      </option>
                      <option value="female">
                        Female
                      </option>
                      <option value="other">
                        Other
                      </option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    Mobile Number *
                    <input
                      required
                      name="mobile"
                      inputMode="numeric"
                      autoComplete="tel"
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      placeholder="10 digit mobile number"
                      className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none transition focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>

                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    WhatsApp Number *
                    <input
                      required
                      name="whatsapp"
                      inputMode="numeric"
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      placeholder="WhatsApp number"
                      className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none transition focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>

                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    Email / Gmail *
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter email address"
                      className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none transition focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>
                </div>
              </section>

              <div className="h-px bg-red-100" />

              {/* IDENTITY */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ef1b23] text-xs font-black text-white">
                    2
                  </span>
                  <h3 className="text-base font-black">
                    Identity Information
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    PAN Number *
                    <input
                      required
                      name="panNumber"
                      maxLength={10}
                      pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"
                      placeholder="ABCDE1234F"
                      className="h-12 rounded-xl border border-neutral-200 px-4 uppercase font-normal outline-none transition focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>

                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    Aadhaar Number *
                    <input
                      required
                      name="aadhaarNumber"
                      inputMode="numeric"
                      maxLength={12}
                      pattern="[0-9]{12}"
                      placeholder="12 digit Aadhaar number"
                      className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none transition focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>
                </div>
              </section>

              <div className="h-px bg-red-100" />

              {/* ADDRESS */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ef1b23] text-xs font-black text-white">
                    3
                  </span>
                  <div>
                    <h3 className="text-base font-black">
                      Address & Google Location
                    </h3>
                    <p className="mt-1 text-[11px] text-neutral-500">
                      Enter your address and capture
                      your exact current map location.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-xs font-bold text-neutral-700">
                      House / Flat / Shop No. *
                      <input
                        required
                        name="houseNumber"
                        autoComplete="address-line1"
                        placeholder="House, flat or shop number"
                        className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                      />
                    </label>

                    <label className="grid gap-2 text-xs font-bold text-neutral-700">
                      Building / Street / Road *
                      <input
                        required
                        name="street"
                        autoComplete="address-line2"
                        placeholder="Building, street or road"
                        className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-xs font-bold text-neutral-700">
                      Area / Locality *
                      <input
                        required
                        name="area"
                        placeholder="Area or locality"
                        className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                      />
                    </label>

                    <label className="grid gap-2 text-xs font-bold text-neutral-700">
                      Landmark
                      <input
                        name="landmark"
                        placeholder="Nearby landmark"
                        className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="grid gap-2 text-xs font-bold text-neutral-700">
                      City *
                      <input
                        required
                        name="city"
                        autoComplete="address-level2"
                        placeholder="City"
                        className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                      />
                    </label>

                    <label className="grid gap-2 text-xs font-bold text-neutral-700">
                      State *
                      <input
                        required
                        name="state"
                        autoComplete="address-level1"
                        placeholder="State"
                        className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                      />
                    </label>

                    <label className="grid gap-2 text-xs font-bold text-neutral-700">
                      PIN Code *
                      <input
                        required
                        name="pinCode"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        maxLength={6}
                        pattern="[0-9]{6}"
                        placeholder="6 digit PIN code"
                        className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                      />
                    </label>
                  </div>

                  <fieldset>
                    <legend className="mb-2 text-xs font-bold text-neutral-700">
                      Address Type *
                    </legend>

                    <div className="flex flex-wrap gap-3">
                      {["Home", "Shop / Office", "Other"].map(
                        (type, index) => (
                          <label
                            key={type}
                            className="cursor-pointer"
                          >
                            <input
                              required
                              className="peer sr-only"
                              type="radio"
                              name="addressType"
                              value={type}
                              defaultChecked={
                                index === 0
                              }
                            />
                            <span className="inline-flex min-h-10 items-center rounded-xl border border-neutral-200 bg-white px-4 text-xs font-bold text-neutral-600 transition peer-checked:border-[#ef1b23] peer-checked:bg-red-50 peer-checked:text-[#ef1b23]">
                              {type}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </fieldset>

                  <div className="rounded-2xl border border-red-100 bg-[#fffafb] p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <strong className="text-sm">
                          Exact Google Maps Location *
                        </strong>
                        <p className="mt-1 text-xs leading-5 text-neutral-500">
                          Use your device GPS to attach
                          the vendor&apos;s exact map pin.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={captureCurrentLocation}
                        className="min-h-11 shrink-0 rounded-xl bg-[#ef1b23] px-5 text-xs font-black text-white shadow-lg shadow-red-200/60 transition hover:-translate-y-0.5"
                      >
                        📍 Use My Current Location
                      </button>
                    </div>

                    {locationMessage && (
                      <p className="mt-3 text-xs font-semibold text-neutral-600">
                        {locationMessage}
                      </p>
                    )}

                    {location && (
                      <div className="mt-4 overflow-hidden rounded-2xl border border-red-100 bg-white">
                        <iframe
                          title="Vendor Google Maps location"
                          src={location.embedUrl}
                          className="h-[260px] w-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />

                        <div className="flex flex-col gap-2 border-t border-red-100 p-3 text-[11px] text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
                          <span>
                            Lat:{" "}
                            {location.latitude.toFixed(
                              6,
                            )}{" "}
                            | Lng:{" "}
                            {location.longitude.toFixed(
                              6,
                            )}
                          </span>

                          <a
                            href={
                              location.googleMapsUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="font-black text-[#ef1b23]"
                          >
                            Open exact location ↗
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <div className="h-px bg-red-100" />

              {/* PROFILE IMAGE */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ef1b23] text-xs font-black text-white">
                    4
                  </span>
                  <h3 className="text-base font-black">
                    Vendor Profile Image
                  </h3>
                </div>

                <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
                  <div className="grid min-h-[180px] place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-red-200 bg-red-50/50">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Vendor profile preview"
                        className="h-[180px] w-full object-cover"
                      />
                    ) : (
                      <div className="p-5 text-center">
                        <span className="text-4xl">
                          👤
                        </span>
                        <p className="mt-2 text-xs font-bold text-neutral-600">
                          Profile photo preview
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid content-center gap-3">
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileFile}
                    />

                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleProfileFile}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        if (
                          galleryInputRef.current
                        ) {
                          galleryInputRef.current.value =
                            "";
                          galleryInputRef.current.click();
                        }
                      }}
                      className="min-h-12 rounded-xl border border-[#ef1b23] bg-white px-5 text-xs font-black text-[#ef1b23] transition hover:bg-red-50"
                    >
                      🖼 Choose From Gallery
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (
                          cameraInputRef.current
                        ) {
                          cameraInputRef.current.value =
                            "";
                          cameraInputRef.current.click();
                        }
                      }}
                      className="min-h-12 rounded-xl bg-[#ef1b23] px-5 text-xs font-black text-white shadow-lg shadow-red-200/50"
                    >
                      📷 Capture From Camera
                    </button>

                    <p className="text-[11px] leading-5 text-neutral-500">
                      JPG, PNG or supported image
                      format. Maximum size 5 MB.
                    </p>

                    {profileFile && (
                      <p className="text-xs font-bold text-green-700">
                        ✓ {profileFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <div className="h-px bg-red-100" />

              {/* VENDOR TYPE */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ef1b23] text-xs font-black text-white">
                    5
                  </span>
                  <h3 className="text-base font-black">
                    Vendor Type
                  </h3>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="vendorType"
                      value="individual"
                      checked={
                        vendorType === "individual"
                      }
                      onChange={() => {
                        setVendorType("individual");
                        setCompanyDocument(null);
                      }}
                      className="peer sr-only"
                    />

                    <span className="flex min-h-[96px] items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition peer-checked:border-[#ef1b23] peer-checked:bg-red-50/70 peer-checked:shadow-[0_10px_30px_-22px_rgba(239,27,35,0.8)]">
                      <span className="text-2xl">
                        👤
                      </span>

                      <span>
                        <strong className="block text-sm">
                          Individual
                        </strong>
                        <small className="mt-1 block text-xs text-neutral-500">
                          I work independently
                        </small>
                      </span>
                    </span>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="vendorType"
                      value="company"
                      checked={
                        vendorType === "company"
                      }
                      onChange={() =>
                        setVendorType("company")
                      }
                      className="peer sr-only"
                    />

                    <span className="flex min-h-[96px] items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition peer-checked:border-[#ef1b23] peer-checked:bg-red-50/70 peer-checked:shadow-[0_10px_30px_-22px_rgba(239,27,35,0.8)]">
                      <span className="text-2xl">
                        🏢
                      </span>

                      <span>
                        <strong className="block text-sm">
                          Company / Shop
                        </strong>
                        <small className="mt-1 block text-xs text-neutral-500">
                          I represent a company or shop
                        </small>
                      </span>
                    </span>
                  </label>
                </div>

                {vendorType === "individual" ? (
                  <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-semibold leading-5 text-green-700">
                    ✓ Individual vendors do not need
                    to provide GST number or company
                    registration documents.
                  </div>
                ) : (
                  <div className="mt-5 grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-2 text-xs font-bold text-neutral-700">
                        Company / Shop Name *
                        <input
                          required
                          name="companyName"
                          placeholder="Enter registered business name"
                          className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                        />
                      </label>

                      <label className="grid gap-2 text-xs font-bold text-neutral-700">
                        GST Number *
                        <input
                          required
                          name="gstNumber"
                          maxLength={15}
                          placeholder="Enter GST number"
                          className="h-12 rounded-xl border border-neutral-200 px-4 uppercase font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                        />
                      </label>
                    </div>

                    <label className="grid cursor-pointer gap-2 rounded-2xl border-2 border-dashed border-red-200 bg-red-50/40 p-5 text-center">
                      <span className="text-2xl">
                        📄
                      </span>

                      <strong className="text-sm">
                        Upload Company / Shop
                        Registration Document *
                      </strong>

                      <span className="text-xs font-normal text-neutral-500">
                        PDF, JPG or PNG — Maximum 10
                        MB
                      </span>

                      <input
                        type="file"
                        accept=".pdf,image/png,image/jpeg,image/webp"
                        className="mt-3 block w-full text-xs"
                        onChange={
                          handleCompanyDocument
                        }
                      />

                      {companyDocument && (
                        <span className="font-bold text-green-700">
                          ✓ {companyDocument.name}
                        </span>
                      )}
                    </label>
                  </div>
                )}
              </section>

              <div className="h-px bg-red-100" />

              {/* SERVICES */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ef1b23] text-xs font-black text-white">
                    6
                  </span>

                  <div>
                    <h3 className="text-base font-black">
                      Services You Provide
                    </h3>
                    <p className="mt-1 text-[11px] text-neutral-500">
                      Select all service categories
                      and work you can perform.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-neutral-50/40 p-3">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-3">
                    <span className="text-xs font-black text-neutral-700">
                      Selected Work
                    </span>
                    <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-black text-[#ef1b23]">
                      {selectedWorks.size} selected
                    </span>
                  </div>

                  {allSelectedLabels.length > 0 && (
                    <div className="mb-4 flex max-h-[130px] flex-wrap gap-2 overflow-y-auto rounded-xl bg-white p-3">
                      {allSelectedLabels.map(
                        (label) => (
                          <span
                            key={label}
                            className="rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[10px] font-bold text-[#d81821]"
                          >
                            {label}
                          </span>
                        ),
                      )}
                    </div>
                  )}

                  <div className="grid gap-2">
                    {SERVICE_GROUPS.map(
                      (group) => (
                        <details
                          key={group.id}
                          className="group overflow-hidden rounded-xl border border-neutral-200 bg-white"
                        >
                          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 text-xs font-black text-neutral-800">
                            <span>
                              {group.name}
                            </span>

                            <span className="text-lg text-[#ef1b23] transition group-open:rotate-45">
                              +
                            </span>
                          </summary>

                          <div className="grid gap-2 border-t border-neutral-100 bg-[#fffafa] p-3 sm:grid-cols-2">
                            {group.works.map(
                              (work) => (
                                <label
                                  key={work.id}
                                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-transparent bg-white p-3 text-[11px] font-semibold text-neutral-700 transition hover:border-red-100"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedWorks.has(
                                      work.id,
                                    )}
                                    onChange={() =>
                                      toggleWork(
                                        work.id,
                                      )
                                    }
                                    className="mt-0.5 h-4 w-4 accent-[#ef1b23]"
                                  />

                                  <span>
                                    {work.label}
                                  </span>
                                </label>
                              ),
                            )}
                          </div>
                        </details>
                      ),
                    )}
                  </div>
                </div>
              </section>

              <div className="h-px bg-red-100" />

              {/* PAYOUT DETAILS */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ef1b23] text-xs font-black text-white">
                    7
                  </span>

                  <div>
                    <h3 className="text-base font-black">
                      Bank / Payout Details
                    </h3>
                    <p className="mt-1 text-[11px] text-neutral-500">
                      Provide complete bank details or
                      your UPI ID.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    Bank Name
                    <input
                      name="bankName"
                      placeholder="Enter bank name"
                      className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>

                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    Account Number
                    <input
                      name="accountNumber"
                      inputMode="numeric"
                      placeholder="Enter account number"
                      className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>

                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    IFSC Code
                    <input
                      name="ifscCode"
                      maxLength={11}
                      pattern="[A-Za-z]{4}0[A-Za-z0-9]{6}"
                      placeholder="Example: SBIN0001234"
                      className="h-12 rounded-xl border border-neutral-200 px-4 uppercase font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>

                  <label className="grid gap-2 text-xs font-bold text-neutral-700">
                    UPI ID
                    <input
                      name="upiId"
                      placeholder="Example: name@upi"
                      className="h-12 rounded-xl border border-neutral-200 px-4 font-normal outline-none focus:border-[#ef1b23] focus:ring-4 focus:ring-red-50"
                    />
                  </label>
                </div>
              </section>

              <label className="flex items-start gap-3 text-xs leading-5 text-neutral-600">
                <input
                  required
                  type="checkbox"
                  name="agreementConsent"
                  className="mt-1 h-4 w-4 shrink-0 accent-[#ef1b23]"
                />

                <span>
                  I confirm that the information
                  provided is correct and I agree to
                  the City Coolies vendor membership
                  verification and membership terms.
                </span>
              </label>

              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold leading-5 text-red-700">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[linear-gradient(135deg,#ff2731_0%,#df1119_100%)] px-6 text-sm font-black tracking-[0.02em] text-white shadow-[0_18px_35px_-16px_rgba(239,27,35,0.75)] transition hover:-translate-y-0.5"
              >
                Submit Registration
                <span aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </form>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5 lg:sticky lg:top-[155px] lg:self-start">
            <div className="rounded-[24px] border border-red-100 bg-white p-6 shadow-[0_20px_55px_-38px_rgba(95,20,29,0.32)]">
              <h3 className="text-lg font-black text-[#ef1b23]">
                How It Works
              </h3>

              <div className="mt-6 space-y-6">
                {[
                  [
                    "1",
                    "Fill Registration Form",
                    "Enter your complete vendor details.",
                  ],
                  [
                    "2",
                    "Make Payment",
                    "Pay ₹999 for the 1 year membership.",
                  ],
                  [
                    "3",
                    "Verification",
                    "Your details and documents will be verified.",
                  ],
                  [
                    "4",
                    "Get Membership",
                    "Receive confirmation and vendor membership.",
                  ],
                ].map(
                  ([number, title, text]) => (
                    <div
                      key={number}
                      className="flex gap-4"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-50 text-xs font-black text-[#ef1b23]">
                        {number}
                      </span>

                      <div>
                        <strong className="block text-xs">
                          {title}
                        </strong>
                        <p className="mt-1 text-[11px] leading-5 text-neutral-500">
                          {text}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-[24px] border border-red-100 bg-gradient-to-br from-[#fff5f6] to-white p-6">
              <p className="text-xs font-black text-[#ef1b23]">
                MEMBERSHIP PLAN
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                ₹999
              </h3>

              <p className="mt-1 text-xs font-bold text-neutral-500">
                Valid for 1 Year
              </p>

              <div className="mt-5 space-y-3 text-xs text-neutral-600">
                <p>✓ Vendor membership</p>
                <p>✓ Service partner profile</p>
                <p>✓ Professional opportunities</p>
                <p>✓ Secure payment process</p>
                <p>✓ Registration verification</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-red-100 bg-white p-6">
              <h3 className="text-sm font-black">
                Need Help?
              </h3>

              <p className="mt-2 text-xs leading-5 text-neutral-500">
                Our support team is here to help with
                vendor registration.
              </p>

              <div className="mt-4 space-y-3 text-xs font-bold">
                <a
                  href="tel:+918693986939"
                  className="block text-[#ef1b23]"
                >
                  ☎ +91 86939 86939
                </a>

                <a
                  href="mailto:citycoolicescrm@gmail.com"
                  className="block break-all text-[#ef1b23]"
                >
                  ✉ citycoolicescrm@gmail.com
                </a>
              </div>
            </div>
          </aside>
        </section>

        <section className="border-y border-red-100 bg-[#fff3f4]">
          <div className="mx-auto grid max-w-[1480px] gap-4 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
            {[
              [
                "🛡",
                "Trusted Platform",
                "Professional vendor network",
              ],
              [
                "🔒",
                "Secure Payments",
                "Protected transactions",
              ],
              [
                "🎧",
                "Support",
                "Registration assistance",
              ],
              [
                "📈",
                "Grow Your Business",
                "More service opportunities",
              ],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-xl bg-white/60 p-4"
              >
                <span className="text-xl">
                  {icon}
                </span>
                <span>
                  <strong className="block text-xs">
                    {title}
                  </strong>
                  <small className="mt-1 block text-[10px] text-neutral-500">
                    {text}
                  </small>
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* PAYMENT MODAL */}
      {paymentOpen && (
        <div className="fixed inset-0 z-[9999] grid place-items-center overflow-y-auto bg-black/55 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] bg-white shadow-2xl">
            <div className="bg-gradient-to-r from-[#ef1b23] to-[#d91018] px-6 py-6 text-white">
              <p className="text-[11px] font-black tracking-[0.14em] uppercase text-white/80">
                City Coolies
              </p>

              <h2 className="mt-1 text-2xl font-black">
                Vendor Membership Payment
              </h2>

              <p className="mt-2 text-xs text-white/85">
                Complete your annual membership
                payment securely.
              </p>
            </div>

            <div className="p-6">
              <div className="rounded-2xl border border-red-100 bg-red-50/60 p-5">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold text-neutral-500">
                      1 Year Membership
                    </p>
                    <strong className="mt-1 block text-3xl font-black text-[#ef1b23]">
                      ₹999
                    </strong>
                  </div>

                  <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-green-700 shadow-sm">
                    Annual Plan
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs font-black text-neutral-700">
                  Payment Options
                </p>

                <div className="mt-3 grid grid-cols-2 gap-3 text-center text-[11px] font-bold text-neutral-600 sm:grid-cols-4">
                  <div className="rounded-xl border border-neutral-200 p-3">
                    💳
                    <span className="mt-1 block">
                      Credit Card
                    </span>
                  </div>

                  <div className="rounded-xl border border-neutral-200 p-3">
                    💳
                    <span className="mt-1 block">
                      Debit Card
                    </span>
                  </div>

                  <div className="rounded-xl border border-neutral-200 p-3">
                    📱
                    <span className="mt-1 block">
                      UPI
                    </span>
                  </div>

                  <div className="rounded-xl border border-neutral-200 p-3">
                    🏦
                    <span className="mt-1 block">
                      Net Banking
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-center text-[10px] leading-4 text-neutral-500">
                  UPI can include supported apps such
                  as Google Pay, PhonePe and Paytm
                  through the payment gateway.
                </p>
              </div>

              {paymentMessage && (
                <div
                  className={`mt-5 rounded-xl px-4 py-3 text-xs font-bold leading-5 ${
                    paymentStatus === "success"
                      ? "bg-green-50 text-green-700"
                      : paymentStatus === "error"
                        ? "bg-red-50 text-red-700"
                        : "bg-neutral-50 text-neutral-600"
                  }`}
                >
                  {paymentMessage}
                </div>
              )}

              {paymentStatus !== "success" && (
                <button
                  type="button"
                  disabled={
                    paymentStatus === "loading"
                  }
                  onClick={startPayment}
                  className="mt-5 min-h-13 w-full rounded-xl bg-[#ef1b23] px-5 text-sm font-black text-white shadow-lg shadow-red-200/60 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {paymentStatus === "loading"
                    ? "Please Wait..."
                    : "Pay ₹999 Securely"}
                </button>
              )}

              <button
                type="button"
                disabled={
                  paymentStatus === "loading"
                }
                onClick={() =>
                  setPaymentOpen(false)
                }
                className="mt-3 min-h-11 w-full rounded-xl border border-neutral-200 bg-white text-xs font-black text-neutral-600 disabled:opacity-50"
              >
                {paymentStatus === "success"
                  ? "Close"
                  : "Back to Registration"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}






