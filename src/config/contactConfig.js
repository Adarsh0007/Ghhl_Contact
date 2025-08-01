export const contactConfig = {
  header: {
    title: "Contact Details",
    navigation: {
      showBack: true,
      showNext: true,
      showPrevious: true,
      currentPage: 1,
      totalPages: 356
    }
  },
  profile: {
    name: "Olivia John",
    avatar: "/api/placeholder/40/40",
    showCallButton: true
  },
  ownership: {
    owner: {
      label: "Owner",
      name: "Devon Lane",
      avatar: "/api/placeholder/24/24",
      hasDropdown: true
    },
    followers: {
      label: "Followers",
      count: 2,
      avatars: ["/api/placeholder/24/24", "/api/placeholder/24/24"],
      hasDropdown: true
    }
  },
  tags: [
    { id: 1, label: "Shared Contact", color: "blue", removable: true },
    { id: 2, label: "VIP", color: "purple", removable: true },
    { id: 3, label: "+15", color: "gray", removable: false }
  ],
  tabs: [
    { id: "all", label: "All Fields", active: true },
    { id: "dnd", label: "DND", active: false },
    { id: "actions", label: "Actions", active: false }
  ],
  sections: [
    {
      id: "contact",
      title: "Contact",
      collapsible: true,
      expanded: true,
      fields: [
        {
          id: "firstName",
          label: "First Name",
          value: "Olivia",
          type: "text",
          required: true,
          gridColumn: "1/2"
        },
        {
          id: "lastName",
          label: "Last Name",
          value: "John",
          type: "text",
          required: true,
          gridColumn: "2/3"
        },
        {
          id: "phone",
          label: "Phone Number",
          value: "(555) 123-4567",
          type: "phone",
          countryCode: "US",
          gridColumn: "1/3"
        },
        {
          id: "email",
          label: "Email",
          value: "olivia.perry@example.com",
          type: "email",
          gridColumn: "1/3"
        },
        {
          id: "address",
          label: "Address",
          value: "123 Maple Street, Springfield, IL 62704. USA.",
          type: "textarea",
          gridColumn: "1/3"
        }
      ]
    },
    {
      id: "additionalInfo",
      title: "Additional Info",
      collapsible: true,
      expanded: true,
      fields: [
        {
          id: "businessName",
          label: "Business Name",
          value: "ABC Corp",
          type: "text",
          gridColumn: "1/3"
        },
        {
          id: "streetAddress",
          label: "Street Address",
          value: "123 Main Street",
          type: "text",
          gridColumn: "1/3"
        },
        {
          id: "city",
          label: "City",
          value: "Springfield",
          type: "text",
          gridColumn: "1/2"
        },
        {
          id: "country",
          label: "Country",
          value: "United States",
          type: "text",
          gridColumn: "2/3"
        }
      ]
    },
    {
      id: "preferences",
      title: "Used Car Buyer Preferences",
      collapsible: true,
      expanded: false,
      fields: []
    }
  ]
};

export const themeConfig = {
  colors: {
    primary: "#3B82F6",
    secondary: "#6B7280",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    background: "#F9FAFB",
    surface: "#FFFFFF",
    border: "#E5E7EB",
    text: {
      primary: "#111827",
      secondary: "#6B7280",
      light: "#9CA3AF"
    }
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem"
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem"
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
  }
};