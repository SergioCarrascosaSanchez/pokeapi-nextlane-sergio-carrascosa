// SidebarContentLayout.test.tsx
import { render, screen } from "@testing-library/react";
import { SidebarContentLayout } from "./SidebarContentLayout";
import { describe, expect, it } from "vitest";

describe("SidebarContentLayout", () => {
  it("renders sidebar and content properly", () => {
    render(
      <SidebarContentLayout sidebar={<nav>Sidebar Nav</nav>}>
        <article>Main Content</article>
      </SidebarContentLayout>
    );

    const sidebar = screen.getByLabelText("Sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveTextContent("Sidebar Nav");

    const content = screen.getByText("Main Content");
    expect(content).toBeInTheDocument();

    expect(sidebar.tagName).toBe("ASIDE");
    expect(content.closest("main")?.tagName).toBe("MAIN");
    expect(content.closest("section")?.className).toContain("layout-section");

    expect(sidebar).toHaveClass("layout-sidebar");
    expect(content.closest("main")).toHaveClass("layout-content");
  });
});
