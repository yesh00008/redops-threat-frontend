import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Globe, Key, Menu, Shield, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  // Navigation links with icons
  const navLinks = [
    { name: 'Scan', href: '/scan', icon: <Shield className="h-4 w-4 mr-2" /> },
    { name: 'Encryption', href: '/encryption', icon: <Key className="h-4 w-4 mr-2" /> },
    { name: 'Bounty Finder', href: '/bounty-finder', icon: <Globe className="h-4 w-4 mr-2" /> },
    { name: 'Dashboard', href: '/dashboard', icon: <FileText className="h-4 w-4 mr-2" /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        {/* Logo and title */}
        <Link to="/" className="flex items-center gap-2">
          {/* Logo: Black square with white "G" */}
          <div className="flex h-8 w-8 items-center justify-center rounded bg-black text-white font-bold">
            G
          </div>
          <span className="text-xl font-bold">Giga LLM</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center justify-between flex-1">
          <div className="flex gap-6 ml-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center text-sm font-medium transition-colors ${isActive(link.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
          <div>
            <a href="https://github.com/yesh00008/giga-llm" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                GitHub
              </Button>
            </a>
          </div>
        </div>

        {/* Mobile navigation toggle */}
        <div className="md:hidden flex-1 flex justify-end">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isOpen && (
        <div className="md:hidden border-t p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center p-2 text-sm font-medium rounded-md ${isActive(link.href) ? 'bg-muted' : 'hover:bg-muted'}`}
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t">
            <a href="https://github.com/yesh00008/giga-llm" target="_blank" rel="noopener noreferrer" className="flex items-center p-2 text-sm font-medium rounded-md hover:bg-muted">
              <span className="mr-2 text-xs bg-muted rounded-full px-2 py-1">GitHub</span>
              View Source
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
