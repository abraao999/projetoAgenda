const { async } = require("regenerator-runtime");
const Login = require("../models/LoginModel")

exports.index = (req, res) => {
  if (req.session.user)
    return res.render('loginLogado')
  res.render('login')
  console.log(req.session.user)
  return;
};
exports.register = async (req, res) => {
  try {

    const login = new Login(req.body)
    await login.register()


    if (login.errors.length > 0) {
      req.flash("errors", login.errors)
      req.session.save(() => { return res.redirect('back') })
      return;
    }
  } catch (error) {
    res.render('404')
    console.log(error)
  }
  req.flash("success", "Usuario criado com sucesso")
  req.session.save(() => { return res.redirect('back') })
  return;
}

exports.logout = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}
exports.login = async (req, res) => {
  try {

    const login = new Login(req.body)
    await login.login()


    if (login.errors.length > 0) {
      req.flash("errors", login.errors)
      req.session.save(() => { return res.redirect('back') })
      return;
    }
    req.flash("success", "voce logou no sistema")
    req.session.user = login.user
    req.session.save(() => { return res.redirect('back') })
  } catch (error) {
    return res.render('404')
    console.log(error)
  }


};

