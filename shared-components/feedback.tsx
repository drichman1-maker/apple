'use client';
import { useState, useEffect } from 'react';

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };
  
  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary`} />
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
      {message}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-400">{title}</h3>
      {description && <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
}
