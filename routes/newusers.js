var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch')

/* GET users listing. */

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace' } )

//handle the delete
router.get('/', function(req, res) {
if( req.param('id') !== '') {
client.delete( {
	index : 'surveys2',
	type : 'v1',
	id : req.param('id')
},
function(error,response) {
	res.redirect('/')
})
}
});


module.exports = router;
