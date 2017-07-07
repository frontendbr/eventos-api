const gulp = require('gulp'),
		karma = require('gulp-karma');

gulp.task('default', function (){
	gulp.src(['src/js/**/*.js'])
	.pipe(karma({
		configFile: 'karma.conf.js',
		action: 'watch'
	}));
})