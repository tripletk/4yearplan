const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
require("firebase/auth");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://server-auth-41acc.firebaseio.com",
});

const csrfMiddleware = csrf({
  cookie: true
});

const PORT = process.env.PORT || 3000;
const app = express();

app.engine("html", require("ejs").renderFile);
app.use(express.static('static'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

app.get("/login", function (req, res) {
  res.render("login.html");

});

app.get("/signup", function (req, res) {
  res.render("signup.html");
});

app.get("/main", function (req, res) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */ )
    .then(() => {
      res.render("main.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });

});

app.get("/", function (req, res) {
  res.render("index.html");
});

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, {
      expiresIn
    })
    .then(
      (sessionCookie) => {
        const options = {
          maxAge: expiresIn,
          httpOnly: true
        };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({
          status: "success"
        }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
  //res.render("index.html");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
  const firebaseConfig = {
    apiKey: "AIzaSyAmB6NpA6m3m-p_qe-h4uuHeaYJRpta1g4",
    authDomain: "fouryearplan-webapp.firebaseapp.com",
    projectId: "fouryearplan-webapp",
    storageBucket: "fouryearplan-webapp.appspot.com",
    messagingSenderId: "132199798821",
    appId: "1:132199798821:web:a157f6282f901ae1ee47cc"
  };

  firebase.initializeApp(firebaseConfig);

  //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  firebase.auth().onAuthStateChanged(user => {
    if (!user) return;
    console.log(user);
  });
});