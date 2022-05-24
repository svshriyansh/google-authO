const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
GOOGLE_CLIENT_ID =
  "165328502385-kjai1tn72alrthpp402o1cm5amhissg6.apps.googleusercontent.com";
GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://demo-autho.herokuapp.com/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
