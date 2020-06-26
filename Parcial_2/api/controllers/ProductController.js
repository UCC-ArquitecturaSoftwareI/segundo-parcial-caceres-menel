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
    let amount = req.param("Price");                          /*Desde la linea 15 a la 19, se deberia cambiar el valor del*/
    let price = document.querySelector("#PriceOnly"); /*input (readonly) pero no hace nada*/

    amount += found.cost;
    price.value = amount;


    res.redirect('/orden');
  },

  newproduct: async function (req, res) {
    let found = await Product.findOne({     /*Desde la linea 26 a la 35 , deberia cambiar los valores de los */
      name: req.param("product"),           /* atributos, en cambio, esto no hace nada.*/
    });

    let newcost = req.param("price");

    if (found) {
      found.cost = newcost;
      found.stock = req.param("stock");
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

