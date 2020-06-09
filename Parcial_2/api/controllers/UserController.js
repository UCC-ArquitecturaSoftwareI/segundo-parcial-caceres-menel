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
      res.redirect('/login');
    }
  },

};

