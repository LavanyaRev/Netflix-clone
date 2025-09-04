import React from 'react';

interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute top-12 right-0 w-48 bg-black border border-gray-800 rounded-md shadow-lg z-50">
      <div className="flex flex-col p-2">
        <button className="text-white text-left px-2 py-1 hover:bg-gray-700 rounded transition">
          Profile
        </button>
        <button className="text-white text-left px-2 py-1 hover:bg-gray-700 rounded transition">
          Settings
        </button>
        <button className="text-white text-left px-2 py-1 hover:bg-gray-700 rounded transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
