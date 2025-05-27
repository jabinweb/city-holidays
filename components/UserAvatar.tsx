import { auth } from '@/auth';
import Image from 'next/image';

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-2">
      {session.user.image ? (
        <Image 
          src={session.user.image} 
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {session.user.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
      )}
      <span className="text-sm font-medium">{session.user.name}</span>
    </div>
  );
}
