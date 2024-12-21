const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      del = require('del'),
      browserSync = require('browser-sync').create(),
      sourcemaps = require('gulp-sourcemaps'),
      gulpif = require('gulp-if'),
      gcmq = require('gulp-group-css-media-queries'),
      imagemin = require('gulp-imagemin'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      jade = require('gulp-jade'),
      less = require('gulp-less'),
      smartgrid = require('smart-grid');

const isDev = process.argv.indexOf('--dev') !== -1,
      isProd = !isDev,
      isSync = process.argv.indexOf('--sync') !== -1;

const base = './app/',
      src = './app/assets/',
      prod = './site/',
      dist = './site/assets/';

let gridOptions = {
   columns: 24,
   offset: "50px", // fields не меньше offset делённого на 2
   // mobileFirst: true,
   container: {
      maxWidth: "1200px",
      fields: "40px"
   },
   breakPoints: {
      xl: {
         width: "1200px"
      },
      lg: {
         width: "995px",
      },
      md: {
         width: "770px",
         fields: "30px",
         offset: "46px"
      },
      sm: {
         width: "580px",
         fields: "20px",
         offset: "36px"
      },
      xs: {
         width: "415px",
         offset: "20px"
      }
   }
};

let gridNoCalcOptions = {
   columns: 24,
   offset: "3%",
   // mobileFirst: true,
   container: {
      maxWidth: "1200px",
      fields: "7%" // fields не меньше offset делённого на 2
   },
   breakPoints: {
      xl: {
         width: "1200px"
      },
      lg: {
         width: "995px",
         fields: "5%"
      },
      md: {
         width: "770px"
      },
      sm: {
         width: "580px",
         offset: "2%"
      },
      xs: {
         width: "415px",
         fields: "3%"
      },
      xxs: {
         width: "360px",
         offset: "1.5%"
      }
   }
};

function html(done){
   return gulp.src( base + '*.jade' )
   .pipe(jade())
   .pipe(gulp.dest( prod ))
   .pipe(gulpif(isSync, browserSync.stream()));
   done();
}
function html2(done){
   return gulp.src( base + 'sections/*.jade' )
   .pipe(jade())
   .pipe(gulp.dest( prod + 'sections/' ))
   .pipe(gulpif(isSync, browserSync.stream()));
   done();
}

function styles(){
   return gulp.src( [ src + 'css/style.less' ])
   .pipe(gulpif(isDev, sourcemaps.init()))
   .pipe(less())
   .pipe(gcmq())
   .pipe(autoprefixer())
   .pipe(gulpif(isProd, cleanCSS({
      level: 2
   })))
   .pipe(gulpif(isDev, sourcemaps.write()))
   .pipe(gulp.dest( dist + 'css'))
   .pipe(gulpif(isSync, browserSync.stream()))
}
function ie7(done) {
   return gulp.src( src + 'css/fontello-ie7.css' )
   .pipe(gulp.dest( dist + 'css/' ));
   done();
}

function images(done){
   return gulp.src( src + 'img/**/*')
   .pipe(gulpif(isProd, imagemin()))
   .pipe(gulp.dest( dist + 'img'));
   done();
}
function data(done){
   return gulp.src([src + 'data/*', src + 'data/**/*'])
   .pipe(gulpif(isProd, imagemin()))
   .pipe(gulp.dest( dist + 'data'));
   done();
}


function js(done){
   return gulp.src( src + 'js/**/*')
   .pipe(concat( 'build.js' ))
   // .pipe(uglify())
   .pipe(gulp.dest( dist + 'js'));
   done();
}

function clear(){
   return del( prod + '*');
}

function copyFonts(done) {
   return gulp.src( src + 'fonts/**/*' )
   .pipe(gulp.dest( dist + 'fonts/' ));
   done();
}
function copyJS(done) {
   return gulp.src( src + 'js/jquery.js' )
   .pipe(gulp.dest( dist + 'js/' ));
   done();
}

function watch(done){
   if(isSync){
      browserSync.init({
         server: {
            baseDir: './site/'
         }
      });
   }
   
   gulp.watch( src + 'css/**/*.less', styles);
   gulp.watch( base + '*.jade', html);
   gulp.watch( base + 'sections/*.jade', html2);
   gulp.watch( src + 'jade/**/*.jade', html);
   gulp.watch( src + 'jade/**/*.jade', html2);
   gulp.watch( src + 'js/**/*', js);
   gulp.watch( src + 'img/**/*', images);
   gulp.watch( src + 'data/*', data);
   gulp.watch( src + 'data/**/*', data);
   done();
}

function grid(done){
   smartgrid( src + 'css/base', gridOptions);
   done();
}

function gridNoCalc(done){
   smartgrid( src + 'css/base', gridNoCalcOptions);
   done();
}
const build = gulp.series(clear,
   gulp.parallel(html, html2, copyJS, styles, js, images, data, copyFonts)
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('grid', gulp.parallel(grid, gridNoCalc));
gulp.task('grid', gulp.parallel(gridNoCalc));
gulp.task('copyFonts', copyFonts);
gulp.task('copyJS', copyJS);
gulp.task('data', data);
gulp.task('js', js);
gulp.task('ie', ie7);
