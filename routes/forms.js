var express = require('express');
var router = express.Router();
var List = require('.././models/database').List;
var list = new List();

router.get('/read/all', function (req, res) {
    list.read('forms').then(res => console.log(res));
});

router.get('/:id', function (req, res) {
    list.readById(req.params.id, 'forms').then(res => console.log(res));
});

router.get('/del/:id', function (req, res) {
  console.log(req.params);
  list.del('forms', req.params.id).then(res => console.log(res));
});

router.get('/upd/:id/:name/:nameru/:descr/:timelimit/:required/:num', function (req, res) {
  console.log(req.params);
  list.update('forms', req.params.id, req.params.name, req.params.nameru, req.params.descr, req.params.timelimit, req.params.required, req.params.num).then(res => console.log(res));
});

router.get('/create/:name/:nameru/:descr/:timelimit/:required/:num', function (req, res) {
  console.log(req.params);
  list.create('forms', req.params.name, req.params.nameru, req.params.descr, req.params.timelimit, req.params.required, req.params.num).then(res => console.log(res));
});

module.exports = router;
