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
            <h1>Project summary</h1>
          </div>
          <div className="content">
            <p>Project was created using create-react-app</p>
            <p>
              Only sass depency was added to project (required for .scss) and
              development dependencies for code formatting (eslint and prettier)
            </p>
            <p>function keywoard was not used</p>
            <p>redux was not used</p>
            <p>Known types were ommited</p>
            <p>any and unknown not used for typing</p>
            <p>object not used for typing - object are described</p>
            <p>Code is splitted into components</p>
            <p>There are multiple function components</p>
            <p>There is a class component (Popup)</p>
            <p>No external stylesheets are imported</p>
            <p>Sass is used</p>
            <p>
              Relations between JS and CSS were achieved using selectors, CSS
              variables and custom `data-*` attributes
            </p>
            <p>
              Two form (for adding color and for viewing colors with filtering)
              were created
            </p>
            <p>Adding color is validated</p>
            <p>Colors are added to local storage</p>
            <p>Predefined colors cannot be removeed by user</p>
            <p>Filtering shows every color that fits the filters</p>
            <p>Colors are named using HEX RGB form, with uppercase</p>
            <p>Colors are represented by colored rectangle above name</p>
            <p>Colors are sorted with order red, green, blue</p>
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
