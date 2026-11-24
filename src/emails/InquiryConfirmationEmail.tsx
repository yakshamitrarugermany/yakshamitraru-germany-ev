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

export interface InquiryConfirmationEmailProps {
  name: string;
  message: string;
  phoneDisplay?: string | null;
  phoneTelHref?: string | null;
  linkedEventTitle?: string | null;
}

export function InquiryConfirmationEmail({
  name,
  message,
  phoneDisplay,
  phoneTelHref,
  linkedEventTitle,
}: InquiryConfirmationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Thank you for contacting Yakshamitraru Germany e.V. — we received your
        inquiry.
      </Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading as="h1" style={headingStyle}>
            Thank you for your inquiry
          </Heading>

          <Text style={paragraphStyle}>Dear {name},</Text>

          <Text style={paragraphStyle}>
            Thank you for reaching out to Yakshamitraru Germany e.V. We have
            received your inquiry
            {linkedEventTitle ? ` regarding "${linkedEventTitle}"` : ""} and
            will reply as soon as possible.
          </Text>

          <Section style={quoteBoxStyle}>
            <Text style={quoteLabelStyle}>Your message</Text>
            <Text style={quoteTextStyle}>{message}</Text>
            {phoneDisplay ? (
              <Text style={phoneRowStyle}>
                <strong>Phone:</strong>{" "}
                {phoneTelHref ? (
                  <Link href={phoneTelHref} style={phoneLinkStyle}>
                    {phoneDisplay}
                  </Link>
                ) : (
                  phoneDisplay
                )}
              </Text>
            ) : null}
          </Section>

          <Text style={privacyStyle}>
            Your personal data is used solely to answer this inquiry.
          </Text>

          <Hr style={hrStyle} />

          <Text style={footerStyle}>Yakshamitraru Germany e.V.</Text>
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
  maxWidth: "580px",
  padding: "32px 28px",
};

const headingStyle = {
  color: "#1b3a30",
  fontSize: "22px",
  fontWeight: "600",
  lineHeight: "1.3",
  margin: "0 0 20px",
};

const paragraphStyle = {
  color: "#222926",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const quoteBoxStyle = {
  backgroundColor: "#f8f6f0",
  borderLeft: "3px solid #1b3a30",
  borderRadius: "4px",
  margin: "20px 0",
  padding: "14px 16px",
};

const quoteLabelStyle = {
  color: "#55615c",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "0.06em",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
};

const quoteTextStyle = {
  color: "#222926",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const phoneRowStyle = {
  color: "#222926",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "12px 0 0",
};

const phoneLinkStyle = {
  color: "#1b3a30",
  textDecoration: "underline",
};

const privacyStyle = {
  color: "#55615c",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "20px 0 0",
};

const hrStyle = {
  borderColor: "#e5e1d8",
  margin: "24px 0 16px",
};

const footerStyle = {
  color: "#55615c",
  fontSize: "13px",
  fontWeight: "500",
  margin: "0",
};

export default InquiryConfirmationEmail;
