import "./SidebarContentLayout.css";
import { ReactNode } from "react";

interface SidebarContentLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function SidebarContentLayout({
  sidebar,
  children,
}: SidebarContentLayoutProps) {
  return (
    <div className="layout">
      <aside className="layout-sidebar" aria-label="Sidebar">
        {sidebar}
      </aside>
      <main className="layout-content">
        <section className="layout-section">{children}</section>
      </main>
    </div>
  );
}
