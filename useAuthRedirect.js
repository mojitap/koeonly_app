import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/register");
    }
  }, [navigate]);
}