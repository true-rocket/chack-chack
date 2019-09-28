var express = require('express');
var router = express.Router();
var List = require('.././models/database').List;
var list = new List();

router.get('/:id', function (req, res) {
    list.readById(req.params.id).then(res => console.log(res));
    list.readById(req.params.id).then(res => console.log(res));
});

module.exports = router;
