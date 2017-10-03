const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');

const javascriptFiles = [
	'./app.js',
	'./rosters/players.js',
	'./rosters/teams.js',
	'./stats/hittingStats.js',
	'./stats/pitchingStats.js',
	'./stats/positions.js',
	'./user/auth.js'
];

gulp.task('bundle', function() {
	return gulp.src(javascriptFiles)
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js')) // squash files together into bundle.js
		.pipe(uglify())
		.pipe(sourcemaps.write('./maps/'))
		.pipe(gulp.dest('./dist'));// save into /dist folder
});

gulp.task('default', ['bundle']);