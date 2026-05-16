"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { QuizAnswer } from "@/lib/types";
import { track } from "@/lib/analytics";

const COUNTRIES = [
  "France", "Germany", "Spain", "Italy", "Netherlands", "Belgium", "Portugal",
  "United Kingdom", "UAE", "Saudi Arabia", "Qatar", "Kuwait", "Morocco",
  "Algeria", "Tunisia", "Egypt", "Nigeria", "Senegal", "Côte d'Ivoire",
  "South Africa", "Kenya", "Canada", "United States", "Other",
];

const CURRENCIES = [
  { code: "EUR", label: "Euro (EUR)" },
  { code: "GBP", label: "British Pound (GBP)" },
  { code: "USD", label: "US Dollar (USD)" },
  { code: "AED", label: "UAE Dirham (AED)" },
  { code: "MAD", label: "Moroccan Dirham (MAD)" },
  { code: "DZD", label: "Algerian Dinar (DZD)" },
  { code: "NGN", label: "Nigerian Naira (NGN)" },
  { code: "SAR", label: "Saudi Riyal (SAR)" },
  { code: "Other", label: "Other" },
];

const GOALS = [
  { value: "growth", label: "Long-term wealth growth", emoji: "📈" },
  { value: "retirement", label: "Retirement planning", emoji: "🌅" },
  { value: "education", label: "Child's education", emoji: "🎓" },
  { value: "income", label: "Regular income from investments", emoji: "💰" },
  { value: "preservation", label: "Protect my savings from inflation", emoji: "🛡️" },
  { value: "house", label: "Buy property in the future", emoji: "🏠" },
  { value: "balanced_growth", label: "Balanced growth and stability", emoji: "⚖️" },
];

const RISK_LABELS = [
  { value: "very_low", label: "Very conservative — protect my capital above all" },
  { value: "low", label: "Conservative — modest growth, limited risk" },
  { value: "medium", label: "Balanced — comfortable with some ups and downs" },
  { value: "high", label: "Growth-oriented — I can handle market swings" },
  { value: "very_high", label: "Aggressive — maximum long-term growth" },
];

const MONTHLY_BANDS = [
  { value: 50, label: "Up to €100/month" },
  { value: 150, label: "€100 – €250" },
  { value: 375, label: "€250 – €500" },
  { value: 750, label: "€500 – €1,000" },
  { value: 1500, label: "€1,000 – €2,000" },
  { value: 3000, label: "€2,000+" },
];

const LUMP_BANDS = [
  { value: 0, label: "No lump sum right now" },
  { value: 1000, label: "Up to €1,000" },
  { value: 5000, label: "€1,000 – €5,000" },
  { value: 15000, label: "€5,000 – €25,000" },
  { value: 50000, label: "€25,000 – €100,000" },
  { value: 150000, label: "€100,000+" },
];

const TIME_HORIZONS = [
  { value: 2, label: "Less than 2 years" },
  { value: 4, label: "2–5 years" },
  { value: 8, label: "5–10 years" },
  { value: 15, label: "10–20 years" },
  { value: 25, label: "20+ years" },
];

interface Step {
  id: string;
  title: string;
  subtitle?: string;
}

const STEPS: Step[] = [
  { id: "intro", title: "Let's build your wealth plan", subtitle: "10 quick questions to find your ideal strategy" },
  { id: "country", title: "Where do you currently live?" },
  { id: "currency", title: "What currency do you earn in?" },
  { id: "target_currency", title: "What currency do you want to build wealth in?", subtitle: "Choose your target wealth currency" },
  { id: "monthly", title: "How much could you invest monthly?" },
  { id: "lump_sum", title: "Do you have a lump sum to invest?" },
  { id: "time_horizon", title: "What is your investment time horizon?" },
  { id: "goal", title: "What is your primary investment goal?" },
  { id: "risk", title: "How would you describe your risk appetite?" },
  { id: "halal", title: "Do you require Shariah-compliant (Halal) investments?" },
  { id: "diaspora", title: "Do you want exposure to emerging markets or your home region?", subtitle: "Relevant for diaspora investors" },
  { id: "guidance", title: "Would you like to speak to a wealth specialist?" },
];

