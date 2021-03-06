/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {view: 'pages/homepage'},

  //USUARIO
  'get /login': {view: 'pages/login'},
  'post /login': 'UserController.login',
  'get /signup': {view: 'pages/signup'},
  'post /signup': 'UserController.signup',
  '/logout': 'UserController.logout',

  //EMPLEADO
  '/orden': 'ProductController.orden',
  'post /sold/:arrprod/:sum': 'VentaController.sold',
  'get /search': {view: 'pages/search', locals: {type: 0, typesearch: 0}},
  'post /search': 'UserController.searchtype',
  '/typeproduct': 'ProductController.searchprod',
  '/typesale': 'VentaController.searchsale',
  '/typeuser': 'UserController.clients',


  //PRODUCTOS
  'post /produventa/:slale/:sum/:amount/:arrprod': 'ProdventController.produventa',
  '/chproducts': 'ProductController.products',
  'post /addorden/:arrprod': 'ProductController.addorden',
  'get /newproduct': {view: 'pages/newproduct'},
  'post /newproduct': 'ProductController.newproduct',
  'post /changeForm/:id': 'ProductController.changeForm',
  'get /change': {view: 'pages/changeprod'},
  'post /change': 'ProductController.change',
  'post /delete/:arrprod': 'ProductController.delete',

  //FLAVORS
  'get /flavors': {view: 'pages/newflavor'},
  'post /flavors':'FlavorsController.newflavor'

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/


};
