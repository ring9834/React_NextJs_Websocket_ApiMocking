// src/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// setupServer(...handlers): Creates an MSW server instance configured with the provided handlers. 
// The spread operator (...handlers) passes the array of handlers to the server.
// server: The exported server instance, which can be used to control MSW’s behavior (start, stop, or reset handlers) in your application or tests.
// This server intercepts HTTP requests made in a Node.js environment (by axiosInstance in PostsPage) and returns mock responses defined in handlers.
export const server = setupServer(...handlers);