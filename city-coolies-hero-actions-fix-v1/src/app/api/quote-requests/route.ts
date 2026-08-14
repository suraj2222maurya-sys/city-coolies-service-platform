import { NextResponse } from "next/server";

type QuoteRequest = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  city?: unknown;
  pinCode?: unknown;
  address?: unknown;
  details?: unknown;
};

function clean(value: unknown, maximum: number): string {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuoteRequest;
    const fullName = clean(body.fullName, 100);
    const phone = clean(body.phone, 20).replace(/\D/g, "");
    const email = clean(body.email, 160);
    const service = clean(body.service, 120);
    const city = clean(body.city, 100);
    const pinCode = clean(body.pinCode, 10).replace(/\D/g, "");
    const address = clean(body.address, 500);
    const details = clean(body.details, 1200);

    if (!fullName || !/^\d{10}$/.test(phone) || !/^\S+@\S+\.\S+$/.test(email) || !service || !city || !/^\d{6}$/.test(pinCode) || !address || !details) {
      return NextResponse.json({ success: false, message: "Please enter all required details correctly." }, { status: 400 });
    }

    const reference = `CCQ-${Date.now().toString(36).toUpperCase()}`;
    const message = [
      "City Coolies Free Quote Request",
      `Reference: ${reference}`,
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `City / PIN: ${city} - ${pinCode}`,
      `Address: ${address}`,
      `Requirement: ${details}`,
    ].join("\n");

    return NextResponse.json({
      success: true,
      message: `Quote request ${reference} is ready. Complete it on WhatsApp.`,
      reference,
      whatsappUrl: `https://wa.me/918693986939?text=${encodeURIComponent(message)}`,
    }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid quote request." }, { status: 400 });
  }
}

