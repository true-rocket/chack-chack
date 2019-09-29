var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var listsRouter = require('./routes/lists');
var cellsRouter = require('./routes/cells');
var formsRouter = require('./routes/forms');
var typesRouter = require('./routes/types');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/cells', cellsRouter);
app.use('/forms', formsRouter);
app.use('/types', typesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



// app.get('/lists/:id', function (req, res) {
//     list.readById(req.params.id, function (err, result) {
//         res.render('item', {item: result.rows[0]});
//     });
// });

// app.get('/lists/:id/fields/add', function (req, res) {
//     res.render('field_form', {item: {name: '',
//                                sys_name: ''}});
// });
//
// app.post('/lists/:id/fields/add', function (req, res) {
//     field.create({name: req.body.name,
//                   sys_name: req.body.sys_name,
//                   type_id: req.body.type_id,
//                   list_id: req.params.id}, function (err, result) {
//             res.redirect('/lists/' + req.params.id);
//     });
// });
//
// app.get('/lists/:list_id/fields/delete/:field_id', function (req, res) {
//     field.del(req.params.field_id, function () {
//         res.redirect('/lists/' + req.params.list_id);
//     });
// });
//
// app.get('/lists/:list_id/fields/edit/:field_id', function (req, res) {
//     field.readById(req.params.field_id, function (err, result) {
//         res.render('field_form', {item: result.rows[0]});
//     });
// });
//
// app.post('/lists/:list_id/fields/edit/:field_id', function (req, res) {
//     field.update(req.params.field_id, req.body.name, req.body.type_id, function () {
//         res.redirect('/lists/' + req.params.list_id);
//     });
// });
