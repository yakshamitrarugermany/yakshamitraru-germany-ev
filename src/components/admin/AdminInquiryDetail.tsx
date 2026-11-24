"use client";

import {
  deleteInquiryAction,
  updateInquiryStatusAction,
} from "@/app/admin/(dashboard)/inquiries/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { InquiryStatus, InquiryType } from "@/generated/prisma/enums";
import { showAdminErrorToast, showAdminSuccessToast } from "@/lib/admin-toast";
import {
  INQUIRY_STATUS_LABELS,
  INQUIRY_STATUS_VALUES,
  INQUIRY_TYPE_LABELS,
  stripHeaderLineBreaks,
} from "@/lib/inquiries-utils";
import { Loader2, Mail, MessageCircle, Phone, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface AdminInquiryDetailData {
  id: string;
  type: InquiryType;
  status: InquiryStatus;
  createdAtLabel: string;
  name: string;
  email: string;
  phoneDisplay: string | null;
  phoneTelHref: string | null;
  whatsappHref: string | null;
  organization: string | null;
  city: string | null;
  requestedEventType: string | null;
  preferredDate: string | null;
  expectedAudience: string | null;
  message: string;
  consentGiven: boolean;
  linkedEvent: {
    id: string;
    title: string;
    slug: string;
  } | null;
}

export function AdminInquiryDetail({
  inquiry,
}: {
  inquiry: AdminInquiryDetailData;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);
  const [savingStatus, setSavingStatus] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const safeSubject = `Re: Your ${INQUIRY_TYPE_LABELS[inquiry.type].toLowerCase()} inquiry — Yakshamitraru Germany e.V.`;
  const replyHref = `mailto:${encodeURIComponent(inquiry.email)}?subject=${encodeURIComponent(
    stripHeaderLineBreaks(safeSubject),
  )}`;

  async function handleStatusChange(nextStatus: InquiryStatus) {
    if (nextStatus === status) return;
    const prevStatus = status;
    setStatus(nextStatus);
    setSavingStatus(true);

    try {
      const result = await updateInquiryStatusAction(inquiry.id, nextStatus);
      if (result.success) {
        showAdminSuccessToast(
          `Status updated to ${INQUIRY_STATUS_LABELS[nextStatus]}.`,
          "admin-inquiry-status",
        );
        router.refresh();
      } else {
        setStatus(prevStatus);
        showAdminErrorToast(result.error, "admin-inquiry-status-error");
      }
    } catch {
      setStatus(prevStatus);
      showAdminErrorToast(
        "Could not update the status right now. Please try again.",
        "admin-inquiry-status-error",
      );
    } finally {
      setSavingStatus(false);
    }
  }

  async function handleConfirmDelete() {
    setDeleting(true);

    try {
      const result = await deleteInquiryAction(inquiry.id);
      if (result.success) {
        setDeleteOpen(false);
        router.push("/admin/inquiries?deleted=1");
        router.refresh();
      } else {
        showAdminErrorToast(result.error, "admin-inquiry-delete-error");
        setDeleting(false);
      }
    } catch {
      showAdminErrorToast(
        "Could not delete the inquiry right now. Please try again.",
        "admin-inquiry-delete-error",
      );
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor="inquiry-status-select"
            className="eyebrow text-ink-soft"
          >
            Status
          </label>
          <Select
            value={status}
            disabled={savingStatus}
            onValueChange={(value) => {
              if (value) {
                void handleStatusChange(value as InquiryStatus);
              }
            }}
          >
            <SelectTrigger
              id="inquiry-status-select"
              className="w-40 h-9 bg-background px-3 text-sm"
            >
              <SelectValue>{INQUIRY_STATUS_LABELS[status]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {INQUIRY_STATUS_VALUES.map((val) => (
                <SelectItem key={val} value={val}>
                  {INQUIRY_STATUS_LABELS[val]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {savingStatus && (
            <Loader2
              className="h-4 w-4 animate-spin text-ink-soft"
              aria-label="Saving status"
            />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button asChild variant="forest" size="sm">
            <a
              href={replyHref}
              aria-label={`Reply to ${inquiry.name} by email`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Reply by email
            </a>
          </Button>
          {inquiry.phoneTelHref && (
            <Button asChild variant="outline" size="sm">
              <a
                href={inquiry.phoneTelHref}
                aria-label={`Call ${inquiry.name}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
            </Button>
          )}
          {inquiry.whatsappHref && (
            <Button asChild variant="outline" size="sm">
              <a
                href={inquiry.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message ${inquiry.name} on WhatsApp`}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-crimson hover:bg-crimson/10 hover:text-crimson border-crimson/25"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </Button>
        </div>
      </div>

      {/* Inquiry details card */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
          <div>
            <dt className="eyebrow text-ink-soft">Received (Europe/Berlin)</dt>
            <dd className="mt-1 font-mono text-foreground tabular-nums">
              {inquiry.createdAtLabel}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Type</dt>
            <dd className="mt-1 text-foreground">
              {INQUIRY_TYPE_LABELS[inquiry.type]}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Name</dt>
            <dd className="mt-1 font-medium text-foreground">{inquiry.name}</dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Email</dt>
            <dd className="mt-1 text-foreground">
              <a
                href={replyHref}
                className="underline underline-offset-4 hover:text-forest-deep"
              >
                {inquiry.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Phone</dt>
            <dd className="mt-1 text-foreground">
              {inquiry.phoneDisplay || "—"}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Organisation</dt>
            <dd className="mt-1 text-foreground">
              {inquiry.organization || "—"}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">City / Venue</dt>
            <dd className="mt-1 text-foreground">{inquiry.city || "—"}</dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Requested event type</dt>
            <dd className="mt-1 text-foreground">
              {inquiry.requestedEventType || "—"}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Preferred date</dt>
            <dd className="mt-1 text-foreground">
              {inquiry.preferredDate || "—"}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Expected audience</dt>
            <dd className="mt-1 text-foreground">
              {inquiry.expectedAudience || "—"}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Linked event</dt>
            <dd className="mt-1 text-foreground">
              {inquiry.linkedEvent ? (
                <Link
                  href={`/admin/events/${inquiry.linkedEvent.id}/edit`}
                  className="underline underline-offset-4 hover:text-forest-deep"
                >
                  {inquiry.linkedEvent.title}
                </Link>
              ) : (
                "—"
              )}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink-soft">Data consent</dt>
            <dd className="mt-1 text-foreground">
              {inquiry.consentGiven ? "Confirmed" : "Not confirmed"}
            </dd>
          </div>
        </dl>

        <div className="border-t border-border pt-6">
          <div className="eyebrow text-ink-soft mb-2">Message</div>
          <div className="rounded-xl border border-border bg-background/60 p-4 sm:p-5 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {inquiry.message}
          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteOpen(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete inquiry permanently?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the inquiry from{" "}
              <span className="font-medium text-foreground">
                {inquiry.name}
              </span>{" "}
              from the database (including for GDPR erasure requests). This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="button"
              variant="destructive"
              disabled={deleting}
              onClick={handleConfirmDelete}
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete inquiry"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
