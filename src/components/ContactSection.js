import React from 'react';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import ContactField from './ContactField';
import './ContactSection.css';

const ContactSection = ({ section, isExpanded, onToggle }) => {
  return (
    <div className="contact-section card">
      <div className="section-header" onClick={onToggle}>
        <h3 className="section-title">{section.title}</h3>
        <div className="section-actions">
          <button className="add-button">
            <Plus size={16} />
            <span>Add</span>
          </button>
          <button className="toggle-button">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="section-content">
          <div className="fields-grid">
            {section.fields.map(field => (
              <ContactField key={field.id} field={field} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSection;