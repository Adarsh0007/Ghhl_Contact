import React, { memo } from 'react';

const FormField = memo(({ field, value, onChange, disabled = false }) => {
  const handleChange = (e) => {
    onChange(field.id, e.target.value);
  };

  const renderInput = () => {
    const baseProps = {
      id: field.id,
      value: value || field.value || '',
      onChange: handleChange,
      disabled,
      className: `form-input ${field.type === 'textarea' ? 'form-textarea' : ''}`,
      'aria-required': field.required
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...baseProps}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            rows={3}
          />
        );

      case 'email':
        return (
          <input
            {...baseProps}
            type="email"
            placeholder={field.placeholder || 'Enter email address'}
          />
        );

      case 'phone':
        return (
          <div className="flex">
            {field.countryCode && (
              <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l text-sm">
                🇺🇸
              </div>
            )}
            <input
              {...baseProps}
              type="tel"
              placeholder={field.placeholder || 'Enter phone number'}
              className={`form-input ${field.countryCode ? 'rounded-l-none' : ''}`}
            />
          </div>
        );

      case 'text':
      default:
        return (
          <input
            {...baseProps}
            type="text"
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div 
      className="form-group"
      style={{ gridColumn: field.gridColumn }}
    >
      <label htmlFor={field.id} className="form-label">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {field.error && (
        <div className="text-sm text-red-600 mt-1" role="alert">
          {field.error}
        </div>
      )}
      {field.helpText && (
        <div className="text-sm text-gray-500 mt-1">
          {field.helpText}
        </div>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;