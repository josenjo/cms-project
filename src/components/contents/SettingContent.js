"use client";

import { useState, useEffect } from 'react';
import { useMenu } from '@/contexts/MenuContext';

export default function SettingsContent() {
  const { menuData, addMenuGroup, removeMenuGroup, addMenu, removeMenu } = useMenu();

  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuUrl, setNewMenuUrl] = useState('');
  const [currentMenus, setCurrentMenus] = useState([]);

  // Effect to update currentMenus when selectedGroupId or menuData changes
  useEffect(() => {
    if (selectedGroupId && menuData[selectedGroupId]) {
      setCurrentMenus(menuData[selectedGroupId].menus);
    } else {
      setCurrentMenus([]);
    }
  }, [selectedGroupId, menuData]);

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      addMenuGroup(newGroupName.trim());
      setNewGroupName('');
    }
  };

  const handleRemoveGroup = (groupId) => {
    if (confirm('Are you sure you want to remove this menu group and all its menus?')) {
      removeMenuGroup(groupId);
      if (selectedGroupId === groupId) {
        setSelectedGroupId(''); // Reset selected group if it was removed
      }
    }
  };

  const handleAddMenu = () => {
    if (selectedGroupId && newMenuName.trim() && newMenuUrl.trim()) {
      addMenu(selectedGroupId, newMenuName.trim(), newMenuUrl.trim());
      setNewMenuName('');
      setNewMenuUrl('');
    } else {
      alert('Please select a group and provide both menu name and URL.');
    }
  };

  const handleRemoveMenu = (menuId) => {
    if (confirm('Are you sure you want to remove this menu item?')) {
      removeMenu(selectedGroupId, menuId);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Menu Group Management</h3>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            id="new-group-name"
            className="flex-1 shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="New Menu Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <button
            id="add-group-btn"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
            onClick={handleAddGroup}
          >
            Add Group
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-md">Group Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-md">Actions</th>
              </tr>
            </thead>
            <tbody id="menu-groups-list" className="bg-white divide-y divide-gray-200">
              {Object.keys(menuData).map((groupId) => (
                <tr key={groupId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{menuData[groupId].name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      data-group-id={groupId}
                      className="remove-group-btn text-red-600 hover:text-red-900 transition duration-200 ease-in-out"
                      onClick={() => handleRemoveGroup(groupId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Menu Management</h3>
        <div className="mb-4">
          <label htmlFor="select-menu-group" className="block text-gray-700 text-sm font-bold mb-2">Select Menu Group</label>
          <select
            id="select-menu-group"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
          >
            <option value="">-- Select a Group --</option>
            {Object.keys(menuData).map((groupId) => (
              <option key={groupId} value={groupId}>
                {menuData[groupId].name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            id="new-menu-name"
            className="flex-1 shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="New Menu Name"
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
          />
          <input
            type="url"
            id="new-menu-url"
            className="flex-1 shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="New Menu URL (e.g., /about)"
            value={newMenuUrl}
            onChange={(e) => setNewMenuUrl(e.target.value)}
          />
          <button
            id="add-menu-btn"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
            onClick={handleAddMenu}
          >
            Add Menu
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-md">Menu Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-md">Actions</th>
              </tr>
            </thead>
            <tbody id="menus-list" className="bg-white divide-y divide-gray-200">
              {currentMenus.length > 0 ? (
                currentMenus.map((menu) => (
                  <tr key={menu.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{menu.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600">{menu.url}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        data-menu-id={menu.id}
                        className="remove-menu-btn text-red-600 hover:text-red-900 transition duration-200 ease-in-out"
                        onClick={() => handleRemoveMenu(menu.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {selectedGroupId ? 'No menus found for this group.' : 'Select a group to view menus.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}