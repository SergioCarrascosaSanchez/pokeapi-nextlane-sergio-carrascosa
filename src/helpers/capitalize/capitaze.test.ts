import { describe, expect, it } from "vitest";
import { capitalize } from "./capitalize";

describe("capitalize", () => {
  it("should capitalize the first letter of a word", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("should handle single character strings", () => {
    expect(capitalize("a")).toBe("A");
  });

  it("should not change already capitalized words", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("should handle words with mixed case", () => {
    expect(capitalize("hELLO")).toBe("HELLO");
  });

  it("should return empty string for empty input", () => {
    expect(capitalize("")).toBe("");
  });

  it("should handle strings with spaces", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });

  it("should handle strings starting with numbers", () => {
    expect(capitalize("123abc")).toBe("123abc");
  });

  it("should handle strings starting with special characters", () => {
    expect(capitalize("@hello")).toBe("@hello");
  });

  it("should handle strings with only whitespace", () => {
    expect(capitalize("   ")).toBe("   ");
  });

  it("should handle very long strings", () => {
    const longString = "a".repeat(1000);
    const expected = "A" + "a".repeat(999);
    expect(capitalize(longString)).toBe(expected);
  });
});
