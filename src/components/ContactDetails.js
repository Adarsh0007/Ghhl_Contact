import React, { useState } from 'react';
import { contactConfig } from '../config/contactConfig';
import Header from './Header';
import ContactSummary from './ContactSummary';
import TabNavigation from './TabNavigation';
import SearchBar from './SearchBar';
import ContactSection from './ContactSection';
import './ContactDetails.css';

const ContactDetails = () => {
  const [activeTab, setActiveTab] = useState('all-fields');
  const [expandedSections, setExpandedSections] = useState(
    contactConfig.sections.reduce((acc, section) => {
      acc[section.id] = section.expanded;
      return acc;
    }, {})
  );
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const filteredSections = contactConfig.sections.filter(section => {
    if (!searchQuery) return true;
    
    const sectionMatches = section.title.toLowerCase().includes(searchQuery.toLowerCase());
    const fieldMatches = section.fields.some(field => 
      field.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.value.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return sectionMatches || fieldMatches;
  });

  return (
    <div className="contact-details">
      <div className="container">
        <Header 
          title="Contact Details"
          position={contactConfig.currentContact.position}
        />
        
        <ContactSummary 
          contact={contactConfig.currentContact}
          owner={contactConfig.owner}
          followers={contactConfig.followers}
          tags={contactConfig.tags}
        />
        
        <TabNavigation 
          tabs={contactConfig.tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search Fields and Folders"
        />
        
        <div className="sections-container">
          {filteredSections.map(section => (
            <ContactSection
              key={section.id}
              section={section}
              isExpanded={expandedSections[section.id]}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;