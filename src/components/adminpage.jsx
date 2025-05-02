import React, { useEffect, useState } from "react";

const useAdminData = () => {
  const [numbers, setNumbers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://mocki.io/v1/811d6eaa-73aa-402b-8ca8-b094407bc0ce")
      .then((res) => res.json())
      .then((data) => {
        setNumbers(data);
        sortAndSetFiltered(data);
      });
  }, []);

  const handleToggle = (index) => {
    const newNumbers = [...filtered];
    newNumbers[index].status =
      newNumbers[index].status === "online" ? "offline" : "online";
    setFiltered(newNumbers);

    const updatedOriginal = numbers.map((item) =>
      item.phoneNumber === newNumbers[index].phoneNumber
        ? { ...item, status: newNumbers[index].status }
        : item
    );
    setNumbers(updatedOriginal);
  };

  const handleFilter = (value) => {
    setFilter(value);
    if (value === "All") {
      sortAndSetFiltered(numbers);
    } else {
      const filteredList = numbers.filter((n) => n.status === value);
      sortAndSetFiltered(filteredList);
    }
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    sortAndSetFiltered(filtered);
  };

  const sortAndSetFiltered = (list) => {
    const sorted = [...list].sort((a, b) => {
      return sortOrder === "asc" ? a.smsCount - b.smsCount : b.smsCount - a.smsCount;
    });
    setFiltered(sorted);
  };

  const getFlagEmoji = (phoneNumber) => {
    if (phoneNumber.startsWith("+1")) return "🇺🇸";
    if (phoneNumber.startsWith("+44")) return "🇬🇧";
    if (phoneNumber.startsWith("+49")) return "🇩🇪";
    if (phoneNumber.startsWith("+33")) return "🇫🇷";
    if (phoneNumber.startsWith("+61")) return "🇦🇺";
    if (phoneNumber.startsWith("+81")) return "🇯🇵";
    if (phoneNumber.startsWith("+55")) return "🇧🇧";
    return "🏳️";
  };

  const renderStatus = (status) => {
    const isActive = status === "online";
    return {
      label: isActive ? "Active" : "Inactive",
      bgColor: isActive ? "#d1f7dc" : "#fddede",
      dotColor: isActive ? "#22c55e" : "#ef4444",
      textColor: isActive ? "#14532d" : "#7f1d1d",
    };
  };

  return {
    numbers,
    filtered,
    filter,
    theme,
    sidebarCollapsed,
    sortOrder,
    handleToggle,
    handleFilter,
    toggleSortOrder,
    setSidebarCollapsed,
    setTheme,
    getFlagEmoji,
    renderStatus,
  };
};

export default useAdminData;
