/**
 * ProdventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  produventa: async function (req, res) {
    let arrprod = [];
    let sum = req.param("sum");
    let amount = req.param("amount");
    let sale = req.param("sale");
    //res.send(sale);

    for (let i = 0; i < req.param("arrprod").length; i++) {
      if (req.param("arrprod")[i] !== ',') {
        arrprod.push(Number(req.param("arrprod")[i]));
      }
    }

    for (let i = 0; i < arrprod.length; i++) {
      const prodventa = {
        price: amount,
        amount: sum,
        envase: arrprod[i],
        ventas: sale
      }
      await Prodvent.create(prodventa).fetch();
    }


    let product = await Product.find({});
    res.view('pages/orden', {products: product, amount: 0, sum: 0, arrprod: [0]});

  }

};

