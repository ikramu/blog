var Metalsmith = require('metalsmith');

var collections = require('metalsmith-collections');
var define = require('metalsmith-define');
var markdown   = require('metalsmith-markdown');
var metallic = require('metalsmith-metallic');
var tags = require('metalsmith-tags');
var templates  = require('metalsmith-templates');

var path = require('path');

Metalsmith(__dirname)
	.use(define({
		config: require('./config.json')
	}))
	.use(drafts)
	.use(paths)
	.use(collections({
		pages: {
			pattern: 'pages/**/*.md'
		},
		posts: {
			pattern: 'posts/**/*.md',
			sortBy: 'date',
			reverse: true
		}
	}))
	.use(metallic())
	.use(markdown())
	.use(tags({
		handle: 'tags',
		path: 'tags',
		template: 'tag.jade',
		sortBy: 'date',
		reverse: true
	}))
	.use(templates('jade'))
	.destination('./build')
	.build(function(err){
		if (err) throw err;
		console.log("Builded");
	});


function drafts(files, metalsmith, done) {
	setImmediate(done);
	Object.keys(files).forEach(function (file) {
		var data = files[file];
		if (data.draft) delete files[file];
	});
}

function paths(files, metalsmith, done) {
	setImmediate(done);
	Object.keys(files).forEach(function (file) {
		var data = files[file];
		if (/\.md/.test(path.extname(file))) {
			debugger;
			data.url = "/" + path.dirname(file);
		}
		debugger;
		if (data.draft) delete files[file];
	});
}