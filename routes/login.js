var express = require('express');
var router = express.Router();
var List = require('.././models/database').List;
var list = new List();

router.get('/login/:user/:password', function (req, res) {
    list.login(req.params.user, req.params.password).then(res => console.log(res));
});

// router.get('/login/:user', function (req, res) {
//   list.readById(req.params.user).then(res => console.log(res));
// });
//
// router.get('/upd/:id/:name/:nameru', function (req, res) {
//   console.log(req.params);
//   list.update('types', req.params.id, req.params.name, req.params.nameru).then(res => console.log(res));
// });

router.get('/reg/:user/:password', function (req, res) {
  // console.log(req.params);
  list.regUser(req.params.user, req.params.password).then(res => console.log(res));
});

module.exports = router;
