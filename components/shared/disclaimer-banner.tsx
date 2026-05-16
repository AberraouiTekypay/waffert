import { AlertTriangle } from "lucide-react";

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
      <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
      <p className="text-xs text-amber-800 leading-relaxed">
        <strong>Educational purposes only.</strong> The content on this page is illustrative and does not constitute personalised financial advice, an investment recommendation, or an offer to buy or sell any security. Waffert is not a regulated investment adviser. All projections and basket illustrations are hypothetical. Capital is at risk. Always seek independent financial advice before investing.
      </p>
    </div>
  );
}
