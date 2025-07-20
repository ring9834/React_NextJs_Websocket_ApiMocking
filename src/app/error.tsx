// src/app/error.tsx
"use client";

// designed to handle errors that occur in the component tree of a Next.js app, particularly for client-side errors in a React Server Components or Client Components context. 
// The "use client" directive indicates that this component runs on the client side.
// In Next.js (version 13 and later), an error.tsx file is used to define an Error Boundary for a specific route segment or layout in the app directory
export default function ErrorBoundary({
  // These props are automatically passed by Next.js when an error is caught in the component tree.
  error,
  reset,
}: {
  // An Error object containing details about the error that occurred (e.g., error.message).
  error: Error;
  // reset: () => void: A function provided by Next.js/React to attempt to recover from the error by re-rendering the component tree.
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
// how to use this Error Boundary in a Next.js app:
// 1. Create an error.tsx file in the same directory as your page or layout 
// 2. Define the ErrorBoundary component as shown above.
// 3. When an error occurs in the component tree, Next.js will automatically render this
// ErrorBoundary component, allowing you to display a user-friendly error message and provide a way to recover from the error (e.g., by clicking the "Try again" button).

// for example,If placed in src/app/error.tsx, it acts as a global error boundary, catching errors in the root layout (app/layout.tsx) or any route without a more specific error.tsx.