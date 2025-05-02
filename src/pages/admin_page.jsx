// admin_page.jsx
import React from "react";
import { FiPhone, FiChevronLeft, FiFilter } from "react-icons/fi";
import useAdminData from "../components/adminpage";

const AdminPage = () => {
  const {
    filtered,
    filter,
    theme,
    sortOrder,
    sidebarCollapsed,
    handleToggle,
    handleFilter,
    toggleSortOrder,
    setSidebarCollapsed,
    setTheme,
    getFlagEmoji,
    renderStatus,
  } = useAdminData();

  const isDark = theme === "dark";

  return (
    <div
      className={`flex h-screen font-sans ${
        isDark ? "bg-[#0f1117] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className="transition-all duration-300 p-4 bg-[#111827] text-white"
        style={{ width: sidebarCollapsed ? "60px" : "240px" }}
      >
        <div className="flex justify-between items-center mb-8">
          {!sidebarCollapsed && (
            <h2 className="text-xl font-semibold">SMS Admin</h2>
          )}
          <FiChevronLeft
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`cursor-pointer text-slate-300 text-xl transform ${
              sidebarCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <ul className="list-none p-0">
          <li
            className={`flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white cursor-pointer ${
              sidebarCollapsed ? "justify-center" : "justify-start"
            }`}
          >
            <FiPhone />
            {!sidebarCollapsed && "Numbers"}
          </li>
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">SMS Numbers</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm">{isDark ? "🌙 Dark" : "💡 Light"}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isDark}
                onChange={() => setTheme(isDark ? "light" : "dark")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>

        <div
          className={`rounded-2xl shadow-md p-6 ${
            isDark ? "bg-[#1c1e27]" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">
              All SMS Numbers{" "}
              <span className="text-gray-400 font-normal text-base">
                ({filtered.length} numbers)
              </span>
            </h3>
            <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 bg-white dark:bg-[#2a2d3a]">
              <FiFilter className="text-gray-600 dark:text-slate-200" />
              <select
                className="bg-transparent text-gray-700 dark:text-slate-100 text-sm focus:outline-none"
                value={filter}
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value="All">All Numbers</option>
                <option value="online">Active Only</option>
                <option value="offline">Inactive Only</option>
              </select>
            </div>
          </div>

          <table className="w-full border-collapse">
          <thead className={`${isDark ? "bg-[#2a2d3a]" : "bg-white"}`}>

              <tr className="text-left text-xs text-slate-500 uppercase">
                <th className="p-4">Phone Number</th>
                <th className="p-4 cursor-pointer" onClick={toggleSortOrder}>
                  Messages {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n, index) => {
                const statusInfo = renderStatus(n.status);
                return (
                  <tr
                    key={n.phoneNumber}
                    className="border-t border-slate-200 dark:border-slate-600"
                  >
                    <td
                      className={`p-4 text-sm ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {getFlagEmoji(n.phoneNumber)} {n.phoneNumber}
                    </td>
                    <td className={`p-4 text-sm ${isDark ? "text-white" : "text-gray-900"}`}>

                      {n.smsCount}
                    </td>
                    <td className="p-4 text-sm">
                      <span
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: statusInfo.bgColor,
                          color: statusInfo.textColor,
                        }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: statusInfo.dotColor }}
                        ></span>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <button
                        onClick={() => handleToggle(index)}
                        className="text-blue-600 hover:underline"
                      >
                        {n.status === "online" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
