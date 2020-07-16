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
    let cant = req.param("plus");
    cant++;

    res.view('pages/orden', {amount: amount, sum: cant});
  },

  newproduct: async function (req, res) {
      const prod = {
        name: req.param("product"),
        cost: req.param("price"),
        stock: req.param("stock")
      }

      await Product.create(prod).fetch();
      res.redirect('/newproduct');
  },

  products: async function(req,res){
    let product = await Product.find({});

    res.view('pages/chproducts',{products:product});
  }
};

