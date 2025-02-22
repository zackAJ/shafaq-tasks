import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownProps {
  options: string[];
  defaultOption?: string;
  onSelect?: ({ option, setSelectedOption, setIsOpen }: {
    option: string,
    setSelectedOption: (opt: string) => void,
    setIsOpen: (val: boolean) => void,
  }) => void;
  placeholder?: React.ReactNode | string;
  className?: string;
}

export default function Dropdown({
  options,
  defaultOption,
  onSelect,
  placeholder = "Select an option",
  className = ""
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleSelect = (option: string) => {
    if (!onSelect) return

    onSelect({
      option,
      setSelectedOption,
      setIsOpen,
    });
  };

  return (
    <div className={`relative inline-block text-left my-auto ${className}`}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-between items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate">
            {selectedOption || placeholder}
          </span>
          <ChevronDown
            className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''
              }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-200 ring-opacity-5">
          <div className="max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option}
                className={`px-4 py-2 text-sm rounded-md cursor-pointer hover:bg-gray-50 ${selectedOption === option ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                  }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
