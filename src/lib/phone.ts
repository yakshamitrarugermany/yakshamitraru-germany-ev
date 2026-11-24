import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber,
  isSupportedCountry,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/min";

export const DEFAULT_PHONE_COUNTRY: CountryCode = "DE";
export const INVALID_PHONE_MESSAGE = "Please enter a valid phone number";

export interface PhoneCountryOption {
  code: CountryCode;
  callingCode: string;
  name: string;
  shortLabel: string;
  label: string;
}

let cachedCountryOptions: PhoneCountryOption[] | null = null;

export function getPhoneCountryOptions(locale = "en"): PhoneCountryOption[] {
  if (locale === "en" && cachedCountryOptions) {
    return cachedCountryOptions;
  }

  let regionNames: Intl.DisplayNames | null = null;
  try {
    regionNames = new Intl.DisplayNames([locale], { type: "region" });
  } catch {
    regionNames = null;
  }

  const options: PhoneCountryOption[] = getCountries().map((code) => {
    const callingCode = getCountryCallingCode(code);
    const name = regionNames?.of(code) || code;
    return {
      code,
      callingCode,
      name,
      shortLabel: `${code} +${callingCode}`,
      label: `${name} (+${callingCode})`,
    };
  });

  options.sort((a, b) => {
    if (a.code === DEFAULT_PHONE_COUNTRY) return -1;
    if (b.code === DEFAULT_PHONE_COUNTRY) return 1;
    return a.name.localeCompare(b.name, locale);
  });

  if (locale === "en") {
    cachedCountryOptions = options;
  }

  return options;
}

export function normalizeInternationalPrefix(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("00")) {
    return `+${trimmed.slice(2)}`;
  }
  return trimmed;
}

/**
 * If the visitor types an international number starting with "+" or "00",
 * attempts to detect the matching ISO country code.
 */
export function detectInternationalCountry(rawPhone: string): CountryCode | null {
  const trimmed = rawPhone.trim();
  if (!trimmed.startsWith("+") && !trimmed.startsWith("00")) {
    return null;
  }
  if (/\p{L}/u.test(trimmed)) {
    return null;
  }

  const normalized = normalizeInternationalPrefix(trimmed);

  const parsed = parsePhoneNumberFromString(normalized);
  if (parsed?.country) {
    return parsed.country;
  }

  const typer = new AsYouType();
  typer.input(normalized);
  return typer.getCountry() ?? null;
}

export type PhoneParseResult =
  | { valid: true; e164: string; country: CountryCode }
  | { valid: false };

/**
 * Combines selected country code and phone number input, parses with
 * parsePhoneNumberFromString, and validates leniently with isPossiblePhoneNumber.
 * Rejects empty, whitespace-only, and inputs containing letters.
 */
export function parseAndValidatePhone(
  rawPhone: string,
  countryInput: string = DEFAULT_PHONE_COUNTRY,
): PhoneParseResult {
  const trimmed = rawPhone.trim();
  if (!trimmed) {
    return { valid: false };
  }

  // Reject any alphabetic characters (libphonenumber-js otherwise allows vanity words)
  if (/\p{L}/u.test(trimmed)) {
    return { valid: false };
  }

  if (!isSupportedCountry(countryInput)) {
    return { valid: false };
  }
  const country: CountryCode = countryInput;

  const normalized = normalizeInternationalPrefix(trimmed);
  const parsed = normalized.startsWith("+")
    ? parsePhoneNumberFromString(normalized)
    : parsePhoneNumberFromString(normalized, country);

  if (!parsed) {
    return { valid: false };
  }

  const possible = normalized.startsWith("+")
    ? isPossiblePhoneNumber(normalized)
    : isPossiblePhoneNumber(normalized, country);

  if (!possible) {
    return { valid: false };
  }

  return {
    valid: true,
    e164: parsed.number,
    country: parsed.country ?? country,
  };
}

export interface FormattedPhoneDisplay {
  display: string;
  e164: string | null;
  telHref: string | null;
  whatsappDigits: string | null;
}

/**
 * Formats a stored phone string for human display (international format) and
 * provides E.164 `tel:` and WhatsApp digits helpers. Numbers saved without an
 * international prefix fall back to DE as the default country; if parsing still
 * fails, returns the exact stored string with null action fields.
 */
export function formatPhoneForDisplay(
  storedPhone: string | null | undefined,
): FormattedPhoneDisplay | null {
  if (!storedPhone || !storedPhone.trim()) {
    return null;
  }

  const result = parseAndValidatePhone(storedPhone, DEFAULT_PHONE_COUNTRY);
  if (!result.valid) {
    return {
      display: storedPhone,
      e164: null,
      telHref: null,
      whatsappDigits: null,
    };
  }

  const parsed = parsePhoneNumberFromString(result.e164);
  const display = parsed ? parsed.formatInternational() : result.e164;

  return {
    display,
    e164: result.e164,
    telHref: `tel:${result.e164}`,
    whatsappDigits: result.e164.replace(/\D/g, ""),
  };
}

/**
 * Builds a WhatsApp click-to-chat URL with a short, editable greeting.
 * Never includes inquiry message text or email addresses.
 */
export function buildWhatsAppInquiryHref(
  whatsappDigits: string,
  visitorName: string,
): string {
  const cleanDigits = whatsappDigits.replace(/\D/g, "");
  const firstName = visitorName
    .replace(/[\r\n]+/g, " ")
    .trim()
    .split(/\s+/)[0];
  const greeting = firstName
    ? `Hello ${firstName}, thank you for your enquiry to Yakshamitraru Germany.`
    : "Hello, thank you for your enquiry to Yakshamitraru Germany.";

  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(greeting)}`;
}
