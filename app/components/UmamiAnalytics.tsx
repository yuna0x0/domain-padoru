"use client";

import { useUmami } from "../hooks/useUmami";
import { ErrorBoundary } from "./ErrorBoundary";

const UmamiAnalyticsInner = () => {
  const { error } = useUmami();

  if (error && process.env.NODE_ENV === "development") {
    return <div>Umami Analytics Error: {error.message}</div>;
  }

  return null;
};

export const UmamiAnalytics = () => {
  return (
    <ErrorBoundary>
      <UmamiAnalyticsInner />
    </ErrorBoundary>
  );
};
