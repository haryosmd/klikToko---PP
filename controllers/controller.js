const {User} = require('../models')

class Controller {
    static loginForm(req, res) {
        res.render("loginForm")
    }
    static registerForm(req, res) {
        res.render("formRegister")
    }
    static postRegister(req, res) {
        console.log(req.body);
        const { username, password, role} = req.body
        User.create({username, password, role})
        .then(data => {
            res.redirect('/login')
        })
        .catch(err => {
            console.log(err);
            res.send(err)  
        })
    }
}
module.exports = Controller