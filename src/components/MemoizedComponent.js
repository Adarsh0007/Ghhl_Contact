import React, { memo, useMemo, useCallback } from 'react';
import usePerformance from '../hooks/usePerformance';

const MemoizedComponent = ({ 
  component: Component, 
  componentName, 
  props, 
  dependencies = [],
  shouldUpdate = null 
}) => {
  const { measureRender } = usePerformance(componentName);

  // Memoize the component based on dependencies
  const memoizedComponent = useMemo(() => {
    const cleanup = measureRender();
    return <Component {...props} />;
  }, dependencies);

  // Custom shouldUpdate function for more control
  const shouldComponentUpdate = useCallback((prevProps, nextProps) => {
    if (shouldUpdate) {
      return shouldUpdate(prevProps, nextProps);
    }
    
    // Default shallow comparison
    const prevKeys = Object.keys(prevProps);
    const nextKeys = Object.keys(nextProps);
    
    if (prevKeys.length !== nextKeys.length) {
      return true;
    }
    
    return prevKeys.some(key => prevProps[key] !== nextProps[key]);
  }, [shouldUpdate]);

  // Create memoized wrapper
  const MemoizedWrapper = memo(({ children }) => children, shouldComponentUpdate);

  return (
    <MemoizedWrapper>
      {memoizedComponent}
    </MemoizedWrapper>
  );
};

export default MemoizedComponent;