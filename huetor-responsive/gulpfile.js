var gulp = require('gulp')
var postcss = require('gulp-postcss')
var rucksack = require('rucksack-css')
var autoprefixer = require('autoprefixer')
var cssnested = require('postcss-nested')
var lost = require('lost')
var csswring = require('csswring')
var mqpacker = require('css-mqpacker')
var browserSync = require('browser-sync').create()

// Servidor de desarrollo
gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
})

// Tarea para procesar el CSS
gulp.task('css', function(){
  var processor = [
    autoprefixer({browsers: ['last 5 versions']}),
    lost(),
    cssnested(),
    rucksack(),
    mqpacker(),
    // csswring()
  ]
  return gulp.src('./src/*.css')
    // .pipe(rucksack())
    .pipe(postcss(processor))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

// Tarea para vigilar los cambos
gulp.task('watch', function(){
  gulp.watch('./src/*.css', ['css'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['watch', 'serve', 'css'])
