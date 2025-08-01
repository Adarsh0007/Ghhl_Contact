import React from 'react';
import { X, Plus } from 'lucide-react';

const TagSection = ({ config, onTagRemove, onTagAdd }) => {
  const { tags } = config;

  const getTagColorClass = (color) => {
    const colorMap = {
      blue: 'tag-blue',
      purple: 'tag-purple',
      gray: 'tag-gray'
    };
    return colorMap[color] || 'tag-gray';
  };

  return (
    <div className="bg-white border-b">
      <div className="container">
        <div className="py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500 mr-2">Tags</span>
            
            {tags.map((tag) => (
              <div
                key={tag.id}
                className={`tag ${getTagColorClass(tag.color)}`}
              >
                <span>{tag.label}</span>
                {tag.removable && (
                  <button
                    onClick={() => onTagRemove(tag.id)}
                    className="hover:bg-black hover:bg-opacity-10 rounded p-0.5"
                    aria-label={`Remove ${tag.label} tag`}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={onTagAdd}
              className="tag tag-gray hover:bg-gray-200 transition-colors"
              aria-label="Add new tag"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagSection;