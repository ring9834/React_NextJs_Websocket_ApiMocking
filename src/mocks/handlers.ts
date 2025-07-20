
//// Installs the MSW (Mock Service Worker) library as a development dependency in your project.
//// msw: The Mock Service Worker library, which intercepts HTTP requests and provides mock responses, useful for development and testing without hitting a real API.
//// --save-dev: Adds MSW to the devDependencies section of your package.json. This means MSW is only needed during development or testing, not in production.
//npm install msw --save-dev
//// Initializes MSW by generating a service worker file in the public/ directory and optionally registers it in this project.
//npx msw init public/ --save

// The mockServiceWorker.js file is a service worker that MSW uses to intercept network requests in the browser. It enables MSW to mock responses for API calls
// The service worker is registered in the browser during development.
// When your app makes a request, the service worker intercepts it and returns a mock response defined in your MSW setup (in handlers.js file).

// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

// An exported array of request handlers that MSW uses to intercept and mock network requests. Each handler defines how to respond to a specific request.
export const handlers = [
  http.get("https://api.example.com/posts", () => {
    return HttpResponse.json([
      { id: 1, title: "Mock Post", body: "Mock content", userId: 1 },
    ]);
  }),
];