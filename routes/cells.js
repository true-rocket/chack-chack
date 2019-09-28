var express = require('express');
var router = express.Router();
var List = require('.././models/database').List;
var list = new List();

router.get('/read/all', function (req, res) {
    list.read('cells').then(res => console.log(res));
});

router.get('/:id', function (req, res) {
    list.readById('cells', req.params.id).then(res => console.log(res));
});

router.get('/del/:id', function (req, res) {
  console.log(req.params);
  list.del('cells', req.params.id).then(res => console.log(res));
});

router.get('/upd/:id/:name/:nameru/:descr/:type/:text', function (req, res) {
  console.log(req.params);
  list.update('cells', req.params.id, req.params.name, req.params.nameru, req.params.descr, req.params.type, req.params.text).then(res => console.log(res));
});

router.get('/create/:name/:nameru/:descr/:type/:text', function (req, res) {
  console.log(req.params);
  list.create('cells', req.params.name, req.params.nameru, req.params.descr, req.params.type, req.params.text).then(res => console.log(res));
});

module.exports = router;
