import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Use `react-router-dom` (not just `react-router`)

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear(); // ✅ Clear token or user session
    navigate("/signup", { replace: true }); // ✅ Redirect to signup/login page
  }, [navigate]);

  return null;
};

export default Logout;
