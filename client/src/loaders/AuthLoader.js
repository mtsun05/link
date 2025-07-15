import { redirect } from "react-router-dom";

export const authLoader = async () => {
  try {
    const response = await fetch("https://localhost:5050/auth/check", {
      credentials: "include",
    });

    if (response.status == 401) {
      console.log("Auth check failed, redirecting to login.");
      return redirect("/users/login");
    }

    const userData = await response.json();
    if (!userData || !userData.googleID) {
      console.log("No user data found, redirecting to login.");
      return redirect("/users/login");
    }
    console.log("AuthLoader: ", userData);
    return userData;
  } catch (error) {
    console.error("Error during authLoader:", error);
    return redirect("/users/login");
  }
};
