var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    filter       = require('gulp-filter'),
    autoprefixer = require('gulp-autoprefixer'),
    jade         = require('gulp-jade'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    changed      = require('gulp-changed'),
    svgmin       = require('gulp-svgmin'),
    svgSprite    = require('gulp-svg-sprites'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

//webserver
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
            // index: 'index.html'
        },
        files: ["css/*.css", "*.html", "js/**/*.js"],
        port: 8080,
        open: false,
        notify: false,
        ghostMode: false,
        online: false,
        // tunnel: 'my-site',
        open: true
    });
});

//jade
gulp.task('jade', function() {
    return gulp.src(['jade/*.jade', '!jade/_*.jade'])
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(changed('./', {extension: '.html'}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./'));
});

//compile all jade files
gulp.task('jade-all', function() {
    return gulp.src(['jade/*.jade', '!jade/_*.jade'])
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./'));
});

//sass
// gulp.task('sass', function() {
//     return gulp.src('sass/**/*.sass')
//         .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
//         .pipe(sourcemaps.init())
//             .pipe(sass({
//                 "sourcemap=file" : true,

//                 style : 'compact'
//             }))
            // .pipe(filter('*.css'))
            // .pipe(autoprefixer({
            //     browsers: ['last 4 versions'],
            //     cascade: false
            // }))
            // .pipe(filter('*.css').restore())
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('css'));
// });

//sass
gulp.task('sass', function() {
    return sass('sass', {
        sourcemap: true,
        style: 'compact'
    })
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('./', {
        includeContent: false,
        sourceRoot: '../sass'
    }))
    .pipe(gulp.dest('css'));
});

//svg sprite
gulp.task('svgsprite', function() {
    return gulp.src('img/svg/icons/*.svg')
        .pipe(svgmin({
            plugins: [{
                removeDesc: true
            }, {
                removeTitle: true
            }
        ]}))
        .pipe(svgSprite({
            mode: "symbols",
            selector: "icon-%f",
            preview: false,
            svg: {
                symbols: 'icons.svg'
            }
            // templates: {
            //     css: require('fs').readFileSync('sass/lib/sprite-template.scss', "utf-8")
            // },
            // cssFile: '../sass/_svg-sprite.sass',
            // svgPath: '../img/sprites/%f',
            // pngPath: '../img/sprites/%f',
            // padding: 10
        }))
        .pipe(gulp.dest('img'));
});

// watch
gulp.task('watch', function() {
    gulp.watch('sass/**/*', ['sass']);
    gulp.watch('jade/**/*.jade', ['jade']);
    gulp.watch('jade/_*.jade', ['jade-all']);
    gulp.watch('img/svg/icons/*.svg', ['svgsprite']);
});

gulp.task('build', ['sass', 'svgsprite', 'jade'], function() {});

gulp.task('default', ['build', 'browser-sync', 'watch'], function() {});