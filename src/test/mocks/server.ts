import { setupServer } from "msw/node";
import { awsHandlers } from "@/test/mocks/handlers/aws";
import { provisionHandlers } from "@/test/mocks/handlers/provision";

export const handlers = [
  ...awsHandlers,
  ...provisionHandlers,
];

export const server = setupServer(...handlers);
