"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { useStore } from "./store-provider";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/products/veylo-wand", label: "The Veylo Wand" },
  { href: "/about", label: "Our story" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, setDrawerOpen } = useStore();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={22} strokeWidth={1.6} />
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </nav>
        <Logo />
        <div className="header-actions">
          <button className="icon-button" onClick={() => setSearchOpen((open) => !open)} aria-label="Search">
            <Search size={20} strokeWidth={1.6} />
          </button>
          <button className="bag-button" onClick={() => setDrawerOpen(true)} aria-label={`Open bag with ${itemCount} items`}>
            <ShoppingBag size={20} strokeWidth={1.6} />
            <span>Bag</span>
            <span className="bag-count">{itemCount}</span>
          </button>
        </div>
      </div>
      {searchOpen && (
        <div className="search-panel">
          <form className="site-container search-form" action="/shop">
            <Search size={20} strokeWidth={1.6} aria-hidden="true" />
            <label className="sr-only" htmlFor="site-search">Search Veylo</label>
            <input id="site-search" name="q" placeholder="Search devices and accessories" />
            <button type="button" className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X size={20} strokeWidth={1.6} />
            </button>
          </form>
        </div>
      )}
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-top">
          <Logo inverse />
          <button className="icon-button icon-button-light" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)}><span>04</span>Contact</Link>
        </nav>
        <p>Five minutes a day.<br />A calmer kind of beauty tech.</p>
      </div>
    </header>
  );
}
