import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary font-bold' : 'text-muted-foreground hover:text-primary';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo and site name */}
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center bg-black w-6 h-6 rounded text-white font-bold text-sm">
              R
            </div>
            <span className="font-bold">RedOps</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${isActive('/')}`}
          >
            Home
          </Link>
          <Link
            to="/scan"
            className={`text-sm font-medium transition-colors ${isActive('/scan')}`}
          >
            Scan
          </Link>
          <Link
            to="/encryption"
            className={`text-sm font-medium transition-colors ${isActive('/encryption')}`}
          >
            Encryption
          </Link>
        </nav>

        {/* Right-side items like auth and theme toggle */}
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <div className="flex-none items-center space-x-4">
            <ModeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden ml-2">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 pb-3 pt-2 px-4">
            <Link
              to="/"
              className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/')}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/scan"
              className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/scan')}`}
              onClick={toggleMenu}
            >
              Scan
            </Link>
            <Link
              to="/encryption"
              className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/encryption')}`}
              onClick={toggleMenu}
            >
              Encryption
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
