import React from 'react';
import { formatDate } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export function ScanHistoryTable({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No scan history found
      </div>
    );
  }

  const getResultBadgeVariant = (result) => {
    switch (result.toLowerCase()) {
      case 'clean':
        return 'success';
      case 'malicious':
        return 'destructive';
      case 'suspicious':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden md:table-cell">Target</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Threats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((scan) => (
            <TableRow key={scan.id}>
              <TableCell className="font-medium">
                {formatDate(scan.timestamp)}
              </TableCell>
              <TableCell>{scan.type}</TableCell>
              <TableCell className="hidden md:table-cell max-w-xs truncate">
                {scan.target}
              </TableCell>
              <TableCell>
                <Badge variant={getResultBadgeVariant(scan.result)}>
                  {scan.result}
                </Badge>
              </TableCell>
              <TableCell>
                {scan.threats > 0 ? (
                  <Badge variant="destructive">{scan.threats}</Badge>
                ) : (
                  <Badge variant="success">0</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
