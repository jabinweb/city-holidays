import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function PackageNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Package Not Found
            </h1>
            <p className="text-lg text-gray-600">
              The package you're looking for doesn't exist or has been removed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages">
              <Button variant="primary" size="lg">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Browse All Packages
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
