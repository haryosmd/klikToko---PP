const { User, Product, Category } = require("../models");
const { Op } = require("sequelize");

class Controller {
    
  static homePage(req, res) {
    const { name } = req.query;
    let options
    if (name) {
        options = {
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        }; 
    }

    let dataProduct;
    Product.findAll(options)
      .then((data) => {
        dataProduct = data;
        return Category.findAll();
      })
      .then((dataCategory) => {
        res.render("homePage", { dataCategory, dataProduct });
      })
      .catch((err) => {
        // console.log(err);
        res.send(err);
      });
  }

  static loginForm(req, res) {
    res.render("loginForm");
  }
  static registerForm(req, res) {
    res.render("formRegister");
  }
  static postRegister(req, res) {
    console.log(req.body);
    const { username, password, role } = req.body;
    User.create({ username, password, role })
      .then((data) => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
}
module.exports = Controller;
