import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setRoleLoading(true);
      fetch(
        `https://utility-bill-management-server-chi.vercel.app/users/role/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRole(data.role);
          setRoleLoading(false);
        })
        .catch(() => {
          setRoleLoading(false);
        });
    } else if (!loading) {
      setRoleLoading(false);
    }
  }, [user, loading]);

  return [role, roleLoading];
};

export default useRole;
