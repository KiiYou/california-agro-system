"use client";

import { useState } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { PageContainer } from "@/components/layout/PageContainer";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onCollapsedChange={setIsSidebarCollapsed}
        onMobileOpenChange={setIsMobileSidebarOpen}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onMobileMenuOpen={() => setIsMobileSidebarOpen(true)} />
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}
