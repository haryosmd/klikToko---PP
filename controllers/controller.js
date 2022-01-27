const { User, Product, Category } = require("../models");
const { Op } = require("sequelize");
const changeIdr = require('../helpers/changeIDR')
class Controller {
    
  static homePage(req, res) {
    const { name, categoryName } = req.query;

    let options

    if (name || categoryName) {
        if (name) {
            options = {
              where: {
                name: {
                  [Op.iLike]: `%${name}%`,
                },
              },
            }; 
        } else if (categoryName) {
            options = {
                include: {
                    model: Category,
                    where: {
                        name: {
                            [Op.iLike]: `%${categoryName}%` 
                        }
                      },
                }    
              }; 
        }
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


  static productDetails(req, res) {
    let { id } = req.params
    Product.findByPk(id)
    .then((data) => {
        res.render('productDetails', {data, changeIdr})
    })
    .catch((err) => {
        res.send(err)
    })
  }

static userProfile(req, res) {
   res.render('userProfile') 
}
}
module.exports = Controller;
