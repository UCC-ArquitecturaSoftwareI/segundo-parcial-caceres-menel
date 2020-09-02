/**
 * FlavorsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  newflavor: async function(req,res){
    if(await Flavors.findOne({name: req.param("sabor")})){
      res.redirect('/flavors');
    }else{
      const flavor = {
        name: req.param("sabor"),
        isAlcohol: req.param("isAlcohol"),
        kilos: req.param("stock")
      }
      await Flavors.create(flavor).fetch();
      res.redirect('/flavors');
    }

  }

};

