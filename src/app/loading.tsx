// app/loading.tsx
// The real page-load experience is handled by PageWrapper (client component).
// This file handles Next.js App Router Suspense boundaries during navigation.
// Returns null to avoid a double loading screen on route changes.
export default function Loading() {
  return null;
}
