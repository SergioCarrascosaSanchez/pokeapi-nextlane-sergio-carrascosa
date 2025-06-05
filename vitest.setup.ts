import "@testing-library/jest-dom";
import { server } from "./src/mocks/node";
import { afterAll, beforeAll } from "vitest";
import { afterEach } from "node:test";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
