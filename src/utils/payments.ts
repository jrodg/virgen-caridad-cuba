import type { DonationSettings } from "../types";

export const PAYMENT_METHODS = ["paypal", "venmo", "cashapp", "zelle"] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number];

const lastPathSegment = (raw: string) => {
  try {
    const parsed = new URL(raw);
    const parts = parsed.pathname.split("/").filter(Boolean);
    return decodeURIComponent(parts[parts.length - 1] || "");
  } catch {
    return "";
  }
};

const safeAmount = (amount: number | string) => {
  const value = Number(amount);
  return Number.isFinite(value) && value > 0 ? value.toFixed(2) : "";
};

export const parseVenmoHandle = (raw: string) => {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) {
    const segment = lastPathSegment(trimmed).replace(/^@/, "");
    return segment && segment.toLowerCase() !== "u" ? segment : "";
  }
  return trimmed.replace(/^@/, "").replace(/^venmo\.com\//i, "").split("/")[0];
};

export const parseCashTag = (raw: string) => {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) {
    return lastPathSegment(trimmed).replace(/^\$/, "");
  }
  return trimmed.replace(/^\$/, "").replace(/^cash\.app\//i, "");
};

export const buildPaypalUrl = (paypalUrl: string, amount: number | string) => {
  const raw = (paypalUrl || "").trim();
  if (!raw) return "";
  const amountValue = safeAmount(amount);

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
    const params = new URLSearchParams({
      business: raw,
      currency_code: "USD",
      item_name: "Gift to Our Lady of Charity of El Cobre",
    });
    if (amountValue) params.set("amount", amountValue);
    return `https://www.paypal.com/donate/?${params.toString()}`;
  }

  if (/paypal\.me\//i.test(raw)) {
    const base = raw.replace(/\/$/, "");
    return amountValue ? `${base}/${amountValue}` : base;
  }

  try {
    const parsed = new URL(raw);
    if (amountValue) parsed.searchParams.set("amount", amountValue);
    return parsed.toString();
  } catch {
    return raw;
  }
};

export const buildVenmoUrl = (venmoUrl: string, amount: number | string) => {
  const handle = parseVenmoHandle(venmoUrl);
  if (!handle) return "";
  const params = new URLSearchParams({ txn: "pay" });
  const amountValue = safeAmount(amount);
  if (amountValue) params.set("amount", amountValue);
  params.set("note", "Gift to Our Lady of Charity of El Cobre");
  return `https://venmo.com/${encodeURIComponent(handle)}?${params.toString()}`;
};

export const buildCashAppUrl = (cashAppUrl: string, amount: number | string) => {
  const tag = parseCashTag(cashAppUrl);
  if (!tag) return "";
  const base = `https://cash.app/$${encodeURIComponent(tag)}`;
  const amountValue = safeAmount(amount);
  return amountValue ? `${base}/${amountValue}` : base;
};

export const getConfiguredMethods = (settings: DonationSettings): PaymentMethodId[] =>
  PAYMENT_METHODS.filter((method) => {
    if (method === "paypal") return Boolean(settings.paypalUrl?.trim());
    if (method === "venmo") return Boolean(settings.venmoUrl?.trim());
    if (method === "cashapp") return Boolean(settings.cashAppUrl?.trim());
    return Boolean(settings.zelleHandle?.trim());
  });

export const buildPaymentUrl = (
  method: PaymentMethodId,
  settings: DonationSettings,
  amount: number | string
) => {
  if (method === "paypal") return buildPaypalUrl(settings.paypalUrl, amount);
  if (method === "venmo") return buildVenmoUrl(settings.venmoUrl, amount);
  if (method === "cashapp") return buildCashAppUrl(settings.cashAppUrl, amount);
  return "";
};
