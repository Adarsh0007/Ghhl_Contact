import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Phone } from 'lucide-react';

const ContactHeader = ({ config, onBack, onNext, onPrevious, onCall }) => {
  const { header, profile } = config;

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between py-3">
          {/* Header with Navigation */}
          <div className="flex items-center gap-3">
            {header.navigation.showBack && (
              <button 
                onClick={onBack}
                className="btn btn-secondary btn-icon"
                aria-label="Go back"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{header.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{header.navigation.currentPage} of {header.navigation.totalPages}</span>
                <div className="flex items-center gap-1">
                  {header.navigation.showPrevious && (
                    <button 
                      onClick={onPrevious}
                      className="p-1 hover:bg-gray-100 rounded"
                      aria-label="Previous contact"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}
                  {header.navigation.showNext && (
                    <button 
                      onClick={onNext}
                      className="p-1 hover:bg-gray-100 rounded"
                      aria-label="Next contact"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-between py-3 border-t">
          <div className="flex items-center gap-3">
            <img 
              src={profile.avatar || "https://via.placeholder.com/40x40/E5E7EB/6B7280?text=OJ"}
              alt={`${profile.name} avatar`}
              className="avatar avatar-md"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/40x40/E5E7EB/6B7280?text=OJ";
              }}
            />
            <h2 className="text-lg font-semibold">{profile.name}</h2>
          </div>
          
          {profile.showCallButton && (
            <button 
              onClick={onCall}
              className="btn btn-primary btn-icon"
              aria-label={`Call ${profile.name}`}
            >
              <Phone size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;