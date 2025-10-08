import React from 'react';

export function Select({ children, ...props }: any) {
  return <select {...props}>{children}</select>;
}

export function SelectContent({ children }: any) {
  return <>{children}</>;
}

export function SelectItem({ children, value }: any) {
  return <option value={value}>{children}</option>;
}

export function SelectTrigger({ children }: any) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }: any) {
  return <span>{placeholder}</span>;
}
