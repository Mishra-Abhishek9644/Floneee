import Cart from "@/models/Cart";

export type BillingDetailsInput = {
  name?: string;
  company?: string;
  country?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  email?: string;
  notes?: string;
};

export type BillingDetails = {
  name: string;
  company: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  notes: string;
};

function getStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeBillingDetails(input: unknown): BillingDetails {
  const data =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};

  return {
    name: getStringValue(data.name),
    company: getStringValue(data.company),
    country: getStringValue(data.country),
    address1: getStringValue(data.address1),
    address2: getStringValue(data.address2),
    city: getStringValue(data.city),
    state: getStringValue(data.state),
    zip: getStringValue(data.zip),
    phone: getStringValue(data.phone),
    email: getStringValue(data.email),
    notes: getStringValue(data.notes),
  };
}

export function validateBillingDetails(details: BillingDetails) {
  if (!details.name) return "Full name is required.";
  if (!details.company) return "Company name is required.";
  if (!details.country) return "Country is required.";
  if (!details.address1) return "Address is required.";
  if (!details.city) return "City is required.";
  if (!details.state) return "State is required.";
  if (!details.zip) return "Zip code is required.";
  if (!details.phone) return "Phone number is required.";
  if (!details.email) return "Email is required.";

  const emailPattern = /^\S+@\S+\.\S+$/;

  if (!emailPattern.test(details.email)) {
    return "Please enter a valid email address.";
  }

  return null;
}

export async function getCheckoutCart(userId: string) {
  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  const items = cart.items.map((item) => ({
    productId: item.productId,
    title: item.title,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    subtotal: item.price * item.quantity,
  }));

  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

  return { items, totalAmount };
}
