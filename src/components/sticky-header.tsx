"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeaverboardHome } from "./leaverboard-home";

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header
        style={{ display: "none" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-background/80 backdrop-blur-sm h-16"
            : "bg-background h-20"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-primary">
            Logo
          </a>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-primary hover:text-primary/80">
              Home
            </a>
            <a href="#" className="text-primary hover:text-primary/80">
              About
            </a>
            <a href="#" className="text-primary hover:text-primary/80">
              Services
            </a>
            <a href="#" className="text-primary hover:text-primary/80">
              Contact
            </a>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </header>
      <main className="pt-20 container mx-auto px-4">
        <LeaverboardHome></LeaverboardHome>
      </main>
    </div>
  );
}
