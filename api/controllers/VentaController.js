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
      /*sold: {
        price: req.param("Price"),
        amount:req.sum,
        prod: req.product.id,
        sell: req.venta.id
      }*/
    }
    await Venta.create(sale).fetch();
    res.view('pages/orden',{amount:0, sum:0});
  }

};

