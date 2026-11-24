# Inquiries & Admin Inbox

This document explains how public inquiries work for **Yakshamitraru Germany e.V.**, how administrators manage them in `/admin/inquiries`, and how to handle retention and GDPR erasure requests.

## How Inquiries Flow

1. **Submission**: Visitors submit the enquiry/booking form on `/contact` (or via the booking section on the site). If a visitor arrives at `/contact?event=<slug>` for a `PUBLISHED` event, that event is linked to the inquiry.
2. **Validation & Abuse Protection**:
   - Inputs are validated with a shared Zod schema on both client and server (name, email, phone, message, required data-use consent).
   - Phone is a required form field with a country code selector (default Germany, `DE +49`), validated leniently (`isPossiblePhoneNumber`), and stored in E.164 format (for example `+4917634690281`).
   - A hidden honeypot field silently discards bot submissions without saving or sending email.
   - Each email address is limited to 5 inquiries per 24 hours.
3. **Database Storage First**: Every valid inquiry is stored in Supabase Postgres (`Inquiry` table) with initial status `NEW` and type `EVENT_BOOKING` or `GENERAL`.
4. **Transactional Emails (Resend + React Email)**:
   - **Visitor confirmation**: Sent to the inquirer thanking them, repeating their message, confirming the team will reply as soon as possible, and noting that their details are used only to answer the inquiry. `Reply-To` is set to `INQUIRY_NOTIFY_EMAIL` when configured.
   - **Team notification**: Sent to `INQUIRY_NOTIFY_EMAIL` (when set) with the inquiry details and a direct link to `/admin/inquiries`. `Reply-To` is set to the visitor's email address so you can reply directly from your inbox.
   - If `RESEND_API_KEY` or `RESEND_FROM_EMAIL` is missing, or if Resend fails temporarily, the inquiry still remains safely saved in `/admin/inquiries`.

## Managing Status in `/admin/inquiries`

1. Sign in at `/admin/login` and open **Inquiries** in the admin sidebar.
2. Filter the inbox by **Status** (`New`, `Contacted`, `Closed`) and/or **Type** (`Event booking`, `General`). Inquiries are listed newest first with timestamps shown in `Europe/Berlin`.
3. Click an inquiry's name or **View** to open its detail page (`/admin/inquiries/[id]`).
4. Click **Reply by email** to open your email client pre-addressed to the visitor.
5. Change the **Status** dropdown (`New` → `Contacted` → `Closed`). Changes save immediately.

## Retention Policy (Recommendation)

To follow GDPR data-minimization principles, review closed inquiries periodically and **delete `CLOSED` inquiries after 6 to 12 months** unless there is a documented legal or contractual reason to keep them (for example, an active booking contract or statutory bookkeeping obligations handled outside this inbox).

## Handling a GDPR Deletion (Erasure) Request

If a visitor asks for their inquiry data to be deleted:

1. Open `/admin/inquiries` and locate all inquiries submitted by that visitor's email address (check all statuses: `New`, `Contacted`, and `Closed`).
2. Open each matching inquiry (`/admin/inquiries/[id]`).
3. Click **Delete** and confirm in the dialog. This permanently removes the row from the database.
4. Also delete any corresponding email threads or notification copies from your email inbox (e.g., `INQUIRY_NOTIFY_EMAIL`), and confirm back to the requester that their personal data has been erased.
