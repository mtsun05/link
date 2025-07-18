import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import mongoose from "mongoose";
import User from "../models/User.js";

passport.serializeUser((user, done) => {
  console.log("serialize: ", user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    console.log("deserialize: ", user);
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        console.log("existing: ", existingUser);
        return done(null, existingUser);
      }

      const newUser = await new User({
        googleID: profile.id,
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : "",
      }).save();
      console.log("new");
      done(null, newUser);
    }
  )
);
