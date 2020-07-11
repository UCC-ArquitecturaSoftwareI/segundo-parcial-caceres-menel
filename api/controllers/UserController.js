/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: async function (req, res) {
    let user = req.param('User');
    let pass = req.param('Pass');

    let found = await User.findOne({
      username: user,
      password: pass
    });

    if (found) {
      req.session.user = found;
      res.redirect('/');
    } else {
      req.session.user = null;
      res.view('pages/login');
    }
  },

  signup: async function (req,res){
    let user = req.param('user');
    if (User.findOne({username: user})){
      //res.send('Ya existe el usuario');
      res.redirect('/signup');
    }
    const users = {
      username: user,
      password:req.param('pass'),
      name:req.param('name'),
      lastname:req.param('lastname'),
      email:req.param('mail'),
      phoneNumber:req.param('phone')
    };
    await User.create(users).fetch();
    res.redirect('/');
  },

  logout: async function(req,res){
    req.session.user = null;
    res.redirect('/');
  }
};

