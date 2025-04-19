import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Globe, Key, ChevronRight } from 'lucide-react';

/**
 * Homepage component with links to main features
 */
export function Index() {
  return (
    <div className="flex flex-col space-y-16 py-8">
      {/* Hero section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Advanced Threat Intelligence Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Scan files, analyze URLs, and detect threats with our advanced cybersecurity tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/scan">
              <Button size="lg" className="w-full sm:w-auto">
                <Shield className="mr-2 h-5 w-5" /> Start Scanning
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md h-full bg-muted rounded-lg flex items-center justify-center p-8">
            <div className="relative w-full h-64 text-primary">
              <Shield className="absolute top-0 left-0 w-16 h-16 opacity-50" />
              <FileText className="absolute top-1/3 right-1/4 w-12 h-12 opacity-70" />
              <Globe className="absolute bottom-1/4 left-1/3 w-14 h-14 opacity-60" />
              <Key className="absolute bottom-0 right-0 w-10 h-10 opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background p-4 rounded-full shadow-lg">
                  <Shield className="w-20 h-20 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive suite of tools helps keep your systems and data secure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>File Scanning</CardTitle>
              <CardDescription>
                Scan files for malware, viruses, and other threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload any file to detect malware, malicious code, and suspicious behaviors with our advanced scanning engine.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/scan" className="text-primary font-medium flex items-center hover:underline">
                Scan Files <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>URL Analysis</CardTitle>
              <CardDescription>
                Check URLs for phishing and malicious content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analyze web URLs to detect phishing attempts, malicious content, and security vulnerabilities before visiting.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/scan" className="text-primary font-medium flex items-center hover:underline">
                Analyze URLs <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Key className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Encryption Tools</CardTitle>
              <CardDescription>
                Secure your data with encryption tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Encrypt and decrypt sensitive data, generate secure passwords, and create cryptographic hashes.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/encryption" className="text-primary font-medium flex items-center hover:underline">
                Encrypt Data <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-muted p-8 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Start Securing Your Digital Assets Today</h2>
            <p className="text-muted-foreground max-w-md">
              Our comprehensive security tools help you stay protected in an increasingly dangerous digital landscape.
            </p>
          </div>
          <Link to="/scan">
            <Button size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
