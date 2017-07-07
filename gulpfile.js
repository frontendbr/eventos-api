const gulp = require('gulp'),
	  karma = require('gulp-karma'),
      Server = require('karma').Server;

gulp.task('default', function (){
	gulp.src(['src/js/**/*.js'])
	.pipe(karma({
		configFile: 'karma.conf.js',
		action: 'watch'
	}));
})


gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});