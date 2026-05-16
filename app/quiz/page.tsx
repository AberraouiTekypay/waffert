import QuizWizard from "@/components/quiz/quiz-wizard";

export const metadata = {
  title: "Wealth Quiz",
  description: "Answer 10 questions to get your personalised educational wealth basket recommendation. Free, no account needed.",
  openGraph: {
    title: "Wealth Quiz — Waffert",
    description: "Answer 10 questions to get your personalised educational wealth basket recommendation.",
    url: "https://waffert.com/quiz",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Wealth Quiz — Waffert",
    description: "Answer 10 questions to get your personalised educational wealth basket recommendation.",
  },
};

export default function QuizPage() {
  return <QuizWizard />;
}
