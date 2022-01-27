const {User, UserDetail} = require('../models')
const bcrypt = require("bcryptjs")

class Controller {
    static home(req,res) {
        res.render("home")
    }
  
    static formRegister(req, res) {
        res.render("formRegister")
    }

    static postRegister(req, res) {
        const { name, dateOfBirth, email, password, role} = req.body
        UserDetail.create({name, dateOfBirth, email, password, role})
        .then((data) => {
            return User.create({email, password, role, UserDetailId: data.id})
        })
        .then(data => {
            res.redirect('/login')
        })
        .catch(err => {
            console.log(err); 
        })
    }

    static formLogin(req, res) {
        const { error } = req.query
        res.render("formLogin", { error })
    }

    static postLogin(req, res) {
        const {email, password} = req.body
        User.findOne({where: { email }})
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if (isValidPassword) {

                        req.session.userId = user.id

                        return res.redirect('/')
                    } else {
                        const error = "Invalid email/password"
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "Invalid email/password"
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }
}
module.exports = Controller