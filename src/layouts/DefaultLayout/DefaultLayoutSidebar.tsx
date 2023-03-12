import { useState } from 'react';
import './DefaultLayoutSidebar.scss';

const DefaultLayoutSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="layouts-default-layout-sidebar-wrapper">
      <div
        className={`ribbon ${isSidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <div className="pointer">
            <span>&gt;</span>
          </div>
        ) : (
          <div className="pointer">
            <span>&lt;</span>
          </div>
        )}
        <div className="placeholder"></div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="content-wrapper">
          <div className="header">
            <h1>Sidebar Header</h1>
          </div>
          <div className="content">
            <p>Sidebar content</p>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="shadow" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default DefaultLayoutSidebar;
