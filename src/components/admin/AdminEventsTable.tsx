"use client";

import { deleteEventAction } from "@/app/admin/(dashboard)/events/actions";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EventType, PostStatus } from "@/generated/prisma/enums";
import { EVENT_TYPE_LABELS, POST_STATUS_LABELS } from "@/lib/events-utils";
import { cn } from "@/lib/utils";
import { Calendar, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface AdminEventRow {
  id: string;
  title: string;
  slug: string;
  eventType: EventType;
  startDateLabel: string;
  city: string | null;
  status: PostStatus;
}

interface AdminEventsTableProps {
  events: AdminEventRow[];
  activeStatus: PostStatus | "ALL";
  activeWhen?: "ALL" | "upcoming" | "past";
}

const statusBadgeStyles: Record<PostStatus, string> = {
  PUBLISHED: "bg-forest-deep/10 text-forest-deep border-forest-deep/20",
  DRAFT: "bg-saffron/20 text-forest-deep border-saffron/40",
  ARCHIVED: "bg-muted text-ink-soft border-border",
};

export function AdminEventsTable({
  events,
  activeStatus,
  activeWhen = "ALL",
}: AdminEventsTableProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<AdminEventRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setFeedback(null);

    try {
      const result = await deleteEventAction(deleteTarget.id);
      if (result.success) {
        const deletedTitle = deleteTarget.title;
        setDeleteTarget(null);
        setFeedback({
          type: "success",
          message: `Deleted "${deletedTitle}".`,
        });
        router.refresh();
      } else {
        setFeedback({
          type: "error",
          message: result.error,
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Could not delete the event right now. Please try again.",
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-4">
      {feedback && (
        <div
          role={feedback.type === "error" ? "alert" : "status"}
          className={cn(
            "rounded-md border px-4 py-3 text-sm",
            feedback.type === "error"
              ? "border-crimson/30 bg-crimson/5 text-crimson"
              : "border-forest-deep/20 bg-forest-deep/5 text-forest-deep",
          )}
        >
          {feedback.message}
        </div>
      )}

      {events.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 md:p-14 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-forest-deep">
            <Calendar className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-serif text-2xl text-forest-deep">
            {activeStatus === "ALL" && activeWhen === "ALL"
              ? "No events yet"
              : "No matching events"}
          </h3>
          <p className="mt-2 mx-auto max-w-md text-sm text-ink-soft leading-relaxed">
            {activeStatus === "ALL" && activeWhen === "ALL"
              ? "Create your first event to start managing performances, workshops, and class sessions."
              : "Switch the timeframe or status filter, or create a new event."}
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild variant="forest">
              <Link href="/admin/events/new">
                <Plus className="h-4 w-4" />
                New event
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="px-4 py-3">Event name</TableHead>
                <TableHead className="px-4 py-3">Type</TableHead>
                <TableHead className="px-4 py-3">Date</TableHead>
                <TableHead className="px-4 py-3">City</TableHead>
                <TableHead className="px-4 py-3">Status</TableHead>
                <TableHead className="px-4 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="px-4 py-3.5 max-w-[280px]">
                    <div className="font-medium text-foreground truncate">
                      {event.title}
                    </div>
                    <div className="font-mono text-xs text-ink-soft truncate mt-0.5">
                      /{event.slug}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-ink-soft">
                    {EVENT_TYPE_LABELS[event.eventType]}
                  </TableCell>
                  <TableCell className="px-4 py-3.5 font-mono text-xs tabular-nums text-foreground">
                    {event.startDateLabel}
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-ink-soft">
                    {event.city || "—"}
                  </TableCell>
                  <TableCell className="px-4 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        statusBadgeStyles[event.status],
                      )}
                    >
                      {POST_STATUS_LABELS[event.status]}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/events/${event.id}/edit`}>
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-crimson hover:bg-crimson/10 hover:text-crimson border-crimson/25"
                        onClick={() => {
                          setFeedback(null);
                          setDeleteTarget(event);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) {
            setDeleteTarget(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete event?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.title}
              </span>
              . Any related inquiries and media items will remain stored and
              simply be unlinked from this event.
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
                "Delete event"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
