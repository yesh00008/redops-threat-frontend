import React from 'react';
import { formatDate } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export function AlertsTable({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No alerts found
      </div>
    );
  }

  const getSeverityBadgeVariant = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'default';
      case 'investigating':
        return 'warning';
      case 'resolved':
        return 'success';
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
            <TableHead>Source</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell className="font-medium">
                {formatDate(alert.timestamp)}
              </TableCell>
              <TableCell>{alert.type}</TableCell>
              <TableCell>{alert.source}</TableCell>
              <TableCell>
                <Badge variant={getSeverityBadgeVariant(alert.severity)}>
                  {alert.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(alert.status)}>
                  {alert.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell max-w-xs truncate">
                {alert.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
