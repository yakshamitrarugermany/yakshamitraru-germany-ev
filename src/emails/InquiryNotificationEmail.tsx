import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface InquiryNotificationEmailProps {
  inquiryTypeLabel: string;
  name: string;
  email: string;
  phoneDisplay?: string | null;
  phoneTelHref?: string | null;
  organization?: string | null;
  city?: string | null;
  requestedEventType?: string | null;
  preferredDate?: string | null;
  expectedAudience?: string | null;
  linkedEventTitle?: string | null;
  message: string;
  adminInboxUrl: string;
}

export function InquiryNotificationEmail({
  inquiryTypeLabel,
  name,
  email,
  phoneDisplay,
  phoneTelHref,
  organization,
  city,
  requestedEventType,
  preferredDate,
  expectedAudience,
  linkedEventTitle,
  message,
  adminInboxUrl,
}: InquiryNotificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New inquiry: {inquiryTypeLabel}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading as="h1" style={headingStyle}>
            New inquiry: {inquiryTypeLabel}
          </Heading>

          <Section style={detailsBoxStyle}>
            <Text style={detailRowStyle}>
              <strong>Type:</strong> {inquiryTypeLabel}
            </Text>
            <Text style={detailRowStyle}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={detailRowStyle}>
              <strong>Email:</strong> {email}
            </Text>
            {phoneDisplay ? (
              <Text style={detailRowStyle}>
                <strong>Phone:</strong>{" "}
                {phoneTelHref ? (
                  <Link href={phoneTelHref} style={inlineLinkStyle}>
                    {phoneDisplay}
                  </Link>
                ) : (
                  phoneDisplay
                )}
              </Text>
            ) : null}
            {organization ? (
              <Text style={detailRowStyle}>
                <strong>Organisation:</strong> {organization}
              </Text>
            ) : null}
            {city ? (
              <Text style={detailRowStyle}>
                <strong>City / Venue:</strong> {city}
              </Text>
            ) : null}
            {requestedEventType ? (
              <Text style={detailRowStyle}>
                <strong>Requested event type:</strong> {requestedEventType}
              </Text>
            ) : null}
            {preferredDate ? (
              <Text style={detailRowStyle}>
                <strong>Preferred date:</strong> {preferredDate}
              </Text>
            ) : null}
            {expectedAudience ? (
              <Text style={detailRowStyle}>
                <strong>Expected audience:</strong> {expectedAudience}
              </Text>
            ) : null}
            {linkedEventTitle ? (
              <Text style={detailRowStyle}>
                <strong>Linked event:</strong> {linkedEventTitle}
              </Text>
            ) : null}
          </Section>

          <Section style={messageBoxStyle}>
            <Text style={labelStyle}>Message</Text>
            <Text style={messageTextStyle}>{message}</Text>
          </Section>

          <Section style={actionSectionStyle}>
            <Link href={adminInboxUrl} style={linkStyle}>
              View in Admin Inbox →
            </Link>
          </Section>

          <Hr style={hrStyle} />

          <Text style={footerStyle}>
            Yakshamitraru Germany e.V. — Admin Notification
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: "#f8f6f0",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: "0",
  padding: "24px 12px",
};

const containerStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e1d8",
  borderRadius: "8px",
  margin: "0 auto",
  maxWidth: "600px",
  padding: "32px 28px",
};

const headingStyle = {
  color: "#1b3a30",
  fontSize: "22px",
  fontWeight: "600",
  lineHeight: "1.3",
  margin: "0 0 20px",
};

const detailsBoxStyle = {
  backgroundColor: "#f8f6f0",
  borderRadius: "6px",
  margin: "0 0 20px",
  padding: "16px 18px",
};

const detailRowStyle = {
  color: "#222926",
  fontSize: "14px",
  lineHeight: "1.55",
  margin: "0 0 6px",
};

const messageBoxStyle = {
  borderLeft: "3px solid #1b3a30",
  margin: "0 0 24px",
  padding: "4px 0 4px 14px",
};

const labelStyle = {
  color: "#55615c",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "0.06em",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
};

const messageTextStyle = {
  color: "#222926",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const actionSectionStyle = {
  margin: "0 0 8px",
};

const linkStyle = {
  color: "#1b3a30",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "underline",
};

const inlineLinkStyle = {
  color: "#1b3a30",
  textDecoration: "underline",
};

const hrStyle = {
  borderColor: "#e5e1d8",
  margin: "24px 0 16px",
};

const footerStyle = {
  color: "#55615c",
  fontSize: "12px",
  margin: "0",
};

export default InquiryNotificationEmail;
