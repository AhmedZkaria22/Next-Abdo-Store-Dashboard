// import { ErrorBoundary } from "./_error";
// import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    // <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Dashboard />
    // </ErrorBoundary>
  );
}
