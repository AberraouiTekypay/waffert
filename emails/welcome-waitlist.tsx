import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Button,
  Hr,
  Preview,
} from "@react-email/components";

interface WelcomeWaitlistEmailProps {
  name: string;
  country: string;
  primaryBasket?: string;
}

export function WelcomeWaitlistEmail({
  name,
  country,
  primaryBasket,
}: WelcomeWaitlistEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You're registered for early access to Waffert 🌍</Preview>
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 20px" }}>
          {/* Logo */}
          <Section style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                backgroundColor: "#0f2744",
                borderRadius: "10px",
                textAlign: "center",
                lineHeight: "40px",
                color: "white",
                fontWeight: "900",
                fontSize: "18px",
              }}
            >
              W
            </div>
          </Section>

          {/* Main card */}
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "40px",
              border: "1px solid #e5e7eb",
            }}
          >
            <Heading
              style={{ fontSize: "24px", fontWeight: "700", color: "#0f2744", marginBottom: "8px" }}
            >
              You're in, {name}!
            </Heading>

            <Text style={{ color: "#6b7280", fontSize: "16px", lineHeight: "1.6", marginBottom: "24px" }}>
              Thank you for registering for early access to Waffert. You're among the first to explore
              simple monthly wealth plans designed for international savers.
            </Text>

            {primaryBasket && (
              <Section
                style={{
                  backgroundColor: "#f0fdf4",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  marginBottom: "24px",
                  borderLeft: "4px solid #10b981",
                }}
              >
                <Text style={{ color: "#065f46", fontWeight: "600", margin: "0 0 4px" }}>
                  Your recommended basket
                </Text>
                <Text style={{ color: "#047857", margin: "0", fontSize: "14px" }}>
                  {primaryBasket}
                </Text>
              </Section>
            )}

            <Text style={{ color: "#374151", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px" }}>
              We'll notify you as soon as Waffert launches investing in <strong>{country}</strong>.
              In the meantime, explore our wealth baskets and run the investment simulator.
            </Text>

            <Button
              href="https://waffert.com/baskets"
              style={{
                backgroundColor: "#0f2744",
                color: "#ffffff",
                borderRadius: "24px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Explore Wealth Baskets →
            </Button>
          </Section>

          {/* Secondary actions */}
          <Section style={{ textAlign: "center", marginTop: "24px" }}>
            <Text style={{ color: "#9ca3af", fontSize: "13px" }}>
              Want to speak to a specialist?{" "}
              <Link href="https://waffert.com/consultation" style={{ color: "#10b981" }}>
                Book a free consultation
              </Link>
            </Text>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "32px 0" }} />

          {/* Disclaimer */}
          <Text style={{ color: "#9ca3af", fontSize: "11px", lineHeight: "1.5", textAlign: "center" }}>
            Waffert is currently in early access. This platform provides educational simulations only
            and does not provide investment advice, execute trades, hold client money, or provide custody.
            Capital is at risk. Always seek independent financial advice before investing.
          </Text>

          <Text style={{ color: "#d1d5db", fontSize: "11px", textAlign: "center", marginTop: "8px" }}>
            © {new Date().getFullYear()} Waffert · waffert.com ·{" "}
            <Link href="https://waffert.com/legal/privacy" style={{ color: "#d1d5db" }}>
              Privacy Policy
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeWaitlistEmail;
