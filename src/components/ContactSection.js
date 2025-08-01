import React, { memo } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import FormField from './FormField';

const ContactSection = memo(({ section, values, onChange, onToggle, onAddField }) => {
  const hasFields = section.fields && section.fields.length > 0;

  return (
    <div className="bg-white border-b last:border-b-0">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">{section.title}</h3>
            {hasFields && (
              <span className="text-sm text-gray-500">
                ({section.fields.length} field{section.fields.length !== 1 ? 's' : ''})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddField(section.id)}
              className="btn btn-secondary text-sm py-1 px-2"
              aria-label={`Add field to ${section.title}`}
            >
              <Plus size={14} className="mr-1" />
              Add
            </button>

            {section.collapsible && (
              <button
                onClick={() => onToggle(section.id)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label={`${section.expanded ? 'Collapse' : 'Expand'} ${section.title} section`}
              >
                {section.expanded ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Section Content */}
        {(!section.collapsible || section.expanded) && (
          <div className="pb-4">
            {hasFields ? (
              <div 
                className="grid gap-4"
                style={{
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridAutoRows: 'min-content'
                }}
              >
                {section.fields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={values[field.id]}
                    onChange={onChange}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No fields in this section</p>
                <button
                  onClick={() => onAddField(section.id)}
                  className="btn btn-primary mt-2 text-sm"
                >
                  <Plus size={14} className="mr-1" />
                  Add First Field
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;