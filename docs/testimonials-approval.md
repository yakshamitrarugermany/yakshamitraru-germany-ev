# Managing & Moderating Testimonials

Reviews submitted through the **"Share your experience"** form on `/testimonials` are saved in PostgreSQL with `status = 'PENDING'`. They never appear publicly until an administrator approves them in the admin panel.

---

## Admin Panel Workflow (`/admin/testimonials`)

1. Sign in at `/admin/login` with an administrator account and open **Testimonials** in the sidebar.
2. Reviews are grouped into three tabs with live counts:
   - **Pending** (default tab whenever pending reviews exist)
   - **Approved** (default tab when no pending reviews are waiting)
   - **Rejected**
3. Each card shows the reviewer's name, role, event/venue, city, submission date (`Europe/Berlin`), full review text (clamped with **Show more** for long entries), and their **email address (admin only — never shown publicly)**.

### Approving a review

- On the **Pending** (or **Rejected**) tab, click **Approve**.
- The review's status is set to `APPROVED` and its `sortOrder` is set to the highest current approved `sortOrder + 1`, so newly approved reviews appear at the **end** of the approved list on `/testimonials`.

### Reordering approved reviews

- On the **Approved** tab, reviews are listed in their exact public display order (`sortOrder` ascending, then `createdAt` ascending).
- Click **Move up** or **Move down** to swap a review with its neighbour. The action renumbers the approved list sequentially (`1..n`) in a single database transaction and updates `/testimonials` immediately.

### Rejecting or unpublishing a review

- On **Pending**, click **Reject** to move a submission to the **Rejected** tab without publishing it.
- On **Approved**, click **Unpublish** to immediately remove a review from `/testimonials` and move it to the **Rejected** tab (`status = 'REJECTED'`). You can re-approve it later if needed.

### Editing a reviewer's displayed name

- Click **Edit name** on any review (Pending, Approved, or Rejected) to adjust how the name is shown publicly (2 to 100 characters, trimmed). Changes take effect immediately on `/testimonials`.

### Permanently deleting a review

- Click **Delete** on any tab and confirm in the dialog.
- Deletion permanently removes the row (including the reviewer's email address) from the database.

---

## Privacy & GDPR Data Minimisation

- **Email addresses are personal data:** Reviewer email addresses are visible only to signed-in admins inside `/admin/testimonials` and are **never** queried or rendered on `/testimonials` or any other public page.
- **No tracking data:** IP addresses, user agents, and browser fingerprints are intentionally not stored.
- **Delete rejected reviews regularly:** Permanently delete **Rejected** or spam reviews after a reasonable review period so personal email addresses are not retained longer than necessary.
- **Honour deletion requests:** If a reviewer asks for their published or submitted review to be removed, locate it in `/admin/testimonials` and permanently **Delete** it promptly to fulfil GDPR erasure obligations.
