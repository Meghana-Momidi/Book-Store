export const checkTokenExpiration = () => {
  const token = localStorage.getItem("adminToken");
  const expirationTime = localStorage.getItem("adminTokenExpiration");

  if (!token || !expirationTime) {
    return false;
  }

  const currentTime = Date.now();

  if (currentTime >= Number(expirationTime)) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("adminTokenExpiration");
    localStorage.removeItem("currentUser");
    return false; // Token has expired
  }

  return true;
};
