// Storage utilities for client-side
class StorageManager {
  private prefix = 'giftsherald_';

  set(key: string, value: any, expiresIn?: number) {
    try {
      const item = {
        value,
        expires: expiresIn ? Date.now() + expiresIn : null,
      };
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.error('Storage error:', error);
    }
  }

  get(key: string) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      if (parsed.expires && Date.now() > parsed.expires) {
        this.remove(key);
        return null;
      }
      return parsed.value;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  }

  remove(key: string) {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  }

  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Storage error:', error);
    }
  }
}

export const storage = new StorageManager();

// Analytics tracking
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventData);
  }
};

export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
      page_path: pageName,
    });
  }
};
