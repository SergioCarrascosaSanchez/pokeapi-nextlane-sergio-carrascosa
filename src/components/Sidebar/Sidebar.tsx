"use client";
import { SidebarContent } from "../SidebarContent/SidebarContent";
import Image from "next/image";
import "./Sidebar.css";
import { useState } from "react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Image src="/pokeapi.png" alt="PokéAPI logo" width={185} height={105} />
        <Image
          src="/burger-menu.svg"
          alt="Toggle menu"
          width={50}
          height={50}
          onClick={() => setIsOpen(!isOpen)}
          className="sidebar-toggle"
        />
      </div>

      <div
        className={`sidebar-list ${isOpen ? "open" : ""}`}
        data-testid="sidebar-list"
      >
        <SidebarContent />
      </div>
    </div>
  );
}