const DEFAULT_ANSWERS: QuizAnswer = {
  country: "",
  currency: "EUR",
  targetCurrency: "EUR",
  monthlyAmount: 375,
  lumpSum: 0,
  timeHorizon: 8,
  riskTolerance: "medium",
  goal: "growth",
  isHalal: false,
  wantsDiaspora: false,
  needsGuidance: false,
};

interface SelectOptionProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

function SelectOption({ selected, onClick, children, className }: SelectOptionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium text-sm",
        selected
          ? "border-emerald-500 bg-emerald-50 text-emerald-800"
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {children}
        {selected && <CheckCircle size={16} className="text-emerald-500 shrink-0 ml-2" />}
      </div>
    </button>
  );
}

export default function QuizWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>(DEFAULT_ANSWERS);
  const [submitting, setSubmitting] = useState(false);

  // Track quiz start on first render
  useEffect(() => {
    track("quiz_started");
  }, []);

  const totalSteps = STEPS.length;
  const stepId = STEPS[currentStep].id;
  const progress = (currentStep / (totalSteps - 1)) * 100;

  function update(partial: Partial<QuizAnswer>) {
    setAnswers((prev) => ({ ...prev, ...partial }));
  }

  function canProceed(): boolean {
    if (stepId === "intro") return true;
    if (stepId === "country") return !!answers.country;
    if (stepId === "currency") return !!answers.currency;
    if (stepId === "target_currency") return !!answers.targetCurrency;
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      // Navigate to result with quiz session id
      router.push(`/quiz/result?id=${data.id}`);
    } catch (err) {
      console.error(err);
      // Still navigate — store answers in session storage as fallback
      sessionStorage.setItem("waffert_quiz", JSON.stringify(answers));
      router.push("/quiz/result?local=1");
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    if (!canProceed()) {
      toast.error("Please make a selection to continue");
      return;
    }
    if (currentStep < totalSteps - 1) {
      track("quiz_step_completed", { step: currentStep, step_id: stepId });
      setCurrentStep((s) => s + 1);
    } else {
      track("quiz_completed", {
        country: answers.country,
        goal: answers.goal,
        is_halal: answers.isHalal,
        monthly_amount: answers.monthlyAmount,
        risk_tolerance: answers.riskTolerance,
      });
      handleSubmit();
    }
  }

  function back() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  const step = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress header */}
      {currentStep > 0 && (
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Step {currentStep} of {totalSteps - 1}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Step heading */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f2744] mb-2">
              {step.title}
            </h1>
            {step.subtitle && (
              <p className="text-gray-500">{step.subtitle}</p>
            )}
          </div>

          {/* Step content */}
          <div className="space-y-3">
            {stepId === "intro" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <div className="text-6xl mb-4">🌍</div>
                <h2 className="text-xl font-semibold text-[#0f2744] mb-3">
                  Your free global wealth plan
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Answer 10 questions and we'll match you with an educational wealth basket suited to your goals, currency, and risk appetite. Takes about 5 minutes.
                </p>
                <div className="flex flex-wrap gap-3 justify-center text-sm text-gray-500">
                  {["Free", "No account needed", "Educational only", "5 minutes"].map((tag) => (
                    <span key={tag} className="bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-xs text-gray-400 max-w-sm mx-auto">
                  This quiz is educational. Results are illustrative and do not constitute personalised financial advice.
                </p>
              </div>
            )}

            {stepId === "country" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COUNTRIES.map((c) => (
                  <SelectOption
                    key={c}
                    selected={answers.country === c}
                    onClick={() => update({ country: c })}
                  >
                    {c}
                  </SelectOption>
                ))}
              </div>
            )}

            {stepId === "currency" && (
              <div className="grid grid-cols-1 gap-2">
                {CURRENCIES.map((c) => (
                  <SelectOption
                    key={c.code}
                    selected={answers.currency === c.code}
                    onClick={() => update({ currency: c.code })}
                  >
                    {c.label}
                  </SelectOption>
                ))}
              </div>
            )}

            {stepId === "target_currency" && (
              <div className="grid grid-cols-1 gap-2">
                {CURRENCIES.map((c) => (
                  <SelectOption
                    key={c.code}
                    selected={answers.targetCurrency === c.code}
                    onClick={() => update({ targetCurrency: c.code })}
                  >
                    {c.label}
                  </SelectOption>
                ))}
              </div>
            )}

            {stepId === "monthly" && (
              <div className="grid grid-cols-1 gap-2">
                {MONTHLY_BANDS.map((b) => (
                  <SelectOption
                    key={b.value}
                    selected={answers.monthlyAmount === b.value}
                    onClick={() => update({ monthlyAmount: b.value })}
                  >
                    {b.label}
                  </SelectOption>
                ))}
              </div>
            )}

            {stepId === "lump_sum" && (
              <div className="grid grid-cols-1 gap-2">
                {LUMP_BANDS.map((b) => (
                  <SelectOption
                    key={b.value}
                    selected={answers.lumpSum === b.value}
                    onClick={() => update({ lumpSum: b.value })}
                  >
                    {b.label}
                  </SelectOption>
                ))}
              </div>
            )}

            {stepId === "time_horizon" && (
              <div className="grid grid-cols-1 gap-2">
                {TIME_HORIZONS.map((t) => (
                  <SelectOption
                    key={t.value}
                    selected={answers.timeHorizon === t.value}
                    onClick={() => update({ timeHorizon: t.value })}
                  >
                    {t.label}
                  </SelectOption>
                ))}
              </div>
            )}

            {stepId === "goal" && (
              <div className="grid grid-cols-1 gap-2">
                {GOALS.map((g) => (
                  <SelectOption
                    key={g.value}
                    selected={answers.goal === g.value}
                    onClick={() => update({ goal: g.value })}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{g.emoji}</span>
                      {g.label}
                    </span>
                  </SelectOption>
                ))}
              </div>
            )}

            {stepId === "risk" && (
              <div className="grid grid-cols-1 gap-2">
                {RISK_LABELS.map((r) => (
                  <SelectOption
                    key={r.value}
                    selected={answers.riskTolerance === r.value}
                    onClick={() => update({ riskTolerance: r.value })}
                  >
                    {r.label}
                  </SelectOption>
                ))}
              </div>
            )}

            {stepId === "halal" && (
              <div className="grid grid-cols-1 gap-2">
                <SelectOption
                  selected={answers.isHalal === true}
                  onClick={() => update({ isHalal: true })}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">☪️</span>
                    Yes — I require Shariah-compliant investments
                  </span>
                </SelectOption>
                <SelectOption
                  selected={answers.isHalal === false}
                  onClick={() => update({ isHalal: false })}
                >
                  No — conventional investments are fine
                </SelectOption>
              </div>
            )}

            {stepId === "diaspora" && (
              <div className="grid grid-cols-1 gap-2">
                <SelectOption
                  selected={answers.wantsDiaspora === true}
                  onClick={() => update({ wantsDiaspora: true })}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">🌱</span>
                    Yes — include emerging market / home region exposure
                  </span>
                </SelectOption>
                <SelectOption
                  selected={answers.wantsDiaspora === false}
                  onClick={() => update({ wantsDiaspora: false })}
                >
                  No — focus on developed markets only
                </SelectOption>
              </div>
            )}

            {stepId === "guidance" && (
              <div className="grid grid-cols-1 gap-2">
                <SelectOption
                  selected={answers.needsGuidance === true}
                  onClick={() => update({ needsGuidance: true })}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">🤝</span>
                    Yes — I'd like to speak to a specialist
                  </span>
                </SelectOption>
                <SelectOption
                  selected={answers.needsGuidance === false}
                  onClick={() => update({ needsGuidance: false })}
                >
                  No thanks — I'm comfortable exploring on my own
                </SelectOption>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="ghost"
              onClick={back}
              disabled={currentStep === 0}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={16} className="mr-1" /> Back
            </Button>
            <Button
              onClick={next}
              disabled={submitting}
              className="bg-[#0f2744] hover:bg-[#1a3a5c] text-white rounded-full px-8"
            >
              {submitting
                ? "Processing..."
                : currentStep === totalSteps - 1
                ? "Get my wealth plan"
                : "Continue"}
              {!submitting && <ArrowRight size={16} className="ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
