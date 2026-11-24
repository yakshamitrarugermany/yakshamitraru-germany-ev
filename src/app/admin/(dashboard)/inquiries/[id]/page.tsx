import { AdminInquiryDetail } from "@/components/admin/AdminInquiryDetail";
import { formatBerlinDateTime } from "@/lib/events-utils";
import { buildWhatsAppInquiryHref, formatPhoneForDisplay } from "@/lib/phone";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Inquiry Detail",
};

export default async function AdminInquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  if (!inquiry) {
    notFound();
  }

  const formattedPhone = formatPhoneForDisplay(inquiry.phone);
  const whatsappHref = formattedPhone?.whatsappDigits
    ? buildWhatsAppInquiryHref(formattedPhone.whatsappDigits, inquiry.name)
    : null;

  return (
    <section className="space-y-6 max-w-4xl">
      <div>
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-forest-deep transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to inquiries
        </Link>
        <p className="eyebrow text-ink-soft mt-4">Admin / Inquiries</p>
        <h2 className="mt-1 font-serif text-3xl text-forest-deep">
          Inquiry from {inquiry.name}
        </h2>
      </div>

      <AdminInquiryDetail
        inquiry={{
          id: inquiry.id,
          type: inquiry.type,
          status: inquiry.status,
          createdAtLabel: formatBerlinDateTime(inquiry.createdAt),
          name: inquiry.name,
          email: inquiry.email,
          phoneDisplay: formattedPhone?.display ?? null,
          phoneTelHref: formattedPhone?.telHref ?? null,
          whatsappHref,
          organization: inquiry.organization,
          city: inquiry.city,
          requestedEventType: inquiry.requestedEventType,
          preferredDate: inquiry.preferredDate,
          expectedAudience: inquiry.expectedAudience,
          message: inquiry.message,
          consentGiven: inquiry.consentGiven,
          linkedEvent: inquiry.event,
        }}
      />
    </section>
  );
}
