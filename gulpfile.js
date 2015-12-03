var gulp = require('gulp');

gulp.task('js', function() {
  var react = require('gulp-react');
  return gulp.src(['app/js/**/*.js'], {base: 'app'})
    .pipe(react())
    .pipe(gulp.dest('build'));
});

gulp.task('css', function() {
  return gulp.src('app/css/**/*.css', {base: 'app'})
    .pipe(gulp.dest('build'));
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**', {base: 'app'})
    .pipe(gulp.dest('build'));
});

gulp.task('clean_build', function() {
  var del = require('del');
  return del.sync(['build']);
});

gulp.task('clean_cache', function() {
  var del = require('del');
  return del.sync(['cache']);
});

gulp.task('clean', ['clean_build', 'clean_cache']);

// Builds + runs nwjs app - For dev
gulp.task('run', function() {
  var NwBuilder = require('node-webkit-builder');
  var version = '0.12.2';
  var nw = new NwBuilder({
    files: './build/**/**',
    version: version,
    platforms: ['osx64'],
  });
  nw.on('log', console.log);
  // Same as NwBuilder.run() with added function to move ffmpegsumo to cache
  nw.checkFiles().bind(nw)
    .then(nw.resolveLatestVersion)
    .then(nw.checkVersion)
    .then(nw.platformFilesForVersion)
    .then(nw.downloadNodeWebkit)
    .then(function() {
      gulp.src('./libs/osx/ffmpegsumo.so')
        .pipe(gulp.dest('./cache/' + version + '/osx64/nwjs.app/Contents/Frameworks/nwjs Framework.framework/Libraries'));
      }
    )
    .then(nw.runApp)
    .catch(function(error) {
      console.log(error);
    });
});

gulp.task('build', ['js', 'css', 'fonts'], function() {
  return gulp.src(['app/index.html', 'package.json'])
    .pipe(gulp.dest('build'));
});

gulp.task('dev', ['build'], function() {
  gulp.watch(['app/**'], {debounceDelay: 2000}, ['build']);
});
