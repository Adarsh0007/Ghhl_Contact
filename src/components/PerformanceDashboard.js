import React, { useState, useEffect } from 'react';
import { Activity, Zap, AlertTriangle, BarChart3 } from 'lucide-react';
import performanceService from '../services/performanceService';
import cacheService from '../services/cacheService';
import './PerformanceDashboard.css';

const PerformanceDashboard = ({ isVisible = false, onClose }) => {
  const [metrics, setMetrics] = useState({});
  const [cacheStats, setCacheStats] = useState({});
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const updateMetrics = () => {
      setMetrics(performanceService.getMetrics());
      setCacheStats(cacheService.getStats());
      setMemoryUsage(performanceService.getMemoryUsage());
    };

    // Update metrics immediately
    updateMetrics();

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms) => {
    return `${ms.toFixed(2)}ms`;
  };

  return (
    <div className={`performance-dashboard ${isExpanded ? 'expanded' : ''}`}>
      <div className="dashboard-header">
        <div className="dashboard-title">
          <BarChart3 size={20} />
          <span>Performance Dashboard</span>
        </div>
        <div className="dashboard-controls">
          <button 
            className="expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '−' : '+'}
          </button>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">
              <Activity size={16} />
            </div>
            <div className="metric-info">
              <div className="metric-label">Page Loads</div>
              <div className="metric-value">{metrics.pageLoads || 0}</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Zap size={16} />
            </div>
            <div className="metric-info">
              <div className="metric-label">Cache Hit Rate</div>
              <div className="metric-value">
                {((metrics.cacheHitRate || 0) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <AlertTriangle size={16} />
            </div>
            <div className="metric-info">
              <div className="metric-label">Errors</div>
              <div className="metric-value">{metrics.errors || 0}</div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="detailed-metrics">
            <div className="metric-section">
              <h4>Cache Statistics</h4>
              <div className="metric-details">
                <div>Data Cache: {cacheStats.dataCacheSize || 0} items</div>
                <div>Image Cache: {cacheStats.imageCacheSize || 0} items</div>
                <div>Config Cache: {cacheStats.configCacheSize || 0} items</div>
                <div>Total: {cacheStats.totalSize || 0} items</div>
              </div>
            </div>

            {memoryUsage && (
              <div className="metric-section">
                <h4>Memory Usage</h4>
                <div className="metric-details">
                  <div>Used: {formatBytes(memoryUsage.usedJSHeapSize)}</div>
                  <div>Total: {formatBytes(memoryUsage.totalJSHeapSize)}</div>
                  <div>Limit: {formatBytes(memoryUsage.jsHeapSizeLimit)}</div>
                </div>
              </div>
            )}

            <div className="metric-section">
              <h4>Component Performance</h4>
              <div className="component-metrics">
                {Object.entries(metrics.componentRenders || {}).map(([name, stats]) => (
                  <div key={name} className="component-metric">
                    <div className="component-name">{name}</div>
                    <div className="component-stats">
                      <span>Renders: {stats.count}</span>
                      <span>Avg: {formatTime(stats.average)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="metric-section">
              <h4>Actions</h4>
              <div className="dashboard-actions">
                <button 
                  className="action-button"
                  onClick={() => cacheService.clear()}
                >
                  Clear Cache
                </button>
                <button 
                  className="action-button"
                  onClick={() => {
                    const data = performanceService.exportMetrics();
                    console.log('Performance Metrics:', data);
                  }}
                >
                  Export Metrics
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceDashboard;