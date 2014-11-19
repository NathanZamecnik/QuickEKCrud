var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch')

router.get('/', function(req, res) {
  res.render('index', { title: 'Education Survey Management' });
});

router.post('/newusers', function(req, res) {
	//console.log(req.body)
	var survey = {};

	survey.location = makeLocation(req.body);
	survey.user = makeUser(req.body);
	survey.roles = makeRoles(req.body);
	survey.topics = makeTopics(req.body);
	survey.cluster = makeCluster(req.body);
	survey.resources = makeResources(req.body);
	survey.plans = makePlans(req.body);	
	survey.stage = makeStage(req.body);
	survey.certification = makeCertification(req.body);
	survey.security = makeSecurity(req.body);
	survey.support = makeSupport(req.body);
	survey.comments = makeComments(req.body);
	console.log(survey);

	client.create( {
		index : 'surveys',
		type : 'v1',
		body : survey
	}, function(error, response) { 
		if(error) res.send("There was an error and the data was not saved: " +error)
		res.render('newusers', { title: 'Added New User', bod : req.body, es : response });

	}); 
});

function makeSupport(b) {
	if(b.supportyes ==='on') return true; else return false;
}

function makeComments(b) {
	return b.comments;
}

function makeLocation(b) {
	var loc = {};
	loc.instructor = [];

	if(b.location != null) { loc.location = b.location.toLowerCase(); }
	if(b.dates != null) { loc.date = b.dates.toLowerCase(); }
	if(b.instructor1 !== "") {loc.instructor.push(b.instructor1.toLowerCase())}
	if(b.instructor2 !== "") {loc.instructor.push(b.instructor2.toLowerCase())}

	return loc;
}

function makeUser(b) {
	var user = {}

	if(b.name != null) { user.name = b.name.toLowerCase(); }
	if(b.company != null) { user.company = b.company.toLowerCase(); }
	if(b.email != null) { user.email = b.email.toLowerCase(); }
	if(b.phone != null) { user.phone = b.phone.toLowerCase(); }
	
	return user;
}

function makeRoles(b) {
	var roles = [];
	if(b.roledev ==='on') roles.push('developer');
	if(b.roledba === 'on') roles.push('dba');
	if(b.rolearchitect === 'on') roles.push('architect');
	if(b.roleops === 'on') roles.push('devops');
	if(b.rolemanagement === 'on') roles.push('management');
	if(b.roleother === 'on') roles.push(b.roleothertext.toLowerCase());
	return roles;
}

function makeTopics(b) {
	var goals = []
	
	if(b.goaldeploy === 'on') goals.push('deploying');
	if(b.goalcluster === 'on') goals.push('cluster management');
	if(b.goalsearch === 'on') goals.push('search');
	if(b.goalanalysis ==='on') goals.push('analysis');
	if(b.goalaggregations === 'on') goals.push('aggregations');
	if(b.goalmappings ==='on') goals.push('mappings');
	if(b.goallucene === 'on') goals.push('lucene');
	if(b.goalbackup === 'on') goals.push('backups');
	if(b.goalclients === 'on') goals.push('clients');
	if(b.goalindexes === 'on') goals.push('index maintenance');
	if(b.goalrelevancy === 'on') goals.push('relevancy');
	if(b.goalpercolation === 'on') goals.push('percolation');
	if(b.goalgeo === 'on') goals.push('geolocation');
	if(b.goalhadoop === 'on') goals.push('hadoop');
	if(b.goalmonitoring === 'on') goals.push('monitoring');
	if(b.goalrelations === 'on') goals.push('relations');
	
	return goals;
}

function makeCluster(b) {
	var cluster = [];

	if(b.sizeless3 === 'on') cluster.push('less than 3');
	if(b.size4to8 === 'on') cluster.push('4 to 8');
	if(b.size8to23 === 'on') cluster.push('9 to 23');
	if(b.sizemore23 === 'on') cluster.push('more than 23');

	return cluster;
}

function makeResources(b) {
	var resources = [];

	if(b.resofficial === 'on') resources.push('official docs');
	if(b.reswebinars === 'on') resources.push('webinars');
	if(b.resblogs === 'on') resources.push('blogs');
	if(b.resstack ==='on') resources.push('stack overflow');
	if(b.resdefguide ==='on') resources.push('definitive guide');
	if(b.resmeetups === 'on') resources.push('meetups');
	if(b.resyoutube === 'on') resources.push('youtube');
	if(b.resother === 'on') resources.push(b.resothertext.toLowerCase());

	return resources;
}


function makePlans(b) {
	var plans = [];

	if(b.usesearch === 'on') plans.push('full text search');
	if(b.uselogging === 'on') plans.push('log analysis');
	if(b.useanalytics === 'on') plans.push('analytics');
	if(b.usedatastore === 'on') plans.push('primary datastore');
	if(b.usealerting === 'on') plans.push('alerting notifications');
	if(b.usegeo === 'on') plans.push('geolocation');
	if(b.useddp === 'on') plans.push('distributed data processing');
	if(b.useother === 'on') plans.push(b.useothertext.toLowerCase());

	return plans
}

function makeStage(b) {
	var stages = [];

	if(b.stageprod === 'on') stages.push('production');
	if(b.stagedev === 'on') stages.push('development');
	if(b.stageeval === 'on') stages.push('evaluation');
	if(b.stagenot === 'on') stages.push('not using');

	return stages
}

function makeCertification(b) {
	if(b.certyes === 'on') return true; else return false;
}

function makeSecurity(b) {
	if(b.authyes ==='on') return true; else return false;
}


var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace' } )

module.exports = router;
