import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Preview,
  Row,
  Column,
} from "@react-email/components";

interface TeamNotificationEmailProps {
  type: "waitlist" | "consultation" | "quiz";
  name: string;
  email: string;
  country?: string;
  currency?: string;
  monthlyAmount?: string;
  isHalal?: boolean;
  message?: string;
  primaryBasket?: string;
  preferredTime?: string;
}

export function TeamNotificationEmail(props: TeamNotificationEmailProps) {
  const {
    type,
    name,
    email,
    country,
    currency,
    monthlyAmount,
    isHalal,
    message,
    primaryBasket,
    preferredTime,
  } = props;

  const titles = {
    waitlist: "🎉 New early-access registration",
    consultation: "📞 New consultation request",
    quiz: "📊 New quiz completion",
  };

  const colors = {
    waitlist: "#10b981",
    consultation: "#6366f1",
    quiz: "#f59e0b",
  };

  return (
    <Html>
      <Head />
      <Preview>{titles[type]} — {name} from {country || "unknown"}</Preview>
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "32px 16px" }}>
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid #e5e7eb",
              borderTop: `4px solid ${colors[type]}`,
            }}
          >
            <Heading style={{ fontSize: "20px", fontWeight: "700", color: "#0f2744", margin: "0 0 20px" }}>
              {titles[type]}
            </Heading>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              {[
                { label: "Name", value: name },
                { label: "Email", value: email },
                country && { label: "Country", value: country },
                currency && { label: "Currency", value: currency },
                monthlyAmount && { label: "Monthly budget", value: monthlyAmount },
                isHalal !== undefined && { label: "Halal preference", value: isHalal ? "✅ Yes" : "No" },
                primaryBasket && { label: "Basket matched", value: primaryBasket },
                preferredTime && { label: "Preferred time", value: preferredTime },
                message && { label: "Message", value: message },
              ]
                .filter(Boolean)
                .map((row: any) => (
                  <tr key={row.label}>
                    <td
                      style={{
                        padding: "8px 0",
                        color: "#6b7280",
                        fontSize: "13px",
                        fontWeight: "600",
                        width: "140px",
                        verticalAlign: "top",
                      }}
                    >
                      {row.label}
                    </td>
                    <td style={{ padding: "8px 0", color: "#111827", fontSize: "14px", verticalAlign: "top" }}>
                      {row.value}
                    </td>
                  </tr>
                ))}
            </table>

            <Hr style={{ borderColor: "#e5e7eb", margin: "20px 0" }} />

            <Text style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>
              Received at {new Date().toISOString()} · Waffert Admin
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default TeamNotificationEmail;
