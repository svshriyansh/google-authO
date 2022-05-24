const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("./auth");
const app = express();

function isLoggedIn(req, res, next) {
  console.log(req.user);
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticating with google</a>');
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});
app.get("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbuy...!");
});
app.get("/auth/failure", (req, res) => {
  res.send("something went wrong");
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listing on 5000"));
