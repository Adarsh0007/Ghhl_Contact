import React, { useState, useCallback, useMemo } from 'react';
import { contactConfig } from './config/contactConfig';
import ContactHeader from './components/ContactHeader';
import OwnershipSection from './components/OwnershipSection';
import TagSection from './components/TagSection';
import TabNavigation from './components/TabNavigation';
import ContactSection from './components/ContactSection';
import './styles/index.css';

function App() {
  // State management
  const [config, setConfig] = useState(contactConfig);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formValues, setFormValues] = useState({});

  // Navigation handlers
  const handleBack = useCallback(() => {
    console.log('Navigate back');
  }, []);

  const handleNext = useCallback(() => {
    console.log('Navigate to next contact');
  }, []);

  const handlePrevious = useCallback(() => {
    console.log('Navigate to previous contact');
  }, []);

  const handleCall = useCallback(() => {
    console.log(`Calling ${config.profile.name}`);
  }, [config.profile.name]);

  // Ownership handlers
  const handleOwnerChange = useCallback(() => {
    console.log('Change owner');
  }, []);

  const handleFollowersChange = useCallback(() => {
    console.log('Manage followers');
  }, []);

  // Tag handlers
  const handleTagRemove = useCallback((tagId) => {
    setConfig(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag.id !== tagId)
    }));
  }, []);

  const handleTagAdd = useCallback(() => {
    const newTag = {
      id: Date.now(),
      label: 'New Tag',
      color: 'gray',
      removable: true
    };
    setConfig(prev => ({
      ...prev,
      tags: [...prev.tags, newTag]
    }));
  }, []);

  // Tab and search handlers
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Form handlers
  const handleFieldChange = useCallback((fieldId, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  }, []);

  const handleSectionToggle = useCallback((sectionId) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section
      )
    }));
  }, []);

  const handleAddField = useCallback((sectionId) => {
    console.log(`Add field to section: ${sectionId}`);
    // Implementation for adding new field would go here
  }, []);

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return config.sections;
    }

    return config.sections.map(section => {
      const filteredFields = section.fields.filter(field =>
        field.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.value.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return {
        ...section,
        fields: filteredFields
      };
    }).filter(section => 
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.fields.length > 0
    );
  }, [config.sections, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ContactHeader
        config={config}
        onBack={handleBack}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onCall={handleCall}
      />

      {/* Ownership Section */}
      <OwnershipSection
        config={config}
        onOwnerChange={handleOwnerChange}
        onFollowersChange={handleFollowersChange}
      />

      {/* Tags Section */}
      <TagSection
        config={config}
        onTagRemove={handleTagRemove}
        onTagAdd={handleTagAdd}
      />

      {/* Tab Navigation */}
      <TabNavigation
        config={config}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearch={handleSearch}
      />

      {/* Contact Sections */}
      <div className="pb-6">
        {filteredSections.map((section) => (
          <ContactSection
            key={section.id}
            section={section}
            values={formValues}
            onChange={handleFieldChange}
            onToggle={handleSectionToggle}
            onAddField={handleAddField}
          />
        ))}

        {filteredSections.length === 0 && searchQuery && (
          <div className="bg-white">
            <div className="container py-12 text-center">
              <p className="text-gray-500">No fields found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-primary mt-4"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;