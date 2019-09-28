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
  var res = await (async () => {
    var pool = new Pool(configCon);
    var client = await pool.connect()
    try {
      var result = await client.query(sql, [params])
      // console.log('hello from', JSON.stringify(result))
    } finally {
      client.release()
      await pool.end()
      return JSON.stringify(result.rows)
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


function create(item, callback) {
    query('insert into list (name, sys_name) values ($1, $2)', [item.name, item.sys_name], callback);
}

function read(callback) {
    query('select * from list', [], function (err, result) {
        callback(err, result);
    });
}

async function readById(id) {
    var res = await query('select * from list where id = $1', id);
    // console.log(res);
    return res;
}

function update(id, text, callback) {
    query('update list set name = $1 where id = $2', [text, id], callback);
}

function del(id, callback) {
    query('delete from list where id = $1', id, callback);
}

function List() {};

List.prototype.create = create;
List.prototype.read = read;
List.prototype.readById = readById;
List.prototype.update = update;
List.prototype.del = del;

module.exports.List = List;

function Field() {};

Field.prototype.create = function (item, callback) {
    query('insert into field (name, sys_name, type_id, list_id) values ($1, $2, $3, $4)',
        [item.name, item.sys_name, item.type_id, item.list_id], callback);
}

Field.prototype.read = function (callback) {
    query('select * from field', [], function (err, result) {
        callback(err, result);
    });
}

Field.prototype.readById = function (id, callback) {
    query('select * from field where id = $1', id, callback);
};

Field.prototype.readByListId = function (list_id, callback) {
    query('select * from field where list_id = $1', [list_id], callback);
};

Field.prototype.update = function (id, name, type_id, callback) {
    query('update field set name = $1, type_id = $2 where id = $3', [name, type_id, id], callback);
};

Field.prototype.del = function (id, callback) {
    query('delete from field where id = $1', id, callback);
};
