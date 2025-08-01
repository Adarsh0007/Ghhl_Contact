import React from 'react';
import './ContactField.css';

const ContactField = ({ field }) => {
  const renderFieldValue = () => {
    if (field.type === 'phone' && field.countryCode) {
      return (
        <div className="phone-field">
          <span className="country-flag">🇺🇸</span>
          <span className="phone-value">{field.value}</span>
        </div>
      );
    }
    
    return <span className="field-value">{field.value}</span>;
  };

  return (
    <div className="contact-field">
      <label className="field-label">{field.label}</label>
      <div className="field-content">
        {renderFieldValue()}
      </div>
    </div>
  );
};

export default ContactField;