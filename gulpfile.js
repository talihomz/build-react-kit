const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const sass        = require('gulp-sass');
const babel       = require('gulp-babel');

// Static Server + watching scss/html files
gulp.task('serve', () => {

  browserSync.init({
      server: "public"
  });

  gulp.watch("src/js/*.js", ['js']);
  gulp.watch("src/index.html", ['html']);
  gulp.watch("src/pages/*.html", ['html-pages']);
  gulp.watch("src/scss/**/*.scss", ['sass']);
  gulp.watch("public/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () =>
  gulp.src("src/scss/main.scss")
    .pipe(sass())
    .on('error', function(error) {
      console.log(error);
      this.emit('end');
    })
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream())
);

// Compress images
gulp.task('images', () => {
  gulp.src('src/images/*')
    .pipe(gulp.dest('public/images'))
});

// Build home page
gulp.task('html', () => {
  gulp.src('src/index.html')
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
});

// Build other pages
gulp.task('html-pages', () => {
  gulp.src('src/pages/*.html')
    .pipe(gulp.dest('public/pages'))
    .pipe(browserSync.stream())
});

// Compile Javascript
gulp.task('js', () => {
  gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['env'],
      plugins: ["transform-es2015-modules-commonjs"]
     }))
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
              ['html', 'html-pages', 'js', 'docs'],
              callback)
);

// Default task
gulp.task('default', (callback) =>
  runSequence('build', 'serve', callback)
);
