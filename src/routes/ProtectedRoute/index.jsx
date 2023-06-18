import NDLayout from "@/components/NDLayout";
import NDLoading from "@/components/NDLoading";
import { AuthenticationContext } from "@/context/authentication";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/login");
    }
  }, [loading]);

  return loading ? <NDLoading /> : <NDLayout>{children}</NDLayout>;
}
