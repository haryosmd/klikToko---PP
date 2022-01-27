// Happy coding guys
const express = require("express");
const Controller = require("./controllers/controller");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", Controller.homePage)

app.get("/login", Controller.loginForm);

app.get("/register", Controller.registerForm);

app.post("/register", Controller.registerForm);





app.listen(port, () => {
  console.log("app is running in port", port);
});
