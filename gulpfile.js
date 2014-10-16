var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();

var _ = require('lodash');
var archy = require('archy'); // render nested hierarchies `npm ls` style with unicode pipes
var browserSync = require('browser-sync');
var chalk = require('chalk'); // Terminal string styling done right. Created because the `colors` module does some really horrible things.
var connect = require('connect');
var del = require('del');
var fs = require('fs');
var http = require('http');
var jade = require('jade');
var path = require('path');
var Q = require('q');
var through = require('through2');
var Vinyl = require('vinyl');

var site = require('./site.json');



/**
 * Render the template, injecting the file into `page.file`.
 *
 * Switch templates by settings `meta.template` on the file.
 *
 * Template variables:
 *
 * - page: Vinyl object <File ..>
 * - page.meta: Front-matter properties
 * - page.tree: Site tree
 * - page.subtree: Subtree rooted at this file
 * - page.contents: Main content of the current page
 *
 * The nodes in the tree's (Treenode) have the following properties:
 *
 * - node.leaf: value at current node (Vinyl object) (may be undefined)
 * - node.parent: parent node (Treenode) (undefined for root)
 * - node.label: string label (~ path.basename(file.path))
 * - node.nodes: (empty) array of Treenodes that are children of this node
 *
 * There are also some methods on Treenodes.
 *
 * - node.is_leaf(): true if no children
 * - node.is_singleton(): true if has only one child
 * - node.is_last_child(): true if it is the last child of the parent
 *
 */

function render_tmpl() {

	var cache = {};

	var compile_template = function (filename) {
		return Q
			.fcall(function () {

				if (cache[filename]) return cache[filename];

				plugins.util.log('loading template: ' + filename);
				return Q
					.nfcall(fs.readFile, filename)
					.then(function (tmpl_content) {
						// turn template in promise returning function and cache it
						var compiled = jade.compile(tmpl_content, {pretty: true, filename: filename});
						plugins.util.log('compiled template: ' + chalk.yellow(filename));
						return (cache[filename] = compiled);
					});
			})
			.fail(function (err) {
				plugins.util.log('failed compiling jade template', chalk.red(err));
			});
	};

	return plugins.map(function (file) {
		var template = (file.meta && file.meta.template) || 'post';

		// pull from cache, compile if needed
		return compile_template('templates/' + template + '.jade')
			.then(function (compiled_template) {
				plugins.util.log('rendering [' + chalk.yellow(template) + '] "' +
				chalk.magenta(path.basename(file.path)) + '"');

				try {
					// render it with template variable 'page'
					var html = compiled_template({page: file});
				} catch (err) {
					console.log('[' + chalk.red('ERR') +
					'] Failed rendering jade template\n\t' +
					chalk.red(err.message));
				}

				return new Vinyl({
					cwd: file.cwd,
					base: file.base,
					path: file.path.replace(/\.md$/, '.html'),
					contents: new Buffer(html)
				});
			})
			.fail(function (err) {
				plugins.util.log('Failed rendering jade template', chalk.red(err));
			});
	});
}

//var extended_attributes = function (file) {
//	file.path = file.path && file.path.replace(/\.md$/, '.html');
//	file.basename = path.basename(file.path);
//	file.shortName = file.basename && file.basename.replace(/\.html$/, '');
//	file.href = file.relative;
//	return file;
//};

var show_tree_once = function () {
	var once = false;
	return plugins.map(function (file) {
		if (!once && file.tree) {
			plugins.util.log('File tree\n' + archy(file.tree));
			once = true;
		}
		return file;
	});
};


gulp.task('posts', function () {
	return gulp.src('src/posts/**/*.md')
		.pipe(plugins.frontMatter({property: 'meta', remove: true}))
		.pipe(plugins.map(function(file) {
			if (file.meta && file.meta.draft) return;
			return file
		}))
		.pipe(plugins.marked())
		.pipe(plugins.filetree())
		.pipe(show_tree_once())
		.pipe(render_tmpl())
		.pipe(plugins.size())
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
	del(['dist/'], cb)
});

gulp.task('default', ['clean'], function() {
	gulp.start('posts');
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./dist"
		}
	});
});

gulp.task('browser-sync-reload', function () {
	browserSync.reload();
});

gulp.task('watch', ['default'], function () {
	gulp.watch(['posts/**/*.md'], ['posts']);
	gulp.watch(['templates/**/*'], ['browser-sync-reload']);
	gulp.start('browser-sync');
	var app = connect()
		.use(connect.static('build'))
		.use(connect.directory('build'));
	http.createServer(app).listen(3000);
});