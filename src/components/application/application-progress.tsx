"use client";

import { Progress } from "@/components/ui/progress";
import { useApplication } from "@/lib/context/application-context";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const steps = [
  { id: 1, name: "Personal Information" },
  { id: 2, name: "Contact Details" },
  { id: 3, name: "Passport Options" },
  { id: 4, name: "Documents" },
  { id: 5, name: "Payment" },
  { id: 6, name: "Review & Submit" },
];

export function ApplicationProgress({ className }: { className?: string }) {
  const { applicationState, goToStep } = useApplication();
  const { currentStep } = applicationState;

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className={cn("w-full", className)}>
      <Progress value={progressPercentage} className="h-2 mb-6" />
      
      <div className="hidden md:flex justify-between">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => {
                // Only allow navigating to completed steps or the current step
                if (isCompleted || isActive) {
                  goToStep(step.id);
                }
              }}
              className={cn(
                "flex flex-col items-center group",
                (isCompleted || isActive) ? "cursor-pointer" : "cursor-not-allowed opacity-70"
              )}
              disabled={!isCompleted && !isActive}
            >
              <div className="flex items-center justify-center mb-2">
                {isCompleted ? (
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                ) : (
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full border-2 flex items-center justify-center",
                      isActive
                        ? "border-green-600 text-green-600"
                        : "border-gray-300 text-gray-300"
                    )}
                  >
                    {step.id}
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive
                    ? "text-gray-900"
                    : isCompleted
                    ? "text-green-600"
                    : "text-gray-500"
                )}
              >
                {step.name}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Mobile Step Indicator */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          Step {currentStep} of {steps.length}
        </span>
        <span className="text-sm font-medium text-gray-900">
          {steps[currentStep - 1].name}
        </span>
      </div>
    </div>
  );
} 