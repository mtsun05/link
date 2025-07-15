import { jwtDecode } from "jwt-decode";

export const validToken = (token) => {
  if (!token || token == "undefined") return false;
  console.log(token);

  const decoded = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp > currentTime;
};
