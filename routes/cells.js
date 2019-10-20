var express = require('express');
var router = express.Router();
var List = require('.././models/database').List;
var list = new List();

router.get('/read/all', function (req, res) {
    list.read('cells').then(res => console.log(res));
});

router.get('/get/:id', function (req, res) {
    list.readById('cells', req.params.id).then(res => console.log(res));
});

router.get('/del/', function (req, res) {
  console.log(req.body);
  list.del('cells', req.body.id).then(res => console.log(res));
});

router.post('/upd/', function (req, res) {
  console.log(req.body);
  list.update('cells', req.body.id, req.body.name, req.body.nameru, req.body.descr, req.body.type, req.body.text).then(res => console.log(res));
});

router.post('/create', function (req, res) {
  console.log(req.body);
  list.create('cells', req.body.data.name, req.body.data.nameru, req.body.data.description, req.body.data.valuetype).then(res => console.log(res));
});

// router.get('/del/get/:id', function (req, res) {
//   console.log(req.params);
//   list.del('cells', req.params.id).then(res => console.log(res));
// });
// router.get('/upd/get/:id/:name/:nameru/:descr/:type/:text', function (req, res) {
//   console.log(req.params);
//   list.update('cells', req.params.id, req.params.name, req.params.nameru, req.params.descr, req.params.type, req.params.text).then(res => console.log(res));
// });
//
// router.get('/create/:name/:nameru/:descr/:type/:text', function (req, res) {
//   console.log(req.params);
//   list.create('cells', req.params.name, req.params.nameru, req.params.descr, req.params.type, req.params.text).then(res => console.log(res));
// });

module.exports = router;
