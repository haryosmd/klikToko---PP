// Happy coding guys
const express = require("express");
const Controller = require("./controllers/controller");
const app = express();
const port = 3000;
const session = require("express-session")
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'klik-toko',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false}
}))

app.set("view engine", "ejs");

app.get("/", Controller.home)

app.get("/login", Controller.formLogin);
app.post("/login", Controller.postLogin);

app.get("/register", Controller.formRegister);
app.post("/register", Controller.postRegister);

app.listen(port, () => {
  console.log("app is running in port", port);
});
