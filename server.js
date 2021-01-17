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

const firebaseConfig = {
  apiKey: "AIzaSyAmB6NpA6m3m-p_qe-h4uuHeaYJRpta1g4",
  authDomain: "fouryearplan-webapp.firebaseapp.com",
  projectId: "fouryearplan-webapp",
  storageBucket: "fouryearplan-webapp.appspot.com",
  messagingSenderId: "132199798821",
  appId: "1:132199798821:web:a157f6282f901ae1ee47cc"
};

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://server-auth-41acc.firebaseio.com",
});

const db = admin.firestore();

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

// DB Requests

// Adds new user from signup to DB
app.post("/recordNewUserInDB", (req, res) => {
  console.log("Server requested to add user to DB");
  console.log(req.body);

  db.collection("users").doc(req.body.id).set({
      email: req.body.email,
      uid: req.body.id,
      name: req.body.name,
      username: req.body.name,
      college: req.body.college,
      courses: [],
      plan: []
    })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
});

// Adds new courses from main to DB
app.post("/recordNewCourse", (req, res) => {
  console.log("Server requested to add new course to DB");
  const newCourse = req.body.course;
  console.log(newCourse);
  const userUID = req.body.uid;
  console.log(userUID);
  db.collection("users").doc(userUID).update({
      courses: admin.firestore.FieldValue.arrayUnion(newCourse)
    })
    .then(function () {
      console.log("Successfully added new course to user's courses!");
    })
    .catch(function (error) {
      console.error("Error writing new course: ", error);
    });
});

// Fetches a user's courses from DB
app.get("/getUserCourses", (req, res) => {
  console.log("Client has requested server to get user's courses.");
  // user's doc in DB
  const userDoc = db.collection("users").doc(req.header('uid'));
  
  userDoc.get().then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      res.send(doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
});

// Fetches a user's courses from DB
app.get("/getUserCourses", (req, res) => {
  console.log("Client has requested server to get user's courses");
  // user's doc in DB

  const userDoc = db.collection("users").doc(req.header('uid'));

  userDoc.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        res.send(doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

});



// Lists Courses from DB for a school 
app.get("/listCourses", (req, res) => {
  console.log("Client has requested server to list courses for a school from DB");

  const schoolName = req.body.school;

  //not sure how this works
  console.log(schoolName);
  var docRef = db.collection("schools").doc(schoolName);

  docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        res.send(doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

});




app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);

});