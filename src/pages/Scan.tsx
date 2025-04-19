import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileType, Shield, Upload, Search, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ScanResult } from '@/components/scan/ScanResult';
import { Separator } from '@/components/ui/separator';

export function Scan() {
  const [activeTab, setActiveTab] = useState('file');
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState('');

  // Handle file drop
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB max size
    onDrop: () => {
      setError('');
      setScanComplete(false);
    }
  });

  // Mock scan function
  const startScan = (type) => {
    setScanning(true);
    setProgress(0);
    setScanComplete(false);
    setScanResults(null);
    setError('');
    
    // Mock progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);

    // Mock scan completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setScanning(false);
      setScanComplete(true);
      
      // Generate mock results
      if (type === 'file') {
        if (acceptedFiles.length > 0) {
          setScanResults(generateMockFileResults(acceptedFiles[0]));
        } else {
          setError('No file selected for scanning');
        }
      } else if (type === 'url') {
        if (url.trim()) {
          setScanResults(generateMockUrlResults(url));
        } else {
          setError('No URL provided for scanning');
        }
      }
    }, 4000);
  };

  // Generate mock file scan results
  const generateMockFileResults = (file) => {
    const threats = [
      { type: 'malware', name: 'Trojan.GenericKD.45237721', severity: 'high', description: 'Generic trojan detected in file', location: 'section 0x4502' },
      { type: 'suspicious', name: 'Suspicious.Behavior.ExecutableCode', severity: 'medium', description: 'Executable code found in unexpected location', location: 'offset 0x892A4' }
    ];
    
    return {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || 'application/octet-stream',
      scanTime: new Date().toISOString(),
      sha256: generateMockHash('sha256'),
      md5: generateMockHash('md5'),
      threatDetected: Math.random() > 0.5,
      threats: Math.random() > 0.5 ? threats : [],
      verdict: Math.random() > 0.5 ? 'malicious' : 'clean'
    };
  };

  // Generate mock URL scan results
  const generateMockUrlResults = (urlString) => {
    const threats = [
      { type: 'phishing', name: 'Phishing.Credential.Theft', severity: 'critical', description: 'Page attempts to steal credentials' },
      { type: 'malware', name: 'Exploit.CVE-2023-1234', severity: 'high', description: 'Page contains exploit code targeting browser vulnerabilities' }
    ];
    
    return {
      url: urlString,
      scanTime: new Date().toISOString(),
      ipAddress: '192.168.1.' + Math.floor(Math.random() * 255),
      threatDetected: Math.random() > 0.5,
      threats: Math.random() > 0.5 ? threats : [],
      redirectChain: Math.random() > 0.7 ? [
        urlString,
        'https://redirect1.malicious-domain.com',
        'https://final.malicious-domain.com'
      ] : [],
      ssl: {
        valid: Math.random() > 0.3,
        issuer: 'DigiCert Inc',
        expiryDate: new Date(Date.now() + 30*24*60*60*1000).toISOString()
      },
      verdict: Math.random() > 0.5 ? 'malicious' : 'clean'
    };
  };

  // Helper to generate mock hashes
  const generateMockHash = (type) => {
    const length = type === 'md5' ? 32 : 64;
    const chars = '0123456789abcdef';
    return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  return (
    <div className="space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Shield className="mr-2 h-6 w-6" /> Threat Scanner
        </h1>
        <p className="text-muted-foreground mt-2">Scan files or URLs for malware, viruses, and other threats</p>
      </div>

      <Tabs defaultValue="file" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="file" className="text-lg py-3">
            <FileType className="mr-2 h-5 w-5" />
            File Scan
          </TabsTrigger>
          <TabsTrigger value="url" className="text-lg py-3">
            <Search className="mr-2 h-5 w-5" />
            URL Scan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload File for Scanning</CardTitle>
              <CardDescription>
                Drag and drop a file or click to browse. Maximum file size: 50MB.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                
                {acceptedFiles.length > 0 ? (
                  <div className="bg-muted p-4 rounded-lg flex items-center space-x-4 mb-4">
                    <File className="h-8 w-8 text-primary"/>
                    <div className="space-y-1 flex-1 truncate">
                      <div className="font-medium truncate">{acceptedFiles[0].name}</div>
                      <div className="text-sm text-muted-foreground">
                        {(acceptedFiles[0].size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <Badge variant="outline">
                      {acceptedFiles[0].type || 'Unknown type'}
                    </Badge>
                  </div>
                ) : (
                  <>
                    <p className="text-xl font-medium mb-1">Drop your file here or click to browse</p>
                    <p className="text-muted-foreground">Supports executables, documents, archives, and more</p>
                  </>
                )}
                
                {fileRejections.length > 0 && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Upload Error</AlertTitle>
                    <AlertDescription>
                      {fileRejections[0].errors[0].message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg" 
                disabled={acceptedFiles.length === 0 || scanning}
                onClick={() => startScan('file')}
              >
                {scanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Scan File
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="url" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scan URL for Threats</CardTitle>
              <CardDescription>
                Enter a URL to check for phishing, malware, and suspicious content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <Input 
                    placeholder="https://example.com" 
                    value={url} 
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setScanComplete(false);
                      setError('');
                    }}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg"
                disabled={!url.trim() || scanning}
                onClick={() => startScan('url')}
              >
                {scanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Scan URL
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {scanning && (
        <Card>
          <CardHeader>
            <CardTitle>Scan in Progress</CardTitle>
            <CardDescription>
              {activeTab === 'file' 
                ? 'Analyzing file for malware and suspicious content' 
                : 'Checking URL for threats and malicious content'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-muted-foreground text-center">
                {progress.toFixed(0)}% complete
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {scanComplete && scanResults && (
        <div className="space-y-4">
          <Separator />
          <div className="flex items-center space-x-2">
            {scanResults.verdict === 'clean' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-destructive" />
            )}
            <h2 className="text-2xl font-bold">Scan Results</h2>
          </div>
          <ScanResult results={scanResults} type={activeTab} />
        </div>
      )}
    </div>
  );
}
