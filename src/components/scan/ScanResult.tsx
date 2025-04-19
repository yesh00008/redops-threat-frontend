import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, AlertTriangle, CheckCircle, FileType, Globe, Calendar, FileText, Hash, AlertCircle } from 'lucide-react';
import { formatBytes, formatDate } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

// Component to display scan results for files and URLs
export function ScanResult({ results, type }) {
  if (!results) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {type === 'file' ? (
              <FileType className="h-5 w-5 text-primary" />
            ) : (
              <Globe className="h-5 w-5 text-primary" />
            )}
            <CardTitle>
              {type === 'file' ? 'File Analysis Results' : 'URL Analysis Results'}
            </CardTitle>
          </div>
          <Badge variant={results.verdict === 'clean' ? 'success' : 'destructive'}>
            {results.verdict === 'clean' ? 'Clean' : 'Threat Detected'}
          </Badge>
        </div>
        <CardDescription>
          {type === 'file'
            ? `Scan completed on ${formatDate(results.scanTime)}`
            : `Scan completed on ${formatDate(results.scanTime)}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary of results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Summary</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium">Threat Score</div>
              <div className="flex items-center space-x-4">
                <Progress 
                  value={results.threatDetected ? 75 : 15} 
                  className="h-2"
                  // Change color based on verdict
                  style={{
                    backgroundColor: results.verdict === 'clean' ? 'var(--success)' : 'var(--destructive)'
                  }} 
                />
                <span className="text-sm font-bold">
                  {results.threatDetected ? '75%' : '15%'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Verdict</span>
                </div>
                <Badge variant={results.verdict === 'clean' ? 'success' : 'destructive'}>
                  {results.verdict === 'clean' ? 'Clean' : 'Malicious'}
                </Badge>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Scan Date</span>
                </div>
                <span className="text-sm">{formatDate(results.scanTime)}</span>
              </div>

              {type === 'file' && (
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">File Size</span>
                  </div>
                  <span className="text-sm">{formatBytes(results.fileSize)}</span>
                </div>
              )}

              {type === 'url' && (
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Domain</span>
                  </div>
                  <span className="text-sm">{new URL(results.url).hostname}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Detailed information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Details</h3>
          
          {type === 'file' && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <FileType className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">File Type</span>
                  </div>
                  <span className="text-sm">{results.fileType}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">File Name</span>
                  </div>
                  <span className="text-sm">{results.fileName}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">SHA256</span>
                  </div>
                  <span className="text-sm truncate max-w-[200px]">{results.sha256}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">MD5</span>
                  </div>
                  <span className="text-sm truncate max-w-[200px]">{results.md5}</span>
                </div>
              </div>
            </div>
          )}

          {type === 'url' && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">URL</span>
                  </div>
                  <span className="text-sm truncate max-w-[200px]">{results.url}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">IP Address</span>
                  </div>
                  <span className="text-sm">{results.ipAddress}</span>
                </div>
              </div>

              <div className="space-y-3">
                {results.ssl && (
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">SSL Certificate</span>
                    </div>
                    <Badge variant={results.ssl.valid ? 'success' : 'destructive'}>
                      {results.ssl.valid ? 'Valid' : 'Invalid'}
                    </Badge>
                  </div>
                )}
                {results.redirectChain && results.redirectChain.length > 1 && (
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Redirects</span>
                    </div>
                    <Badge variant="warning">
                      {results.redirectChain.length - 1} redirects
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Threats found */}
        {results.threats && results.threats.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Threats Detected</h3>
              <div className="space-y-4">
                {results.threats.map((threat, index) => (
                  <Alert variant="destructive" key={index}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="flex items-center space-x-2">
                      <span>{threat.name}</span>
                      <Badge variant="outline">{threat.severity}</Badge>
                    </AlertTitle>
                    <AlertDescription>
                      {threat.description}
                      {threat.location && (
                        <div className="mt-2 text-xs">
                          Location: {threat.location}
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Clean result message */}
        {(!results.threats || results.threats.length === 0) && (
          <>
            <Separator />
            <Alert>
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertTitle>No threats detected</AlertTitle>
              <AlertDescription>
                Our scan did not detect any threats in this {type}. It appears to be clean and safe.
              </AlertDescription>
            </Alert>
          </>
        )}
      </CardContent>
    </Card>
  );
}
