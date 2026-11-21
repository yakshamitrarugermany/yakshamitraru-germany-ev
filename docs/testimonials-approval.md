# Approving & Managing Testimonials

Reviews submitted through the **"Share your experience"** form on `/testimonials` are saved in the Supabase PostgreSQL database with `status = 'PENDING'`. They never appear publicly on the website until a team member approves them.

---

## How to Review and Approve Testimonials

1. Sign in to the **Supabase Dashboard** and open the **Yakshamitraru Germany** project.
2. In the left sidebar, click **Table Editor**.
3. Select the **`Testimonial`** table.
4. Filter or sort by **`status`** (`PENDING`) and **`createdAt`** (newest first) to review new submissions.
5. Read the submitted fields (`name`, `displayNameMode`, `role`, `event`, `city`, `text`, `consentGiven`).
6. Update the **`status`** column for the row:
   - Change `status` from `PENDING` to **`APPROVED`** to publish the review on `/testimonials`.
   - Change `status` from `PENDING` to **`REJECTED`** to hide the review so it is never displayed.
7. Click **Save** in the Supabase Table Editor. Approved reviews will appear automatically on `/testimonials` (newest first, respecting the reviewer's chosen `displayNameMode` of `FULL` or `FIRST`).

---

## Privacy & GDPR Data Minimisation Note

- **Email addresses are personal data**: The `email` column is collected solely for rate-limiting and verification and is **never** queried or rendered on the public website.
- **No tracking data**: IP addresses, user agents, and browser fingerprints are intentionally not stored.
- **Data retention**: Please delete **`REJECTED`** rows (or spam submissions) after a reasonable review window so personal email addresses are not retained longer than necessary. If a reviewer requests removal of their published testimonial, delete their row from the `Testimonial` table.
