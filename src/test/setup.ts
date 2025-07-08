import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { server } from "@/test/mocks/server";
import { setupAWSMocks } from "@/test/utils/aws-mocks";

// Mock PointerEvent for Radix UI components
export class MockPointerEvent extends Event {
  button: number | undefined;
  pointerId: number | undefined;
  width: number | undefined;
  height: number | undefined;
  pressure: number | undefined;
  tangentialPressure: number | undefined;
  tiltX: number | undefined;
  tiltY: number | undefined;
  twist: number | undefined;
  pointerType: string | undefined;
  isPrimary: boolean | undefined;

  constructor(type: string, props?: any) {
    super(type, props);
  }
}

// Setup global mocks
beforeAll(() => {
  // Mock PointerEvent for Radix UI
  global.PointerEvent = MockPointerEvent as any;
  if (typeof window !== "undefined") {
    window.HTMLElement.prototype.setPointerCapture = vi.fn();
    window.HTMLElement.prototype.releasePointerCapture = vi.fn();
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  }

  // Start MSW server
  server.listen({ onUnhandledRequest: "error" });
  
  // Setup AWS mocks
  setupAWSMocks();
});

afterEach(() => {
  // Reset handlers after each test
  server.resetHandlers();
  
  // Clear all mocks
  vi.clearAllMocks();
});

afterAll(() => {
  // Close MSW server
  server.close();
});
