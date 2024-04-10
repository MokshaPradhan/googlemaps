// components/Layout.js

import React from 'react';
import MapComponent from './MapComponent';

const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="flex-none md:w-96 w-80 p-2 pt-3 overflow-auto">
        <div className="flex flex-col space-y-2 h-full">
          {/* Your sidebar code */}
          <div className="flex flex-col space-y-2 h-full">
            <div className="p-4 surface-variant outline-text rounded-lg space-y-3">
              <p>
                <a
                  className="primary-text"
                  href="https://developers.google.com/maps/documentation/solar/overview?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Two distinct endpoints of the <b>Solar API</b>
                  <md-icon className="text-sm">open_in_new</md-icon>
                </a>
                offer many benefits to solar marketplace websites, solar installers, and solar SaaS designers.
              </p>

              <p>
                <b>Click on an area below</b>
                to see what type of information the Solar API can provide.
              </p>
            </div>

            {/* Your other sidebar content */}
          </div>

          {/* Your sidebar content that depends on location */}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-grow">
        <MapComponent />
      </div>
    </div>
  );
};

export default Layout;
