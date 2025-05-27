'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function UserAvatar() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2">
      {session?.user ? (
        <>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {session.user.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <span className="text-sm font-medium">{session.user.name}</span>
        </>
      ) : (
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">?</span>
        </div>
      )}
    </div>
  );
}
