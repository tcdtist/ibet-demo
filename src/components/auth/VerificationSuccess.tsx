"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

function ConfettiEffect() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showConfetti) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-bounce text-6xl">🎉</div>
      </div>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={`absolute animate-ping ${
            i % 2 === 0 ? "text-blue-400" : "text-green-400"
          }`}
          style={{
            left: `${20 + i * 8}%`,
            top: `${20 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}

function WelcomeStats() {
  const [stats] = useState({
    gamesAvailable: 150,
    usersOnline: 1247,
    jackpotAmount: "$125,892",
  });

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-blue-50 border border-blue-200 p-3 rounded text-center">
        <div className="text-lg font-bold text-blue-700">
          {stats.gamesAvailable}+
        </div>
        <div className="text-xs text-blue-600">Games</div>
      </div>
      <div className="bg-green-50 border border-green-200 p-3 rounded text-center">
        <div className="text-lg font-bold text-green-700">
          {stats.usersOnline}
        </div>
        <div className="text-xs text-green-600">Online</div>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-center">
        <div className="text-lg font-bold text-yellow-700">
          {stats.jackpotAmount}
        </div>
        <div className="text-xs text-yellow-600">Jackpot</div>
      </div>
    </div>
  );
}

export default function VerificationSuccess({
  user,
  onContinue,
}: {
  user?: any;
  onContinue: () => void;
}) {
  const [showWelcomeBonus, setShowWelcomeBonus] = useState(true);

  return (
    <div className="relative">
      <ConfettiEffect />

      <Card className="p-8 max-w-md text-center relative z-10">
        <div className="mb-6">
          <div className="relative">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <Sparkles className="w-6 h-6 text-yellow-500 absolute top-0 right-1/2 transform translate-x-8 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to iGaming Demo!
          </h1>
          <p className="text-gray-600">
            Your account has been successfully verified and is ready to use.
          </p>
        </div>

        {user && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {user.email?.charAt(0).toUpperCase() || "?"}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900">{user.email}</p>
            <p className="text-xs text-gray-600">Account verified ✅</p>
          </div>
        )}

        <WelcomeStats />

        {showWelcomeBonus && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-4 rounded-lg mb-6">
            <div className="text-2xl mb-2">🎁</div>
            <p className="text-sm font-medium text-purple-900 mb-1">
              Welcome Bonus
            </p>
            <p className="text-lg font-bold text-purple-700">
              $10 Free Credits
            </p>
            <p className="text-xs text-purple-600">
              Ready to use in your account
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Button onClick={onContinue} size="lg" className="w-full">
            <ArrowRight className="w-5 h-5 mr-2" />
            Start Playing
          </Button>

          <p className="text-xs text-gray-500">
            Explore games, tournaments, and more!
          </p>
        </div>
      </Card>
    </div>
  );
}
