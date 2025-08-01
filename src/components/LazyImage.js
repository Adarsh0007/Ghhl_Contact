import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import cacheService from '../services/cacheService';
import performanceService from '../services/performanceService';
import './LazyImage.css';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  fallback = null,
  onLoad = null,
  onError = null,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Check if image is already cached
    const cachedImage = cacheService.get(`image_${src}`);
    if (cachedImage) {
      setImageSrc(cachedImage);
      setIsLoaded(true);
      return;
    }

    // Set up intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsInView(true);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src]);

  useEffect(() => {
    if (!isInView || !src) return;

    const loadImage = async () => {
      try {
        // Try to load from cache first
        let cachedImage = cacheService.get(`image_${src}`);
        
                 if (!cachedImage) {
           // Cache miss - load and cache the image
           performanceService.recordCacheHit(false);
           
           const img = new Image();
           const loadPromise = new Promise((resolve, reject) => {
             img.onload = () => resolve(src);
             img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
           });

           img.src = src;
           cachedImage = await loadPromise;
           
           // Cache the successful load
           cacheService.set(`image_${src}`, cachedImage, 30 * 60 * 1000); // 30 minutes
           performanceService.recordCacheHit(true);
         } else {
           performanceService.recordCacheHit(true);
         }

        setImageSrc(cachedImage);
        setIsLoaded(true);
        setHasError(false);
        
        if (onLoad) {
          onLoad(cachedImage);
        }
      } catch (error) {
        console.error('Image load error:', error);
        setHasError(true);
        setImageSrc(fallback || placeholder || '');
        
        if (onError) {
          onError(error);
        }
      }
    };

    loadImage();
  }, [isInView, src, onLoad, onError, fallback, placeholder]);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallback || placeholder || '');
      
      if (onError) {
        onError(new Error(`Failed to load image: ${src}`));
      }
    }
  };

  return (
    <div 
      ref={imgRef}
      className={`lazy-image-container ${className} ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className="lazy-image"
          onError={handleImageError}
          {...props}
        />
      ) : (
        <div className="lazy-image-placeholder">
          <ImageIcon size={24} />
        </div>
      )}
      
      {!isLoaded && !hasError && (
        <div className="lazy-image-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;