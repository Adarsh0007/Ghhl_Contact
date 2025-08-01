import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import './Header.css';

const Header = ({ title, position }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="back-button">
            <ArrowLeft size={20} />
          </button>
          <h1 className="header-title">{title}</h1>
        </div>
        
        <div className="header-right">
          <div className="navigation-controls">
            <button className="nav-button">
              <ChevronLeft size={20} />
            </button>
            <span className="position-indicator">{position}</span>
            <button className="nav-button">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;