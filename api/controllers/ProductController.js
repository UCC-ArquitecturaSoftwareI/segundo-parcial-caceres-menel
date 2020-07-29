/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  orden: async function (req, res) {
    let product = await Product.find({});

    res.view('pages/orden', {products: product, amount: 0, sum: 0, arrprod: [0]});
  },


  addorden: async function (req, res) {
    let found = await Product.findOne({
      name: req.param("size")
    });


    let arrprod = [];

    for (let i = 0; i < req.param("arrprod").length; i++) {
      if (req.param("arrprod")[i] !== ',') {
        arrprod.push(Number(req.param("arrprod")[i]));
      }
    }

    arrprod.push(found.id);

    let amount = Number(req.param("Price"));
    amount += found.cost;
    let cant = req.param("plus");
    cant++;

    let newstock = found.stock;
    newstock--;
    await Product.updateOne({name: found.name}).set({
      stock: newstock
    });

    if (newstock <= 50) {
      res.send("Reponer stock de " + found.name + ".Quedan " + newstock + " envases.");
    } else {
      let product = await Product.find({});
      res.view('pages/orden', {products: product, amount: amount, sum: cant, arrprod: arrprod});
    }
  },

  delete: async function (req, res) {
    let found = await Product.findOne({
      name: req.param("size")
    });
    let amount = Number(req.param("Price"));

    let arrprod = [];
    let product = await Product.find({});

    for (let i = 0; i < req.param("arrprod").length; i++) {
      if (req.param("arrprod")[i] !== ',') {
        arrprod.push(Number(req.param("arrprod")[i]));
      }
    }
    arrprod.pop();


    if (amount <= 0) {
      res.view('pages/orden', {products: product, amount: 0, sum: 0, arrprod: [0]});
    } else {
      amount -= found.cost;

      let cant = req.param("plus");
      cant--;

      let newstock = found.stock;
      newstock++;
      await Product.updateOne({name: found.name}).set({
        stock: newstock
      });


      res.view('pages/orden', {products: product, amount: amount, sum: cant, arrprod: arrprod});
    }

  },

  newproduct: async function (req, res) {
    const prod = {
      name: req.param("product"),
      cost: req.param("price"),
      stock: req.param("stock")
    }

    await Product.create(prod).fetch();
    res.redirect('/chproducts');
  },

  products: async function (req, res) {
    let product = await Product.find({});

    res.view('pages/chproducts', {products: product});
  },

  change: async function (req, res) {
    let product = await Product.findOne({
      name: req.param("product")
    });

    await Product.updateOne({id: product.id}).set({
      cost: req.param("price"),
      stock: product.stock + Number(req.param("stock"))
    });

    res.redirect('/chproducts');

  },
  changeForm: async function (req, res) {
    let id = req.param("id");
    let product = await Product.findOne({id: id});
    res.view('pages/changeprod', {product: product});
  },

  searchprod: async function (req, res) {
    let products = await Product.find({});
    res.view('pages/search', {type: products,typesearch: 'Productos'});
  }

};

