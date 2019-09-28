var pg = require('pg');
var Pool = require('pg-pool');
// var conString = 'postgres://postgres:postgres@192.168.1.5:5432/trocket';

const configCon = {
  user: 'postgres',
  password: 'postgres',
  host: '192.168.1.5',
  port: 5432,
  database: 'trocket',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
};

async function query(sql, params, callback) {
  console.log(sql, params);
  var res = await (async () => {
    var pool = new Pool(configCon);
    var client = await pool.connect()
    try {
      var result = await client.query(sql, params)
    } finally {
      client.release()
      await pool.end()
      var res = result && result.rows ? result.rows : ('no response')
      return JSON.stringify(res)
    }
  })()
  .catch(e => {
    console.error(e.message, e.stack)
    return 'error'
  })
  // console.log(res)
  return res;
};
      // if (err) return done(err)
      //
      // const query = client.query('SELECT * from list where id = $1', [params], (err, res) => {
      //   done()
      //   if (err) {
      //     return console.error('query error', err.message, err.stack)
      //   }
      //   query.on('row', (row) => {
      //     results.push(row);
      //   });
      //   query.on('end', () => {
      //     done();
      //     return res.json(results);
      //   });
      // })

    // pool.connect().then(client => {
    //   client.query('select name from list where id = 123').then(res => {
    //     client.release()
    //     console.log('hello from', res.rows[0].name)
    //   })
    //   .catch(e => {
    //     client.release()
    //     console.error('query error', e.message, e.stack)
    //   })
    // })

    // pool.connect(function(err, client, done) {
    //
    //   if (err) {
    //     return console.error('error fetching client from pool', err);
    //   }
    //   client.query('select name from list where id = 123', 'pg-pool', function(err, result) {
    //     done();
    //     if (err) {
    //       return console.error('error running query', err);
    //     }
    //     console.log('hello from', result.rows[0])
    //     // if (callback) {
    //     //     callback(err, result);
    //     // }
    //   });
    //
    // });

async function login(usr, pwd) {
    var logined = false;
    var res = await query('select * from users where user = ' + usr + ' and password = ' + pwd, []);
    if (res != 'no response') { logined = true };
    console.log(logined);
    return logined;
}

async function regUser(usr, pwd) {
    var registered = await query('select * from users where user = ' + usr, [])
      .then(async (resp) => {
        if (resp == 'no response') {
          var res = await query('insert into users (user, password) values (\'' + usr + '\',\'' + pwd + '\')', []);
          if (res != 'error') {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
    })
    console.log(registered);
    return registered;
}

async function create(table, ...args) {
    switch (table) {
      case 'types':
        var res = await query('insert into ' + table + ' (name, nameru) values (\'' + arguments[1] + '\',\'' + arguments[2] + '\')', []);
        break;
      case 'cells':
        var res = await query('insert into ' + table + ' (name, nameru, descr, type, text) values (\'' + arguments[1] + '\',\'' + arguments[2] + '\',\'' + arguments[3] + '\',\'' + arguments[4] + '\',\'' + arguments[5] + '\')', []);
        break;
      case 'forms':
        var res = await query('insert into ' + table + ' (name, nameru, descr, timelimit, required, num) values (\'' + arguments[1] + '\',\'' + arguments[2] + '\',\'' + arguments[3] + '\',\'' + arguments[4] + '\',\'' + arguments[5] + '\',\'' + arguments[6] + '\')', []);
        break;
      case 'vforms_cells':
        var res = await query('insert into ' + table + ' (form_id, cell_id, name, nameru, descr, type, text, required, num, grouping, page) values (\'' + arguments[1] + '\',\'' + arguments[2] + '\',\'' + arguments[3] + '\',\'' + arguments[4] + '\',\'' + arguments[5]+ '\',\'' + arguments[6]+ '\',\'' + arguments[7]+ '\',\'' + arguments[8]+ '\',\'' + arguments[9]+ '\',\'' + arguments[10]+ '\',\'' + arguments[11] + '\')', []);
        break;
      default:
        console.log(table)
        var res = null;
        break;
    }
    return res;
}

async function read(table) {
    var res = await query('select * from ' + table, []);
    console.log(res);
    return res;
}

async function readById(table, id) {
    var res = await query('select * from ' + table + ' where id = ' + id, []);
    console.log(res);
    return res;
}

async function update(table, id, ...args) {
  switch (table) {
    case 'types':
      var res = await query('update ' + table + ' set name = \'' + arguments[2] + '\', nameru = \''  + arguments[3] + '\' where id = ' + id, []);
      break;
    case 'cells':
      var res = await query('update ' + table + ' set name = \'' + arguments[2] + '\', nameru = \''  + arguments[3] + '\', descr = ' + arguments[4] + '\', type = ' + arguments[5] + '\', text = ' + arguments[6] + ' where id = ' + id, []);
      break;
    case 'forms':
      var res = await query('update ' + table + ' set name = \'' + arguments[2] + '\', nameru = \''  + arguments[3] + '\', descr = ' + arguments[4] + '\', timelimit = ' + arguments[5] + '\', required = ' + arguments[6] + '\', num = ' + arguments[7] + ' where id = ' + id, []);
      break;
    case 'vforms_cells':
      var res = await query('update ' + table + ' set form_id = \'' + arguments[2] + '\', cell_id = \'' + arguments[3] + '\', name = \'' + arguments[4] + '\', nameru = \''  + arguments[5] + '\', descr = ' + arguments[6] + '\', type = ' + arguments[7] + '\', text = ' + arguments[8] + '\', required = ' + arguments[9] + '\', num = ' + arguments[10] + '\', grouping = ' + arguments[11] + '\', page = ' + arguments[12] + ' where id = ' + id, []);
      break;
    default:
      console.log(table)
      var res = null;
      break;
  }
  return res;
}

async function del(table, id) {
    var res = await query('delete from ' + table + ' where id = ' + id, []);
    console.log(res);
    return res;
}

function List() {};

List.prototype.create = create;
List.prototype.read = read;
List.prototype.readById = readById;
List.prototype.update = update;
List.prototype.del = del;

module.exports.List = List;

// function Field() {};
//
// Field.prototype.create = function (item, callback) {
//     query('insert into field (name, sys_name, type_id, list_id) values ($1, $2, $3, $4)',
//         [item.name, item.sys_name, item.type_id, item.list_id], callback);
// }
//
// Field.prototype.read = function (callback) {
//     query('select * from field', [], function (err, result) {
//         callback(err, result);
//     });
// }
//
// Field.prototype.readById = function (id, callback) {
//     query('select * from field where id = $1', id, callback);
// };
//
// Field.prototype.readByListId = function (list_id, callback) {
//     query('select * from field where list_id = $1', [list_id], callback);
// };
//
// Field.prototype.update = function (id, name, type_id, callback) {
//     query('update field set name = $1, type_id = $2 where id = $3', [name, type_id, id], callback);
// };
//
// Field.prototype.del = function (id, callback) {
//     query('delete from field where id = $1', id, callback);
// };
