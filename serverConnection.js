const sql = require('mysql');
var sqlConnection = sql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'root123',
	database : 'nodeserver'
});
module.exports = sqlConnection;