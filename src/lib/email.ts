import { InquiryConfirmationEmail } from "@/emails/InquiryConfirmationEmail";
import { InquiryNotificationEmail } from "@/emails/InquiryNotificationEmail";
import type { InquiryType } from "@/generated/prisma/enums";
import {
  INQUIRY_TYPE_LABELS,
  stripHeaderLineBreaks,
} from "@/lib/inquiries-utils";
import { formatPhoneForDisplay } from "@/lib/phone";
import { render } from "@react-email/components";
import { Resend } from "resend";

export interface InquiryEmailPayload {
  inquiryId: string;
  type: InquiryType;
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  city?: string | null;
  requestedEventType?: string | null;
  preferredDate?: string | null;
  expectedAudience?: string | null;
  linkedEventTitle?: string | null;
  message: string;
}

function getAppBaseUrl(): string {
  const configured = process.env.BETTER_AUTH_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
  }
  return "http://localhost:3000";
}

export async function sendInquiryEmails(
  payload: InquiryEmailPayload,
): Promise<{ skipped: boolean; confirmationSent: boolean; notificationSent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  const notifyEmail = process.env.INQUIRY_NOTIFY_EMAIL?.trim();

  if (!apiKey || !fromEmail) {
    console.warn(
      "[email] Skipping inquiry emails: RESEND_API_KEY or RESEND_FROM_EMAIL is not configured.",
    );
    return { skipped: true, confirmationSent: false, notificationSent: false };
  }

  const resend = new Resend(apiKey);
  const safeName = stripHeaderLineBreaks(payload.name);
  const typeLabel = INQUIRY_TYPE_LABELS[payload.type];
  const formattedPhone = formatPhoneForDisplay(payload.phone);

  let confirmationSent = false;
  let notificationSent = false;

  // 1. Visitor confirmation email
  try {
    const confirmationElement = InquiryConfirmationEmail({
      name: safeName,
      message: payload.message,
      phoneDisplay: formattedPhone?.display ?? null,
      phoneTelHref: formattedPhone?.telHref ?? null,
      linkedEventTitle: payload.linkedEventTitle,
    });
    const [html, text] = await Promise.all([
      render(confirmationElement),
      render(confirmationElement, { plainText: true }),
    ]);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: payload.email,
      ...(notifyEmail ? { replyTo: notifyEmail } : {}),
      subject: "We received your inquiry — Yakshamitraru Germany e.V.",
      html,
      text,
    });

    if (error) {
      console.error("[email] Failed to send inquiry confirmation email.", {
        name: error.name,
        statusCode: error.statusCode,
      });
    } else {
      confirmationSent = true;
    }
  } catch (err) {
    console.error("[email] Unexpected error sending inquiry confirmation email.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
    });
  }

  // 2. Team notification email (only if INQUIRY_NOTIFY_EMAIL is set)
  if (notifyEmail) {
    try {
      const adminInboxUrl = `${getAppBaseUrl()}/admin/inquiries/${payload.inquiryId}`;
      const notificationElement = InquiryNotificationEmail({
        inquiryTypeLabel: typeLabel,
        name: safeName,
        email: payload.email,
        phoneDisplay: formattedPhone?.display ?? null,
        phoneTelHref: formattedPhone?.telHref ?? null,
        organization: payload.organization,
        city: payload.city,
        requestedEventType: payload.requestedEventType,
        preferredDate: payload.preferredDate,
        expectedAudience: payload.expectedAudience,
        linkedEventTitle: payload.linkedEventTitle,
        message: payload.message,
        adminInboxUrl,
      });
      const [html, text] = await Promise.all([
        render(notificationElement),
        render(notificationElement, { plainText: true }),
      ]);

      const { error } = await resend.emails.send({
        from: fromEmail,
        to: notifyEmail,
        replyTo: payload.email,
        subject: `New inquiry: ${typeLabel}`,
        html,
        text,
      });

      if (error) {
        console.error("[email] Failed to send inquiry notification email.", {
          name: error.name,
          statusCode: error.statusCode,
        });
      } else {
        notificationSent = true;
      }
    } catch (err) {
      console.error("[email] Unexpected error sending inquiry notification email.", {
        errorName: err instanceof Error ? err.name : "UnknownError",
      });
    }
  }

  return { skipped: false, confirmationSent, notificationSent };
}
