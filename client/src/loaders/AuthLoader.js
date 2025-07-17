import { redirect } from "react-router-dom";
import fetchAPI from "../api/fetchAPI";

export const authLoader = async () => {
  try {
    const userData = await fetchAPI("/auth/check");

    if (!userData || !userData.googleID) {
      console.log("No user data found, redirecting to login.");
      return redirect("/users/login");
    }
    console.log("AuthLoader: ", userData);
    return userData;
  } catch (e) {
    if (e.status == 401) {
      console.log("Auth check failed, redirecting to login.");
      return redirect("/users/login");
    }
    console.error("Error during authLoader:", e.errorMessage);
    return redirect("/users/login");
  }
};
