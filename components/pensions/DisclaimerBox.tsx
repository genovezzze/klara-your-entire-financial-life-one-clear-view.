import { AlertTriangle } from 'lucide-react';

export function DisclaimerBox() {
  return (
    <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
      <p className="text-xs text-amber-800 leading-relaxed">
        <strong>Disclaimer:</strong> This prototype uses manually entered data and provides
        informational simulations only. It does not constitute financial advice, investment advice,
        or pension management. Real pension plan changes must be completed through official providers
        or Latvian state e-services.
      </p>
    </div>
  );
}
