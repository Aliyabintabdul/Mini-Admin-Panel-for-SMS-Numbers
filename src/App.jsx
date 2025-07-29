import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login_page";
import AdminPage from "./pages/admin_page";
import config from "../config.json"; // Make sure path is correct

const App = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Routes>
        {config.features.enableLogin && (
          <Route path="/" element={<LoginPage />} />
        )}
        
        {config.features.enableAdmin && (
          <Route
            path="/admin"
            element={isLoggedIn ? <AdminPage /> : <Navigate to="/" />}
          />
        )}

        {/* fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
