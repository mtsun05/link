import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/failure",
  }),
  (req, res) => {
    res.redirect("https://localhost:5173");
  }
);

router.get("/failure", (req, res) => {
  res.send({ message: "Auth failed" });
});

router.get("/check", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Failed" });
  }
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during Passport logout:", err);
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return next(err);
      }

      res.clearCookie("connect.sid", {
        path: "/",
        secure: true,
        httpOnly: true,
      });

      console.log("User logged out and session destroyed.");
      res.sendStatus(200);
    });
  });
});

export default router;
