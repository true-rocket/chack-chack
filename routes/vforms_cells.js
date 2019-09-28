var express = require('express');
var router = express.Router();
var List = require('.././models/database').List;
var list = new List();

router.get('/read/all', function (req, res) {
    list.read('vforms_cells').then(res => console.log(res));
});

router.get('/:id', function (req, res) {
    list.readById('vforms_cells', req.params.id).then(res => console.log(res));
});

router.get('/del/:id', function (req, res) {
  console.log(req.params);
  list.del('vforms_cells', req.params.id).then(res => console.log(res));
});

router.get('/upd/:id/:name/:nameru/:descr/:type/:text/:required/:num/:grouping/:page', function (req, res) {
  console.log(req.params);
  list.update('vforms_cells', req.params.id, req.params.name, req.params.nameru, req.params.descr, req.params.type, req.params.text, req.params.required, req.params.num, req.params.grouping, req.params.page).then(res => console.log(res));
});

router.get('/create/:form_id/:cell_id/:name/:nameru/:descr/:type/:text/:required/:num/:grouping/:page', function (req, res) {
  console.log(req.params);
  list.create('vforms_cells', req.params.form_id, req.params.cell_id, req.params.name, req.params.nameru, req.params.descr, req.params.type, req.params.text, req.params.required, req.params.num, req.params.grouping, req.params.page).then(res => console.log(res));
});

module.exports = router;
