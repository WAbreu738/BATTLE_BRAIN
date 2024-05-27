import React, { useState } from "react";
import { useStore } from "../../Options";

const region = [
  { region: "US", code: "US" },
  { region: "UK", code: "GB" },
  { region: "China", code: "CN" },
  { region: "Spain", code: "ES" },
  { region: "Austrailia", code: "AU" },
];

const Region = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setRegion } = useStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleRegionSelect = (selectedValue) => {
    setRegion(selectedValue); // Set the selected difficulty value in global state
    closeMenu(); // Close the menu after selecting a difficulty
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="inline-flex mt-4 items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Region
      </button>
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-24 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {region.map((item, index) => (
              <p
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                tabIndex="-1"
                onClick={() => handleRegionSelect(item.code)} // Call handleDifficultySelect with the selected difficulty value
                key={index}
              >
                {item.region}
              </p>
            ))}
            {/* <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              onClick={closeMenu}
            >
              UK
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              onClick={closeMenu}
            >
              China
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              onClick={closeMenu}
            >
              Spain
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              onClick={closeMenu}
            >
              Austrailia
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Region;
