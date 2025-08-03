import React, { useEffect, useState } from "react";
import { Crown } from "lucide-react";
import { useParams, Outlet } from "react-router";
import { PremiumPlanCard } from "../components";

const PRO_PLANS = [
  {
    id: "monthly",
    tag: "Monthly",
    name: "Pro Monthly",
    price: "₹10",
    priceInPaisa: 1000,
    cycle: "per month",
    features: [
      "Access to all problems",
      "Unlimited contest participation",
      "AI-powered hints",
      "Priority email support",
    ],
    cta: "Upgrade to Pro",
  },
  {
    id: "yearly",
    tag: "Yearly",
    name: "Pro Yearly",
    price: "₹100",
    priceInPaisa: 1000,
    originalPrice: "₹120",
    cycle: "per year",
    features: [
      "Access to all problems",
      "Unlimited contest participation",
      "AI-powered hints",
      "Priority email support",
    ],
    cta: "Upgrade to Pro",
    bestValue: true,
  },
];




const PremiumPage = () => {
  const { planId } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if(!planId) setSelectedPlan(null);
    const requiredPlan = PRO_PLANS.find((p) => p.id === planId);
    setSelectedPlan(requiredPlan);
  }, [planId]);

  if(!planId)
    return (
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-30">
        {/* Header */}
        <header className="text-center mb-10">
          <Crown className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-amber-400 mb-3" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e293b] dark:text-[#e2e8f0]">
            HackForge Premium
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-[#94a3b8] max-w-xl mx-auto">
            Unlock exclusive features, accelerate your learning, and land your dream job with our premium plans.
          </p>
        </header>

        {/* Plans */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 justify-center">
          {PRO_PLANS.map((plan) => (
            <PremiumPlanCard
              key={plan.id}
              plan={plan}
            />
          ))}
        </div>
      </div>
    );

    return <Outlet context={{plan: selectedPlan}}/>
};

export default PremiumPage;
