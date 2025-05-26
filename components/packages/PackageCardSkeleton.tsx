import Card from '@/components/ui/Card';

export default function PackageCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="relative w-full aspect-video bg-gray-200 skeleton"></div>
      
      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col p-4">
        {/* Title Skeleton */}
        <div className="h-14 mb-3">
          <div className="h-5 bg-gray-200 rounded skeleton mb-2"></div>
          <div className="h-5 bg-gray-200 rounded skeleton w-3/4"></div>
        </div>
        
        {/* Meta Info Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 rounded skeleton w-20"></div>
          <div className="h-3 bg-gray-200 rounded skeleton w-32"></div>
        </div>
        
        {/* Description Skeleton */}
        <div className="h-10 mb-3">
          <div className="h-3 bg-gray-200 rounded skeleton mb-1"></div>
          <div className="h-3 bg-gray-200 rounded skeleton w-4/5"></div>
        </div>

        {/* Bottom Section Skeleton */}
        <div className="mt-auto">
          <div className="flex gap-1 mb-3">
            <div className="h-6 bg-gray-200 rounded skeleton w-16"></div>
            <div className="h-6 bg-gray-200 rounded skeleton w-12"></div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <div className="h-5 bg-gray-200 rounded skeleton w-20 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded skeleton w-16"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-7 bg-gray-200 rounded skeleton w-12"></div>
              <div className="h-7 bg-gray-200 rounded skeleton w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
