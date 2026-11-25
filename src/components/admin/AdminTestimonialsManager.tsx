"use client";

import {
  approveTestimonialAction,
  deleteTestimonialAction,
  moveTestimonialAction,
  rejectTestimonialAction,
  updateTestimonialNameAction,
} from "@/app/admin/(dashboard)/testimonials/actions";
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
import type { TestimonialStatus } from "@/generated/prisma/enums";
import { showAdminErrorToast, showAdminSuccessToast } from "@/lib/admin-toast";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  Check,
  EyeOff,
  Loader2,
  Mail,
  MessageSquareQuote,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";

export interface AdminTestimonialItem {
  id: string;
  name: string;
  email: string;
  role: string | null;
  event: string | null;
  city: string | null;
  text: string;
  status: TestimonialStatus;
  sortOrder: number;
  createdAtLabel: string;
}

interface AdminTestimonialsManagerProps {
  pending: AdminTestimonialItem[];
  approved: AdminTestimonialItem[];
  rejected: AdminTestimonialItem[];
  initialTab: TestimonialStatus;
}

const TAB_CONFIG: Array<{
  status: TestimonialStatus;
  label: string;
  emptyTitle: string;
  emptyDescription: string;
}> = [
  {
    status: "PENDING",
    label: "Pending",
    emptyTitle: "No pending reviews",
    emptyDescription:
      "New audience and host reviews submitted through the website will wait here for moderation.",
  },
  {
    status: "APPROVED",
    label: "Approved",
    emptyTitle: "No approved reviews yet",
    emptyDescription:
      "Approve pending reviews to publish them on the public testimonials page and control their order here.",
  },
  {
    status: "REJECTED",
    label: "Rejected",
    emptyTitle: "No rejected reviews",
    emptyDescription:
      "Rejected or unpublished reviews appear here until you approve or permanently delete them.",
  },
];

function isLongReview(text: string): boolean {
  if (text.length > 240) return true;
  return text.split(/\r?\n/).length > 3;
}

