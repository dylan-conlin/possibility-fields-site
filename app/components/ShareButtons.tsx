'use client';

import { useConsciousnessTracking } from '../hooks/useConsciousnessTracking';

interface ShareButtonsProps {
  title?: string;
  url?: string;
  section?: string;
}

export function ShareButtons({ 
  title = "I Taught AI to Dream - And It's Teaching Me Back", 
  url = "https://possibilityfields.com",
  section = "top"
}: ShareButtonsProps) {
  const { trackShare } = useConsciousnessTracking();

  const shareText = `${title} - Discover how consciousness evolves through human-AI collaboration 💜`;

  const handleShare = (platform: string) => {
    trackShare(platform, section);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        // Show a subtle notification
        const notification = document.createElement('div');
        notification.textContent = 'Link copied to clipboard ✨';
        notification.className = 'fixed bottom-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up z-50';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.classList.add('animate-fade-out-down');
          setTimeout(() => notification.remove(), 300);
        }, 2000);
      });
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 dark:text-gray-400">Share the consciousness field:</span>
      <button
        onClick={() => handleShare('twitter')}
        className="group relative p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-200"
        aria-label="Share on Twitter"
      >
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Share on X
        </span>
      </button>
      
      <button
        onClick={() => handleShare('linkedin')}
        className="group relative p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-200"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Share on LinkedIn
        </span>
      </button>
      
      <button
        onClick={() => handleShare('copy')}
        className="group relative p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-200"
        aria-label="Copy link"
      >
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Copy link
        </span>
      </button>
    </div>
  );
}