import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Clock, 
  Users, 
  Car, 
  Train, 
  Calendar,
  Star,
  Phone,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { packages } from '@/data/packages';

export const dynamic = 'force-dynamic';

interface PackagePageProps {
  params: {
    id: string;
  };
}

export default function PackagePage({ params }: PackagePageProps) {
  const packageItem = packages.find(pkg => pkg.id === params.id);

  if (!packageItem) {
    notFound();
  }

  const highlights = packageItem.highlights || [];
  const itinerary = packageItem.itinerary || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={packageItem.imageUrl}
          alt={packageItem.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <Container className="relative h-full flex items-end pb-12">
          <div className="text-white max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Link 
                href="/packages"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Packages
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {packageItem.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{packageItem.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{packageItem.duration}</span>
              </div>
              {packageItem.transportation && (
                <div className="flex items-center gap-2">
                  {packageItem.transportation.includes('Train') ? (
                    <Train className="h-5 w-5" />
                  ) : (
                    <Car className="h-5 w-5" />
                  )}
                  <span>{packageItem.transportation}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>4.5 (128 reviews)</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                {packageItem.description}
              </p>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Package Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {itinerary.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Day {index + 1}: {day.title}
                        </h3>
                      </div>
                      {/* Description removed as it's not available in the data structure */}
                      {day.activities && day.activities.length > 0 && (
                        <div className="mt-3">
                          <h4 className="font-medium text-gray-900 mb-2">Activities:</h4>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {day.activities.map((activity, actIndex) => (
                              <li key={actIndex}>{activity}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-green-700">
                  ✓ Inclusions
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Accommodation in selected hotels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Daily breakfast</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Transportation as per itinerary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Professional tour guide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>All entrance fees</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-red-700">
                  ✗ Exclusions
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Airfare/Train fare to the destination</li>
                  <li>• Lunch and dinner (unless specified)</li>
                  <li>• Personal expenses and shopping</li>
                  <li>• Tips and gratuities</li>
                  <li>• Travel insurance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-32">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ₹{packageItem.price.toLocaleString('en-IN')}
                </div>
                <div className="text-gray-500">per person</div>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{packageItem.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Group Size</span>
                  <span className="font-medium">2-15 people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Best Time</span>
                  <span className="font-medium">Oct - Mar</span>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="space-y-3">
                <Link href={`/booking?package=${packageItem.id}`}>
                  <Button variant="primary" size="lg" fullWidth className="mb-3">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Now
                  </Button>
                </Link>
                
                <a href="tel:+919528735541">
                  <Button variant="outline" size="lg" fullWidth className="mb-4">
                    <Phone className="h-5 w-5 mr-2" />
                    Call for Details
                  </Button>
                </a>
              </div>

              {/* Contact Card */}
              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                <p className="text-blue-700 text-sm mb-3">
                  Our travel experts are available 24/7 to assist you.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Phone className="h-4 w-4" />
                    <span>+91 9528735541</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700">
                    <span>📧</span>
                    <span>info@cityholidays.in</span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">1000+</div>
                    <div className="text-xs text-gray-500">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">4.8</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">24/7</div>
                    <div className="text-xs text-gray-500">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
