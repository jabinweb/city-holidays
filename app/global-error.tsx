'use client';

import React from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              {/* Error Icon */}
              <div className="mb-8">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-12 h-12 text-red-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Something went wrong!
                </h1>
                <p className="text-lg text-gray-600">
                  We're sorry, but there was an unexpected error. Our team has been notified.
                </p>
              </div>

              {/* Error Details (Development) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                  <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
                  <p className="text-sm text-red-700 font-mono">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-sm text-red-600 mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={reset}
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={20} />
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => window.location.href = '/'}
                  className="flex items-center gap-2"
                >
                  <Home size={20} />
                  Go Home
                </Button>
              </div>

              {/* Support Contact */}
              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Need Immediate Help?
                </h3>
                <p className="text-blue-700 mb-4">
                  If this problem persists, please contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="tel:+919528735541">
                    <Button variant="secondary" size="sm">
                      Call: +91 9528735541
                    </Button>
                  </a>
                  <a href="mailto:info@cityholidays.in">
                    <Button variant="outline" size="sm">
                      Email Support
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </body>
    </html>
  );
}
