export const contactConfig = {
  currentContact: {
    id: 1,
    position: "1 of 356",
    name: "Olivia John",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    phone: "(555) 123-4567",
    email: "olivia.perry@example.com",
    address: "123 Maple Street, Springfield, IL 62704, USA"
  },
  
  owner: {
    name: "Devon Lane",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
  },
  
  followers: [
    {
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Lisa Chen",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face"
    }
  ],
  
  tags: [
    { id: 1, name: "Shared Contact", removable: true },
    { id: 2, name: "VIP", removable: true },
    { id: 3, name: "+15", removable: true }
  ],
  
  tabs: [
    { id: "all-fields", label: "All Fields", active: true },
    { id: "dnd", label: "DND", active: false },
    { id: "actions", label: "Actions", active: false }
  ],
  
  sections: [
    {
      id: "contact",
      title: "Contact",
      expanded: true,
      fields: [
        {
          id: "firstName",
          label: "First Name",
          value: "Olivia",
          type: "text"
        },
        {
          id: "lastName",
          label: "Last Name",
          value: "John",
          type: "text"
        },
        {
          id: "phone",
          label: "Phone Number",
          value: "(555) 123-4567",
          type: "phone",
          countryCode: "US"
        },
        {
          id: "email",
          label: "Email",
          value: "olivia.perry@example.com",
          type: "email"
        },
        {
          id: "address",
          label: "Address",
          value: "123 Maple Street, Springfield, IL 62704, USA",
          type: "text"
        }
      ]
    },
    {
      id: "additionalInfo",
      title: "Additional Info",
      expanded: true,
      fields: [
        {
          id: "businessName",
          label: "Business Name",
          value: "ABC Corp",
          type: "text"
        },
        {
          id: "streetAddress",
          label: "Street Address",
          value: "123 Main Street",
          type: "text"
        },
        {
          id: "city",
          label: "City",
          value: "Springfield",
          type: "text"
        },
        {
          id: "country",
          label: "Country",
          value: "United States",
          type: "text"
        }
      ]
    },
    {
      id: "preferences",
      title: "Used Car Buyer Preferences",
      expanded: false,
      fields: [
        {
          id: "preferredBrands",
          label: "Preferred Brands",
          value: "Toyota, Honda, Ford",
          type: "text"
        },
        {
          id: "budget",
          label: "Budget Range",
          value: "$15,000 - $25,000",
          type: "text"
        },
        {
          id: "vehicleType",
          label: "Vehicle Type",
          value: "Sedan, SUV",
          type: "text"
        }
      ]
    }
  ]
};

export const uiConfig = {
  colors: {
    primary: "#3b82f6",
    secondary: "#6b7280",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    light: "#f3f4f6",
    dark: "#1f2937"
  },
  
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },
  
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1200px"
  }
};