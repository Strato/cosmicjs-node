var request = require('request');
var	_ = require('lodash');

module.exports = {

	getObjects : function(config, callback){

		request.get(config.api_url.objects, function (error, response, body) {
	 		
	 		if (!error && response.statusCode == 200) {
	 	 		
	 	 		var data = JSON.parse(body);
	 	 		
	 	 		// Constructor
	 	 		var cosmic = {};
	 	 		var objects = data.objects;
	 	 		cosmic.objects = {};
	 	 		cosmic.objects.all = objects;
	 	 		cosmic.objects.type = _.groupBy(objects, "type_slug");
	 	 		cosmic.object = _.map(objects, keyMetafields);
	 	 		cosmic.object = _.indexBy(cosmic.object, "slug");

				return callback(false, cosmic);
		  
		  } else {
		  	
		  	var err = {
		  		message : 'There was an error with this request.'
		  	}

		  	return callback(err, false);
		  
		  }

		});

	},

	getMedia : function(config, callback){

		request.get(config.api_url.media, function (error, response, body) {
	 	 
	 	 if (!error && response.statusCode == 200) {
	 	 		
	 	 		var data = JSON.parse(body);
	 	 		
	 	 		// Constructor
	 	 		var media = {};
	 	 		var media = data.media;

				return callback(false, media);
		  
		  } else {

		  	var err = {
		  		message : 'There was an error with this request.'
		  	}

		  	return callback(err, false);
		  
		  }

		});
	},

	addObject : function(config, object, callback){
	
		request.post({ 
			url : config.api_url.add_object, 
			form : object 
		}, function (error, response, body) {
	 	 
	 	 	if (!error && response.statusCode == 200) {
	 	 		
	 	 		var object = JSON.parse(body);
	 	 		return callback(false, object);
		  
		  } else {

		  	var err = {
		  		message : 'There was an error with this request.'
		  	}

		  	return callback(err, false);
		  
		  }

		});
	},

	editObject : function(config, object, callback){
	
		request.put({ 
			url : config.api_url.edit_object, 
			form : object 
		}, function (error, response, body) {
	 	 	
	 	 	if (!error && response.statusCode == 200) {
	 	 		
	 	 		var object = JSON.parse(body);
	 	 		return callback(false, object);
		  
		  } else {

		  	var err = {
		  		message : 'There was an error with this request.'
		  	}

		  	return callback(err, false);
		  
		  }

		});
	},

	deleteObject : function(config, object, callback){
	
		request.del({ 
			url : config.api_url.delete_object, 
			form : object 
		}, function (error, response, body) {
	 	 	
	 	 	if (!error && response.statusCode == 200) {
	 	 		
	 	 		var object = JSON.parse(body);
	 	 		return callback(false, object);
		  
		  } else {

		  	var err = {
		  		message : 'There was an error with this request.'
		  	}

		  	return callback(err, false);
		  
		  }

		});
	}

};

// Functions
function keyMetafields(object){
	
	var metafields = object.metafields;
	
	if(metafields){
		object.metafield = _.indexBy(metafields, "key");
	}

	return object;
}