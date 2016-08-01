var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates  = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var permalinks  = require('metalsmith-permalinks');
var htmlescape = require('metalsmith-htmlescape');

var plugin = function(files, metalsmith, done) {
    console.log(':))');
    done();
};


metalsmith(__dirname)
	.use(collections({
		posts : {
			pattern : 'blog/*.md',
			sortBy : 'date',
			reverse : true
		}
	}))

	.use(markdown())
	.use(htmlescape())
	.use(permalinks({
		pattern : ':collections/:title'
	}))
	
	.use(templates('handlebars'))
	.destination('./build')
	.use(plugin)
	.build(function (err) { if(err) console.log(err)} );


