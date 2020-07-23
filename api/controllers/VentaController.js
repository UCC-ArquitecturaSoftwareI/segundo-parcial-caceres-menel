/**
 * VentaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  sold: async function (req, res) {
    let sum = req.param("sum");
    let amount = req.param("Price")
    const sale = {
      money: amount,
      client: req.session.user.id,
    }

    await Venta.create(sale).fetch();

    let arrprod = [];
    for (let i = 1; i < req.param("arrprod").length; i++) {
      if (req.param("arrprod")[i] !== ',') {
        arrprod.push(Number(req.param("arrprod")[i]));
      }
    }

    res.view('pages/Responsesell', {sale: sale.id, sum: sum, amount: amount, arrprod: arrprod});

  }

};

