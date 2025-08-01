import { useEffect, useRef, useCallback } from 'react';
import performanceService from '../services/performanceService';

export const usePerformance = (componentName) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(0);

  // Measure component render time
  const measureRender = useCallback(() => {
    const startTime = performance.now();
    renderCount.current++;
    
    return () => {
      const renderTime = performance.now() - startTime;
      lastRenderTime.current = renderTime;
      performanceService.recordComponentRender(componentName, renderTime);
    };
  }, [componentName]);

  // Measure function execution time
  const measureFunction = useCallback((functionName, fn) => {
    return performanceService.measureFunction(`${componentName}_${functionName}`, fn);
  }, [componentName]);

  // Track component lifecycle
  useEffect(() => {
    const cleanup = measureRender();
    return cleanup;
  });

  // Get performance stats
  const getStats = useCallback(() => {
    return {
      renderCount: renderCount.current,
      lastRenderTime: lastRenderTime.current,
      componentMetrics: performanceService.getMetrics().componentRenders[componentName] || {}
    };
  }, [componentName]);

  return {
    measureRender,
    measureFunction,
    getStats,
    renderCount: renderCount.current,
    lastRenderTime: lastRenderTime.current
  };
};

export default usePerformance;