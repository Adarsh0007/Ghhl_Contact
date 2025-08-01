import React from 'react';
import { ChevronDown } from 'lucide-react';

const OwnershipSection = ({ config, onOwnerChange, onFollowersChange }) => {
  const { ownership } = config;

  const AvatarGroup = ({ avatars, count }) => {
    const displayAvatars = avatars.slice(0, 2);
    const remainingCount = count - displayAvatars.length;

    return (
      <div className="flex items-center -space-x-2">
        {displayAvatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar || `https://via.placeholder.com/24x24/E5E7EB/6B7280?text=${index + 1}`}
            alt={`Follower ${index + 1}`}
            className="avatar avatar-sm border-2 border-white"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/24x24/E5E7EB/6B7280?text=${index + 1}`;
            }}
          />
        ))}
        {remainingCount > 0 && (
          <div className="avatar avatar-sm bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div className="container">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Owner Section */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-gray-500 mb-1">{ownership.owner.label}</span>
              <div className="flex items-center gap-2">
                <img
                  src={ownership.owner.avatar || "https://via.placeholder.com/24x24/E5E7EB/6B7280?text=DL"}
                  alt={`${ownership.owner.name} avatar`}
                  className="avatar avatar-sm"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/24x24/E5E7EB/6B7280?text=DL";
                  }}
                />
                <span className="text-sm font-medium truncate">{ownership.owner.name}</span>
                {ownership.owner.hasDropdown && (
                  <button
                    onClick={onOwnerChange}
                    className="p-1 hover:bg-gray-100 rounded"
                    aria-label="Change owner"
                  >
                    <ChevronDown size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Followers Section */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500 mb-1">{ownership.followers.label}</span>
              <div className="flex items-center gap-2">
                <AvatarGroup 
                  avatars={ownership.followers.avatars} 
                  count={ownership.followers.count} 
                />
                {ownership.followers.hasDropdown && (
                  <button
                    onClick={onFollowersChange}
                    className="p-1 hover:bg-gray-100 rounded"
                    aria-label="Manage followers"
                  >
                    <ChevronDown size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnershipSection;