/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {

  addorden: async function (req, res) {
    let size = req.param("size");
    let found = await Product.findOne({
      name: size
    });
    let number = req.param("Price");
    let amount = Number(number);
    amount += found.cost;

    res.view('pages/orden',{amount:amount});
  },

  newproduct: async function (req, res) {
    let found = await Product.findOne({     /*Desde la linea 26 a la 35 , deberia cambiar los valores de los */
      name: req.param("product"),           /* atributos, en cambio, esto no hace nada.*/
    });

    if (found) {
      await Product.updateOne({id:found.id}).set({
                                cost:req.param("price"),
                                stock:req.param("stock")});
    } else {
      const prod = {
        name: req.param("product"),
        cost: req.param("price"),
        stock: req.param("stock")
      }

      await Product.create(prod).fetch();
    }

    res.redirect('/newproduct');
  }
};

