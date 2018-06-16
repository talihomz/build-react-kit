const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', () => {

  browserSync.init({
      server: "public"
  });

  gulp.watch("src/js/*.js", ['js']);
  gulp.watch("src/index.html", ['html']);
  gulp.watch("src/scss/**/*.scss", ['sass']);
  gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () =>
  gulp.src("src/scss/main.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream())
);

// Compress images
gulp.task('images', () => {
  gulp.src('src/images/*')
    .pipe(gulp.dest('public/images'))
});

// Browser Sync
gulp.task('html', () => {
  gulp.src('src/index.html')
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
});

// Compile Javascript
gulp.task('js', () => {
  gulp.src('src/js/*.js')
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream())
});

// Copy Docs
gulp.task('docs', () => {
  gulp.src('src/docs/*')
    .pipe(gulp.dest('public/docs'))
});

// Build task
gulp.task('build', (callback) =>
  runSequence('sass',
              'images',
              ['html', 'js', 'docs'],
              callback)
);

// Default task
gulp.task('default', (callback) =>
  runSequence('build', 'serve',
              callback)
);
