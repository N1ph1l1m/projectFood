const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const clean_css = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const newer = require("gulp-newer");
const del = require("del");


//Пути к файлам
const paths = {
  html: {
    src: "src/*.html",
    dest: "dist",
  },
  otherHTMLfiles: {
    src: "src/html/**/*.html",
    dest: "dist/html/",
  },
  stylesNull: {
    src: "src/styles/**/styleNull.scss",
    dest: "dist/css/",
  },
  stylesMain: {
    src: "src/styles/**/style.scss",
    dest: "dist/css/",
  },
  styles: {
    src: "src/styles/**/*.scss",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/",
  },
  images:{
    src: "src/img/*",
    dest: "dist/img",
  },
};

function clean(){
  return del(['dist/*','!dist/img'])
}
//Сжате html файла
function html(){
  return gulp.src(paths.html.src)
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest(paths.html.dest))
}

function otherHTMLfiles(){
  return gulp.src(paths.otherHTMLfiles.src)
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest(paths.otherHTMLfiles.dest))
}
//Перевод scss файла в css  и переименование его с дополнительным суфиксом .min
function stylesNull() 
{
  return gulp
    .src(paths.stylesNull.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(clean_css({
      level:2
    }))
    .pipe(
      rename({
        basename: "StyleNull",
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(size({showFiles:true}))
    .pipe(gulp.dest(paths.stylesNull.dest));
}
function stylesMain() 
{
  return gulp
    .src(paths.stylesMain.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(clean_css({
      level:2
    }))
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(size({showFiles:true,}))
    .pipe(gulp.dest(paths.styles.dest));
}
function styles() 
{
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(clean_css({
      level:2
    }))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(size({showFiles:true,}))
    .pipe(gulp.dest(paths.styles.dest));
}
//Работа с js файлами
function scripts() {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true,
    })
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    // .pipe(concat("main.min.js"))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(size({showFiles:true}))
    .pipe(gulp.dest(paths.scripts.dest));
}
//Сжате изображений
function img() {
  return (
    gulp
      .src(paths.images.src)
      .pipe(newer(paths.images.dest))
      .pipe(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      )
      .pipe(size({showFiles:true}))
      .pipe(gulp.dest(paths.images.dest))
  );
}
//Отслеживание функции function styles()
function watch() {
  gulp.watch(paths.html.src);
  gulp.watch(paths.otherHTMLfiles.src,otherHTMLfiles);
  gulp.watch(paths.stylesNull.src, stylesNull);
  gulp.watch(paths.stylesMain.src, stylesMain);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, img);
}
//Запуск gulp по умолчанию 
const build = gulp.series(clean,html,otherHTMLfiles,gulp.parallel(otherHTMLfiles,stylesNull,styles,stylesMain, scripts,img ),watch);

//Вызов функции
exports.clean = clean; 
exports.html = html; 
exports.otherHTMLfiles = otherHTMLfiles; 
exports.stylesNull = stylesNull;
exports.stylesMain = stylesMain;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.img = img; 
exports.default = build;
exports.build = build;
