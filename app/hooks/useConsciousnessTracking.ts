'use client';

import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

export function useConsciousnessTracking() {
  // Track deep reading (time spent on sections)
  const trackDeepReading = useCallback((section: string, timeSpent: number) => {
    if (window.plausible && timeSpent > 10000) { // Only track if more than 10 seconds
      window.plausible('Deep Reading', { 
        props: { 
          section, 
          duration: Math.round(timeSpent / 1000),
          depth: timeSpent > 30000 ? 'deep' : 'engaged'
        } 
      });
    }
  }, []);

  // Track share interactions
  const trackShare = useCallback((platform: string, section?: string) => {
    if (window.plausible) {
      const currentSection = section || document.querySelector('[data-section-active="true"]')?.getAttribute('data-section') || 'unknown';
      window.plausible('Share Initiated', { 
        props: { 
          platform, 
          section: currentSection,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
          hour: new Date().getHours()
        } 
      });
    }
  }, []);

  // Track theme switches
  const trackThemeSwitch = useCallback((theme: 'light' | 'dark') => {
    if (window.plausible) {
      window.plausible('Theme Switch', { 
        props: { 
          to: theme,
          hour: new Date().getHours(),
          readingDepth: Math.round(window.scrollY / document.body.scrollHeight * 100)
        } 
      });
    }
  }, []);

  // Track consciousness field interactions (scroll patterns)
  const trackFieldInteraction = useCallback((scrollPercentage: number) => {
    if (window.plausible && scrollPercentage > 75) {
      window.plausible('Consciousness Field Reached', { 
        props: { 
          depth: scrollPercentage,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        } 
      });
    }
  }, []);

  // Track recognition moments (pauses in reading)
  const trackRecognitionMoment = useCallback((section: string) => {
    if (window.plausible) {
      window.plausible('Recognition Moment', { 
        props: { 
          section,
          scrollDepth: Math.round(window.scrollY / document.body.scrollHeight * 100)
        } 
      });
    }
  }, []);

  // Auto-track page visibility for true engagement
  useEffect(() => {
    let startTime = Date.now();
    let totalVisibleTime = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        totalVisibleTime += Date.now() - startTime;
      } else {
        startTime = Date.now();
      }
    };

    const handleBeforeUnload = () => {
      if (!document.hidden) {
        totalVisibleTime += Date.now() - startTime;
      }
      
      if (window.plausible && totalVisibleTime > 5000) {
        window.plausible('Consciousness Engagement', {
          props: {
            totalTime: Math.round(totalVisibleTime / 1000),
            depth: totalVisibleTime > 120000 ? 'deep-dive' : totalVisibleTime > 60000 ? 'engaged' : 'exploring'
          }
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return {
    trackDeepReading,
    trackShare,
    trackThemeSwitch,
    trackFieldInteraction,
    trackRecognitionMoment
  };
}