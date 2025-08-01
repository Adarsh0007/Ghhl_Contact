import React, { useEffect, useState } from 'react';
import ContactDetails from './components/ContactDetails';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceDashboard from './components/PerformanceDashboard';
import performanceService from './services/performanceService';
import './App.css';

function App() {
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(false);

  useEffect(() => {
    // Start performance monitoring
    performanceService.startMonitoring();
    
    // Preload critical images
    const criticalImages = [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
    ];
    
    // Preload images in background
    import('./services/cacheService').then(({ default: cacheService }) => {
      cacheService.preloadImages(criticalImages);
    });

    // Show performance dashboard in development
    if (process.env.NODE_ENV === 'development') {
      setShowPerformanceDashboard(true);
    }
    
    return () => {
      // Stop performance monitoring on unmount
      performanceService.stopMonitoring();
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <ContactDetails />
        <PerformanceDashboard 
          isVisible={showPerformanceDashboard}
          onClose={() => setShowPerformanceDashboard(false)}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;