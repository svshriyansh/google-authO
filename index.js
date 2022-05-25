const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
require("./auth");
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(cookieParser());
function isLoggedIn(req, res, next) {
  console.log(req.user);
  req.user ? next() : res.redirect("/");
}

const authCheck = (req, res, next) => {
  if (!req.user) {
    // res.send("<a href = /auth/google> Sign in with your email </a>");
    res.sendFile(__dirname + "/signin.html");
  } else {
    next();
  }
};

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", authCheck, (req, res) => {
  // res.json({
  //   user: req.user.displayName,
  //   auth: true,
  // });
  res.send(`Hello ${req.user.displayName}<br></br>Email:${req.user.email}<br></br><a href = /logout> log Out </a>`);
});

app.get("/current", (req, res) => {
  res.send(req.user.displayName);
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/failure",
  })
);

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});
app.get("/logout", (req, res, next) => {
  req.logout();
  res.send("Goodbuy...!");
});
app.get("/auth/failure", (req, res) => {
  res.send("something went wrong");
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listing on ${port}`));
