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
      var res = result && result.rows ? result.rows : (result || 'no response')
      return JSON.stringify(res)
    }
  })().catch(e => console.error(e.message, e.stack))
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


async function create(table, ...args) {
    switch (table) {
      case 'types':
        // console.log('insert into ' + table + ' (name, nameru) values (' + [arguments[1], arguments[2]] + ')')
        var res = await query('insert into ' + table + ' (name, nameru) values (\'' + arguments[1] + '\',\'' + arguments[2] + '\')', []);
        break;

      case 'cells':
        var res = await query('insert into ' + table + ' (name, nameru, descr, type, text) values (\'' + arguments[1] + '\',\'' + arguments[2] + '\',\'' + arguments[3] + '\',\'' + arguments[4] + '\',\'' + arguments[5] + '\')', []);
        break;

      case 'forms':
        var res = await query('insert into ' + table + ' (name, nameru, descr, timelimit, required, num) values (\'' + arguments[1] + '\',\'' + arguments[2] + '\',\'' + arguments[3] + '\',\'' + arguments[4] + '\',\'' + arguments[5] + '\',\'' + arguments[6] + '\')', []);
        break;

      default:
        console.log(table)
        var res = null;
        break;
    }

    // var res = query('insert into ' + table + ' (name, sys_name) values ($1, $2)', [item.name, item.sys_name]);
    // console.log(res);
    return res;
}

async function read(table) {
    var res = await query('select * from ' + table, []);
      // , function (err, result) {
        // callback(err, result);
    // });
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
