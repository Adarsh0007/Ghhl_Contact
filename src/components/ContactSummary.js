import React from 'react';
import { Phone, ChevronDown, X, Plus } from 'lucide-react';
import './ContactSummary.css';

const ContactSummary = ({ contact, owner, followers, tags }) => {
  return (
    <div className="contact-summary card">
      <div className="contact-header">
        <div className="contact-info">
          <div className="avatar-container">
            <img 
              src={contact.avatar} 
              alt={contact.name}
              className="contact-avatar"
            />
          </div>
          <div className="contact-details">
            <h2 className="contact-name">{contact.name}</h2>
          </div>
        </div>
        <button className="call-button">
          <Phone size={20} />
        </button>
      </div>
      
      <div className="contact-meta">
        <div className="meta-section">
          <label className="meta-label">Owner</label>
          <div className="owner-selector">
            <img 
              src={owner.avatar} 
              alt={owner.name}
              className="owner-avatar"
            />
            <span className="owner-name">{owner.name}</span>
            <ChevronDown size={16} />
          </div>
        </div>
        
        <div className="meta-section">
          <label className="meta-label">Followers</label>
          <div className="followers-selector">
            <div className="followers-avatars">
              {followers.slice(0, 3).map((follower, index) => (
                <img 
                  key={follower.name}
                  src={follower.avatar} 
                  alt={follower.name}
                  className="follower-avatar"
                  style={{ zIndex: 3 - index }}
                />
              ))}
            </div>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
      
      <div className="tags-section">
        <label className="meta-label">Tags</label>
        <div className="tags-container">
          {tags.map(tag => (
            <div key={tag.id} className="tag">
              <span className="tag-text">{tag.name}</span>
              {tag.removable && (
                <button className="tag-remove">
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
          <button className="add-tag-button">
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSummary;