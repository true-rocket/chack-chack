var express = require('express');
var router = express.Router();
var List = require('.././models/database').List;
var list = new List();

router.get('/read/all', function (req, res) {
    list.read('types').then(res => console.log(res));
});

router.get('/:id', function (req, res) {
  console.log(req.params);
  list.readById('types', req.params.id).then(res => console.log(res));
});

router.get('/del/:id', function (req, res) {
  console.log(req.params);
  list.del('types', req.params.id).then(res => console.log(res));
});

router.get('/upd/:id/:name/:nameru', function (req, res) {
  console.log(req.params);
  list.update('types', req.params.id, req.params.name, req.params.nameru).then(res => console.log(res));
});

router.get('/create/:name/:nameru', function (req, res) {
  console.log(req.params);
  list.create('types', req.params.name, req.params.nameru).then(res => console.log(res));
});

module.exports = router;
