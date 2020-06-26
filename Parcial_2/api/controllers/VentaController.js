/**
 * VentaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  sold: async function(req,res){
    const sale = {
      money: req.param("Price"),
      client: req.session.user.id,
    }
    await Venta.create(sale).fetch();
    res.redirect('/orden');
  }

};

