import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";
import { LanguageProvider } from "./context/LanguageContext";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Calendar from "./pages/Calendar";
import Donate from "./pages/Donate";
import History from "./pages/History";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import WhoWeAre from "./pages/WhoWeAre";
import "./App.css";

const App = () => (
  <LanguageProvider>
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="history" element={<History />} />
              <Route path="videos" element={<Videos />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="who-we-are" element={<WhoWeAre />} />
              <Route path="donate" element={<Donate />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  </LanguageProvider>
);

export default App;
