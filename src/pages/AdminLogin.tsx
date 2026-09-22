import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const AdminLogin = () => {
  const { isAdmin, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = login(username, password);
    if (ok) {
      navigate("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <div className="page narrow">
      <header className="page-hero">
        <p className="kicker">{t("adminLogin.kicker")}</p>
        <h1>{t("adminLogin.title")}</h1>
        <p className="lede">{t("adminLogin.lede")}</p>
      </header>
      <form className="panel form" onSubmit={handleSubmit}>
        <label>
          {t("adminLogin.username")}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label>
          {t("adminLogin.password")}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="form-error">{t("adminLogin.error")}</p>}
        <button className="btn" type="submit">
          {t("adminLogin.submit")}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
