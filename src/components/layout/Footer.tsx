import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-2">
          <Link to="/" className="flex items-center gap-2">
            {/* Logo: Black square with white "G" */}
            <div className="flex h-8 w-8 items-center justify-center rounded bg-black text-white font-bold">
              G
            </div>
            <span className="text-xl font-bold">Giga LLM</span>
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Open source contribution
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/scan" className="text-muted-foreground hover:text-foreground transition-colors">
                  Threat Scanner
                </Link>
              </li>
              <li>
                <Link to="/encryption" className="text-muted-foreground hover:text-foreground transition-colors">
                  Encryption Tools
                </Link>
              </li>
              <li>
                <Link to="/bounty-finder" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bounty Finder
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/yesh00008/giga-llm" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mt-6 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Giga LLM. All rights reserved.</p>
      </div>
    </footer>
  );
}
