class PerformanceService {
  constructor() {
    this.metrics = {
      pageLoads: 0,
      componentRenders: new Map(),
      apiCalls: new Map(),
      errors: [],
      cacheHits: 0,
      cacheMisses: 0
    };
    
    this.observers = new Set();
    this.isMonitoring = false;
  }

  // Start performance monitoring
  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.observePerformance();
    this.observeErrors();
    
    console.log('Performance monitoring started');
  }

  // Stop performance monitoring
  stopMonitoring() {
    this.isMonitoring = false;
    console.log('Performance monitoring stopped');
  }

  // Observe performance metrics
  observePerformance() {
    if (!window.performance) return;

    // Observe navigation timing
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      this.recordPageLoad(navigation);
    }

    // Observe resource timing
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.recordResourceLoad(entry);
      }
    });

    try {
      observer.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('PerformanceObserver not supported:', error);
    }
  }

  // Observe errors
  observeErrors() {
    window.addEventListener('error', (event) => {
      this.recordError('JavaScript Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.recordError('Unhandled Promise Rejection', {
        reason: event.reason
      });
    });
  }

  // Record page load metrics
  recordPageLoad(navigation) {
    this.metrics.pageLoads++;
    
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
    
    this.notifyObservers('pageLoad', {
      loadTime,
      domContentLoaded,
      navigation
    });
  }

  // Record resource load metrics
  recordResourceLoad(entry) {
    const resourceType = entry.initiatorType || 'unknown';
    const loadTime = entry.duration;
    
    if (!this.metrics.apiCalls.has(resourceType)) {
      this.metrics.apiCalls.set(resourceType, []);
    }
    
    this.metrics.apiCalls.get(resourceType).push(loadTime);
    
    this.notifyObservers('resourceLoad', {
      type: resourceType,
      loadTime,
      entry
    });
  }

  // Record component render time
  recordComponentRender(componentName, renderTime) {
    if (!this.metrics.componentRenders.has(componentName)) {
      this.metrics.componentRenders.set(componentName, []);
    }
    
    this.metrics.componentRenders.get(componentName).push(renderTime);
    
    this.notifyObservers('componentRender', {
      componentName,
      renderTime
    });
  }

  // Record cache hit/miss
  recordCacheHit(hit = true) {
    if (hit) {
      this.metrics.cacheHits++;
    } else {
      this.metrics.cacheMisses++;
    }
  }

  // Record error
  recordError(type, details) {
    const error = {
      type,
      details,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    this.metrics.errors.push(error);
    
    this.notifyObservers('error', error);
    
    // Keep only last 100 errors
    if (this.metrics.errors.length > 100) {
      this.metrics.errors = this.metrics.errors.slice(-100);
    }
  }

  // Get performance metrics
  getMetrics() {
    const componentStats = {};
    for (const [name, times] of this.metrics.componentRenders) {
      componentStats[name] = {
        count: times.length,
        average: times.reduce((a, b) => a + b, 0) / times.length,
        min: Math.min(...times),
        max: Math.max(...times)
      };
    }

    const apiStats = {};
    for (const [type, times] of this.metrics.apiCalls) {
      apiStats[type] = {
        count: times.length,
        average: times.reduce((a, b) => a + b, 0) / times.length,
        min: Math.min(...times),
        max: Math.max(...times)
      };
    }

    return {
      pageLoads: this.metrics.pageLoads,
      componentRenders: componentStats,
      apiCalls: apiStats,
      errors: this.metrics.errors.length,
      cacheHits: this.metrics.cacheHits,
      cacheMisses: this.metrics.cacheMisses,
      cacheHitRate: this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses) || 0
    };
  }

  // Add observer
  addObserver(callback) {
    this.observers.add(callback);
  }

  // Remove observer
  removeObserver(callback) {
    this.observers.delete(callback);
  }

  // Notify observers
  notifyObservers(event, data) {
    this.observers.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('Performance observer error:', error);
      }
    });
  }

  // Measure function execution time
  measureFunction(name, fn) {
    return async (...args) => {
      const start = performance.now();
      try {
        const result = await fn(...args);
        const duration = performance.now() - start;
        this.recordComponentRender(name, duration);
        return result;
      } catch (error) {
        const duration = performance.now() - start;
        this.recordComponentRender(name, duration);
        throw error;
      }
    };
  }

  // Get memory usage (if available)
  getMemoryUsage() {
    if (performance.memory) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  // Export metrics for debugging
  exportMetrics() {
    return {
      metrics: this.getMetrics(),
      memory: this.getMemoryUsage(),
      timestamp: Date.now()
    };
  }
}

// Create singleton instance
const performanceService = new PerformanceService();

export default performanceService;