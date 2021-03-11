const Datastore = require('nedb');
let db= new Datastore({filename:'./data/database.db',autoload:true});
module.exports = db;