import crypto from "crypto";

const RAZORPAY_BASE_URL = "https://api.razorpay.com/v1";

type RazorpayOrderResponse = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
};

function getRazorpayKeyId() {
  const keyId =
    process.env.RAZORPAY_KEY_ID ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  if (!keyId || keyId.includes("your_razorpay")) {
    throw new Error(
      "Missing Razorpay key id. Set RAZORPAY_KEY_ID or NEXT_PUBLIC_RAZORPAY_KEY_ID."
    );
  }

  return keyId;
}

function getRazorpayKeySecret() {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret || keySecret.includes("your_razorpay")) {
    throw new Error(
      "Missing Razorpay secret. Set a real RAZORPAY_KEY_SECRET in .env.local."
    );
  }

  return keySecret;
}

function getAuthHeader() {
  const credentials = `${getRazorpayKeyId()}:${getRazorpayKeySecret()}`;
  return `Basic ${Buffer.from(credentials).toString("base64")}`;
}

export function getRazorpayCheckoutKey() {
  return getRazorpayKeyId();
}

export async function createRazorpayOrder(params: {
  amountInRupees: number;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const amount = Math.round(params.amountInRupees * 100);

  if (amount <= 0) {
    throw new Error("Order amount must be greater than zero.");
  }

  const response = await fetch(`${RAZORPAY_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt: params.receipt,
      notes: params.notes,
    }),
  });

  const data = (await response.json()) as
    | RazorpayOrderResponse
    | { error?: { description?: string } };

  if (!response.ok) {
    const description =
      data && "error" in data && data.error?.description
        ? data.error.description
        : null;

    throw new Error(
      response.status === 401
        ? "Razorpay authentication failed. Check your test key id and secret in .env.local, then restart the dev server."
        : description || "Failed to create Razorpay order."
    );
  }

  return data as RazorpayOrderResponse;
}

export function verifyRazorpaySignature(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  const payload = `${params.razorpayOrderId}|${params.razorpayPaymentId}`;

  const expectedSignature = crypto
    .createHmac("sha256", getRazorpayKeySecret())
    .update(payload)
    .digest("hex");

  return expectedSignature === params.razorpaySignature;
}
