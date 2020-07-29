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

  signup: async function (req, res) {
    let user = req.param('user');
    if (await User.findOne({username: user})) {
      //res.send('Ya existe el usuario');
      res.redirect('/signup');
    } else {
      const users = {
        username: user,
        password: req.param('pass'),
        name: req.param('name'),
        lastname: req.param('lastname'),
        email: req.param('mail'),
        phoneNumber: req.param('phone'),
        street: req.param('Street'),
        streetnum: req.param('Streetnum'),
        neighborhood: req.param('Neighborhood')
      };
      await User.create(users).fetch();
      res.redirect('/');
    }
  },

  logout: async function (req, res) {
    req.session.user = null;
    res.redirect('/');
  },

  clients: async function (req, res) {

    let client = await User.find({});
    let sales = [];
    let amount = [0];
    let i = 0;
    for (let c of client) {
      sales = await Venta.find({
        where: {client: c.id}
      });
      for (let s of sales) {
        amount[i] += s.money;
      }
      if (amount[i] == null) amount[i] = 0;
      i++;
    }


    res.view('pages/search', {type: client, typesearch: 'Usuarios', sell: amount});
  },

  searchtype: async function (req, res) {
    let typesearch = req.param('typesearch');
    if (typesearch === 'Ventas') {
      res.redirect('/typesale');
    }
    if (typesearch === 'Productos') {
      res.redirect('/typeproduct');
    } else {
      res.redirect('/typeuser');
    }
  }

};

