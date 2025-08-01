class CacheService {
  constructor() {
    this.cache = new Map();
    this.imageCache = new Map();
    this.configCache = new Map();
    this.maxAge = 5 * 60 * 1000; // 5 minutes default
  }

  // Set cache with expiration
  set(key, value, maxAge = this.maxAge) {
    const item = {
      value,
      timestamp: Date.now(),
      maxAge
    };
    this.cache.set(key, item);
  }

  // Get cached item
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > item.maxAge;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  // Check if key exists and is valid
  has(key) {
    return this.get(key) !== null;
  }

  // Remove specific key
  delete(key) {
    return this.cache.delete(key);
  }

  // Clear all cache
  clear() {
    this.cache.clear();
    this.imageCache.clear();
    this.configCache.clear();
  }

  // Image caching with preloading
  async cacheImage(url) {
    if (this.imageCache.has(url)) {
      return this.imageCache.get(url);
    }

    try {
      const img = new Image();
      const promise = new Promise((resolve, reject) => {
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      });
      
      img.src = url;
      this.imageCache.set(url, promise);
      
      return await promise;
    } catch (error) {
      this.imageCache.delete(url);
      throw error;
    }
  }

  // Preload multiple images
  async preloadImages(urls) {
    const promises = urls.map(url => this.cacheImage(url));
    return Promise.allSettled(promises);
  }

  // Config caching
  setConfig(key, config, maxAge = 10 * 60 * 1000) { // 10 minutes for config
    const item = {
      value: config,
      timestamp: Date.now(),
      maxAge
    };
    this.configCache.set(key, item);
  }

  getConfig(key) {
    const item = this.configCache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > item.maxAge;
    if (isExpired) {
      this.configCache.delete(key);
      return null;
    }

    return item.value;
  }

  // Cache size management
  getCacheSize() {
    return {
      data: this.cache.size,
      images: this.imageCache.size,
      config: this.configCache.size
    };
  }

  // Clean expired items
  cleanup() {
    const now = Date.now();
    
    // Clean data cache
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.maxAge) {
        this.cache.delete(key);
      }
    }

    // Clean config cache
    for (const [key, item] of this.configCache.entries()) {
      if (now - item.timestamp > item.maxAge) {
        this.configCache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats() {
    return {
      dataCacheSize: this.cache.size,
      imageCacheSize: this.imageCache.size,
      configCacheSize: this.configCache.size,
      totalSize: this.cache.size + this.imageCache.size + this.configCache.size
    };
  }
}

// Create singleton instance
const cacheService = new CacheService();

// Cleanup expired items every 5 minutes
setInterval(() => {
  cacheService.cleanup();
}, 5 * 60 * 1000);

export default cacheService;