export function AdminTestimonialsManager({
  pending,
  approved,
  rejected,
  initialTab,
}: AdminTestimonialsManagerProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TestimonialStatus>(initialTab);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [busyAction, setBusyAction] = useState<{
    id: string;
    action:
      | "approve"
      | "reject"
      | "unpublish"
      | "up"
      | "down"
      | "delete"
      | "editName";
  } | null>(null);
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [editingNameDraft, setEditingNameDraft] = useState("");
  const [editingNameError, setEditingNameError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminTestimonialItem | null>(
    null,
  );
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  const moveButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const pendingFocusRef = useRef<{
    id: string;
    preferred: "up" | "down";
  } | null>(null);

  const approvedOrderKey = approved.map((item) => item.id).join(",");

  useEffect(() => {
    const pendingFocus = pendingFocusRef.current;
    if (!pendingFocus) return;
    pendingFocusRef.current = null;

    const { id, preferred } = pendingFocus;
    const fallback = preferred === "up" ? "down" : "up";

    requestAnimationFrame(() => {
      const preferredBtn = moveButtonRefs.current.get(`${id}:${preferred}`);
      if (preferredBtn && !preferredBtn.disabled) {
        preferredBtn.focus();
        return;
      }
      const fallbackBtn = moveButtonRefs.current.get(`${id}:${fallback}`);
      if (fallbackBtn && !fallbackBtn.disabled) {
        fallbackBtn.focus();
      }
    });
  }, [approvedOrderKey]);

  const counts: Record<TestimonialStatus, number> = {
    PENDING: pending.length,
    APPROVED: approved.length,
    REJECTED: rejected.length,
  };

  const itemsByStatus: Record<TestimonialStatus, AdminTestimonialItem[]> = {
    PENDING: pending,
    APPROVED: approved,
    REJECTED: rejected,
  };

  const visibleItems = itemsByStatus[activeTab];
  const activeTabMeta =
    TAB_CONFIG.find((tab) => tab.status === activeTab) ?? TAB_CONFIG[0];

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function handleApprove(item: AdminTestimonialItem) {
    setBusyAction({ id: item.id, action: "approve" });
    try {
      const result = await approveTestimonialAction(item.id);
      if (result.success) {
        showAdminSuccessToast("Review approved.", "admin-testimonial-approve");
        router.refresh();
      } else {
        showAdminErrorToast(result.error, "admin-testimonial-approve-error");
      }
    } catch {
      showAdminErrorToast(
        "Could not approve the review right now. Please try again.",
        "admin-testimonial-approve-error",
      );
    } finally {
      setBusyAction(null);
    }
  }

  async function handleRejectOrUnpublish(
    item: AdminTestimonialItem,
    mode: "reject" | "unpublish",
  ) {
    setBusyAction({ id: item.id, action: mode });
    try {
      const result = await rejectTestimonialAction(item.id);
      if (result.success) {
        showAdminSuccessToast(
          mode === "unpublish" ? "Review unpublished." : "Review rejected.",
          mode === "unpublish"
            ? "admin-testimonial-unpublish"
            : "admin-testimonial-reject",
        );
        router.refresh();
      } else {
        showAdminErrorToast(result.error, "admin-testimonial-reject-error");
      }
    } catch {
      showAdminErrorToast(
        "Could not update the review right now. Please try again.",
        "admin-testimonial-reject-error",
      );
    } finally {
      setBusyAction(null);
    }
  }

  async function handleMove(
    item: AdminTestimonialItem,
    direction: "up" | "down",
  ) {
    setBusyAction({ id: item.id, action: direction });
    try {
      const result = await moveTestimonialAction(item.id, direction);
      if (result.success) {
        pendingFocusRef.current = { id: item.id, preferred: direction };
        setLiveAnnouncement(
          `Moved ${item.name} to position ${result.newPosition} of ${result.total}.`,
        );
        showAdminSuccessToast("Review order updated.", "admin-testimonial-move");
        router.refresh();
      } else {
        showAdminErrorToast(result.error, "admin-testimonial-move-error");
      }
    } catch {
      showAdminErrorToast(
        "Could not reorder the review right now. Please try again.",
        "admin-testimonial-move-error",
      );
    } finally {
      setBusyAction(null);
    }
  }

  function startEditingName(item: AdminTestimonialItem) {
    setEditingNameId(item.id);
    setEditingNameDraft(item.name);
    setEditingNameError(null);
  }

  function cancelEditingName() {
    setEditingNameId(null);
    setEditingNameDraft("");
    setEditingNameError(null);
  }

  async function handleSaveName(
    e: FormEvent<HTMLFormElement>,
    item: AdminTestimonialItem,
  ) {
    e.preventDefault();
    const trimmed = editingNameDraft.trim();
    if (trimmed.length < 2) {
      setEditingNameError("Name must be at least 2 characters.");
      return;
    }
    if (trimmed.length > 100) {
      setEditingNameError("Name must be 100 characters or fewer.");
      return;
    }

    setEditingNameError(null);
    setBusyAction({ id: item.id, action: "editName" });
    try {
      const result = await updateTestimonialNameAction(item.id, trimmed);
      if (result.success) {
        cancelEditingName();
        showAdminSuccessToast(
          "Reviewer name updated.",
          "admin-testimonial-name",
        );
        router.refresh();
      } else {
        setEditingNameError(result.error);
      }
    } catch {
      showAdminErrorToast(
        "Could not update the name right now. Please try again.",
        "admin-testimonial-name-error",
      );
    } finally {
      setBusyAction(null);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const targetId = deleteTarget.id;
    setBusyAction({ id: targetId, action: "delete" });

    try {
      const result = await deleteTestimonialAction(targetId);
      if (result.success) {
        setDeleteTarget(null);
        showAdminSuccessToast(
          "Review permanently deleted.",
          "admin-testimonial-delete",
        );
        router.refresh();
      } else {
        showAdminErrorToast(result.error, "admin-testimonial-delete-error");
      }
    } catch {
      showAdminErrorToast(
        "Could not delete the review right now. Please try again.",
        "admin-testimonial-delete-error",
      );
    } finally {
      setBusyAction(null);
    }
  }

  const isBusy = busyAction !== null;

  return (
    <div className="space-y-6">
      {/* Screen-reader position announcement for reorder actions */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      {/* Status tabs with counts */}
      <div
        role="tablist"
        aria-label="Filter reviews by status"
        className="flex flex-wrap items-center gap-2"
      >
        {TAB_CONFIG.map((tab) => {
          const isActive = activeTab === tab.status;
          const count = counts[tab.status];
          return (
            <button
              key={tab.status}
              type="button"
              role="tab"
              id={`testimonials-tab-${tab.status.toLowerCase()}`}
              aria-selected={isActive}
              aria-controls={`testimonials-panel-${tab.status.toLowerCase()}`}
              onClick={() => setActiveTab(tab.status)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                isActive
                  ? "border-forest-deep bg-forest-deep text-cream"
                  : "border-border bg-card text-ink-soft hover:border-forest-deep/40 hover:text-forest-deep",
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 font-mono text-xs tabular-nums",
                  isActive
                    ? "bg-cream/15 text-cream"
                    : "bg-muted text-ink-soft",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active tab panel */}
      <div
        role="tabpanel"
        id={`testimonials-panel-${activeTab.toLowerCase()}`}
        aria-labelledby={`testimonials-tab-${activeTab.toLowerCase()}`}
      >
        {visibleItems.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 md:p-14 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-forest-deep">
              <MessageSquareQuote className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-serif text-2xl text-forest-deep">
              {activeTabMeta.emptyTitle}
            </h3>
            <p className="mt-2 mx-auto max-w-md text-sm text-ink-soft leading-relaxed">
              {activeTabMeta.emptyDescription}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleItems.map((item, index) => {
              const isExpanded = Boolean(expandedIds[item.id]);
              const longText = isLongReview(item.text);
              const isThisRowBusy = busyAction?.id === item.id;
              const isFirst = index === 0;
              const isLast = index === visibleItems.length - 1;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {activeTab === "APPROVED" && (
                          <span className="inline-flex items-center rounded-full border border-forest-deep/20 bg-forest-deep/10 px-2 py-0.5 font-mono text-xs font-medium text-forest-deep tabular-nums">
                            #{index + 1}
                          </span>
                        )}
                        {editingNameId === item.id ? (
                          <form
                            onSubmit={(e) => handleSaveName(e, item)}
                            noValidate
                            className="flex flex-col gap-1.5 w-full max-w-md"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <input
                                type="text"
                                value={editingNameDraft}
                                maxLength={100}
                                autoFocus
                                disabled={isBusy}
                                aria-label={`Display name for ${item.name}`}
                                aria-invalid={
                                  editingNameError ? true : undefined
                                }
                                aria-describedby={
                                  editingNameError
                                    ? `edit-name-error-${item.id}`
                                    : undefined
                                }
                                onChange={(e) => {
                                  setEditingNameDraft(e.target.value);
                                  if (editingNameError) {
                                    setEditingNameError(null);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Escape" && !isBusy) {
                                    cancelEditingName();
                                  }
                                }}
                                className="flex-1 min-w-[180px] rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:border-forest-deep focus:outline-none transition-colors"
                              />
                              <Button
                                type="submit"
                                variant="forest"
                                size="sm"
                                disabled={isBusy}
                                aria-label={`Save name for ${item.name}`}
                              >
                                {isThisRowBusy &&
                                busyAction?.action === "editName" ? (
                                  <Loader2
                                    className="h-3.5 w-3.5 animate-spin"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Check
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                )}
                                Save
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={isBusy}
                                aria-label={`Cancel editing name for ${item.name}`}
                                onClick={cancelEditingName}
                              >
                                Cancel
                              </Button>
                            </div>
                            {editingNameError && (
                              <p
                                id={`edit-name-error-${item.id}`}
                                className="text-xs text-crimson"
                              >
                                {editingNameError}
                              </p>
                            )}
                          </form>
                        ) : (
                          <h3 className="font-serif text-xl text-forest-deep truncate">
                            {item.name}
                          </h3>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
                        <span>
                          <strong className="font-medium text-foreground">
                            Role:
                          </strong>{" "}
                          {item.role || "—"}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          <strong className="font-medium text-foreground">
                            Event:
                          </strong>{" "}
                          {item.event || "—"}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          <strong className="font-medium text-foreground">
                            City:
                          </strong>{" "}
                          {item.city || "—"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft pt-0.5">
                        <span className="inline-flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{item.email}</span>
                          <span className="text-[11px] italic">(admin only)</span>
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-xs font-mono tabular-nums text-ink-soft">
                      {item.createdAtLabel}
                    </div>
                  </div>

                  {/* Review body */}
                  <div className="rounded-xl border border-border bg-background/60 p-4 text-sm text-foreground leading-relaxed">
                    <p
                      className={cn(
                        "whitespace-pre-wrap",
                        longText && !isExpanded && "line-clamp-4",
                      )}
                    >
                      {item.text}
                    </p>
                    {longText && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(item.id)}
                        aria-expanded={isExpanded}
                        aria-label={
                          isExpanded
                            ? `Show less of ${item.name}'s review`
                            : `Show more of ${item.name}'s review`
                        }
                        className="mt-2 text-xs font-medium text-forest-deep hover:underline underline-offset-4 cursor-pointer"
                      >
                        {isExpanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>

                  {/* Row actions */}
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                    {activeTab === "PENDING" && (
                      <>
                        <Button
                          type="button"
                          variant="forest"
                          size="sm"
                          disabled={isBusy}
                          aria-label={`Approve review from ${item.name}`}
                          onClick={() => handleApprove(item)}
                        >
                          {isThisRowBusy && busyAction?.action === "approve" ? (
                            <Loader2
                              className="h-3.5 w-3.5 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          Approve
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={isBusy}
                          aria-label={`Reject review from ${item.name}`}
                          onClick={() => handleRejectOrUnpublish(item, "reject")}
                        >
                          {isThisRowBusy && busyAction?.action === "reject" ? (
                            <Loader2
                              className="h-3.5 w-3.5 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          Reject
                        </Button>
                      </>
                    )}

                    {activeTab === "APPROVED" && (
                      <>
                        <Button
                          ref={(el) => {
                            const key = `${item.id}:up`;
                            if (el) {
                              moveButtonRefs.current.set(key, el);
                            } else {
                              moveButtonRefs.current.delete(key);
                            }
                          }}
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={isFirst || isBusy}
                          aria-label={`Move ${item.name} up`}
                          onClick={() => handleMove(item, "up")}
                        >
                          {isThisRowBusy && busyAction?.action === "up" ? (
                            <Loader2
                              className="h-3.5 w-3.5 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <ArrowUp
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          )}
                          Move up
                        </Button>
                        <Button
                          ref={(el) => {
                            const key = `${item.id}:down`;
                            if (el) {
                              moveButtonRefs.current.set(key, el);
                            } else {
                              moveButtonRefs.current.delete(key);
                            }
                          }}
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={isLast || isBusy}
                          aria-label={`Move ${item.name} down`}
                          onClick={() => handleMove(item, "down")}
                        >
                          {isThisRowBusy && busyAction?.action === "down" ? (
                            <Loader2
                              className="h-3.5 w-3.5 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <ArrowDown
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          )}
                          Move down
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={isBusy}
                          aria-label={`Unpublish review from ${item.name}`}
                          onClick={() =>
                            handleRejectOrUnpublish(item, "unpublish")
                          }
                        >
                          {isThisRowBusy &&
                          busyAction?.action === "unpublish" ? (
                            <Loader2
                              className="h-3.5 w-3.5 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <EyeOff
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          )}
                          Unpublish
                        </Button>
                      </>
                    )}

                    {activeTab === "REJECTED" && (
                      <Button
                        type="button"
                        variant="forest"
                        size="sm"
                        disabled={isBusy}
                        aria-label={`Approve review from ${item.name}`}
                        onClick={() => handleApprove(item)}
                      >
                        {isThisRowBusy && busyAction?.action === "approve" ? (
                          <Loader2
                            className="h-3.5 w-3.5 animate-spin"
                            aria-hidden="true"
                          />
                        ) : (
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        Approve
                      </Button>
                    )}

                    {editingNameId !== item.id && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isBusy}
                        aria-label={`Edit name for ${item.name}`}
                        onClick={() => startEditingName(item)}
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        Edit name
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isBusy}
                      aria-label={`Delete review from ${item.name}`}
                      className="text-crimson hover:bg-crimson/10 hover:text-crimson border-crimson/25"
                      onClick={() => setDeleteTarget(item)}
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Delete
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Permanent delete confirmation dialog */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open && busyAction?.action !== "delete") {
            setDeleteTarget(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete review permanently?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the review from{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.name}
              </span>{" "}
              (including their stored email address, for GDPR erasure requests).
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busyAction?.action === "delete"}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="button"
              variant="destructive"
              disabled={busyAction?.action === "delete"}
              onClick={handleConfirmDelete}
            >
              {busyAction?.action === "delete" ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Deleting…
                </>
              ) : (
                "Delete review"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
