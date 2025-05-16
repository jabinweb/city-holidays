'use client';

import { Share2 } from 'lucide-react';
import Button from './Button';
import { useState } from 'react';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
  fullWidth?: boolean;
}

export default function ShareButton({ title, text, url, className, fullWidth }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button 
      variant="outline" 
      size="lg" 
      fullWidth={fullWidth}
      className={`flex items-center justify-center ${className}`}
      onClick={handleShare}
    >
      <Share2 className="mr-2 h-4 w-4" />
      {copied ? 'Link Copied!' : 'Share Package'}
    </Button>
  );
}
