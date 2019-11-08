//var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

//elixir(function(mix) {
//    mix.sass('app.scss');
//});
var templateCache = require('gulp-angular-templatecache');
var gulp = require('gulp');
//var uglify = require('gulp-uglify');
//var htmlmin = require('gulp-htmlmin');
var htmlmin = require('gulp-html-minifier');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var del = require('del');
var vendor_file, app_file;
var MODULE = process.argv[3];
gulp.task('clean', function() {
    del('app-dist/*.js');
});

gulp.task('module-clean', function() {
    del(MODULE + '/app-dist/*.js');
});

gulp.task('templates-dist', function () {
    return gulp.src('app/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('templates-dist/'));
});
gulp.task('templates', function () {
    return gulp.src('app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true, keepClosingSlash: true}))
        .pipe(templateCache({
            standalone: true,
            transformUrl: function(url) {
                return 'app/' + url;
            }
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('module-templates', function () {
    return gulp.src(MODULE + '/app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true, keepClosingSlash: true}))
        .pipe(templateCache({
            standalone: true,
            transformUrl: function(url) {
                return 'app/' + url;
            }
        }))
        .pipe(gulp.dest(MODULE + '/app'));
});

gulp.task('build-vendor', function() {
    var d = new Date();
    var file = d.getTime() + '.vendor.js';
    vendor_file = file;
    gulp.src([
        // 'socket.io.min.js',
        // Theme vendor
        'components/AdminLTE/plugins/jQuery/jquery-2.2.3.min.js',
        'components/AdminLTE/bootstrap/js/bootstrap.min.js',
        'components/moment/min/moment.min.js',
        'components/AdminLTE/plugins/daterangepicker/daterangepicker.js',
        'components/AdminLTE/plugins/datepicker/bootstrap-datepicker.js',
        'components/AdminLTE/plugins/select2/select2.full.min.js',
        'components/AdminLTE/plugins/slimScroll/jquery.slimscroll.min.js',
        'components/AdminLTE/plugins/chartjs/Chart.min.js',
        'components/AdminLTE/plugins/fastclick/fastclick.js',
        'components/AdminLTE/plugins/iCheck/icheck.min.js',
        'components/remarkable-bootstrap-notify/bootstrap-notify.min.js',
        'components/summernote/dist/summernote.min.js',
        'components/AdminLTE/dist/js/app.min.js',
        'components/typeahead.js/dist/typeahead.bundle.min.js',
        'components/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js',
        'components/select2/select2.min.js',
        'components/chart.js/dist/Chart.min.js',
        'components/tinymce-dist/tinymce.js',
        // Angular Vendor
        'components/angular/angular.min.js',
        'components/angular-cookies/angular-cookies.js',
        'components/angular-socket-io/socket.min.js',
        'components/ngstorage/ngStorage.min.js',
        'components/angular-ui-router/release/angular-ui-router.min.js',
        'components/angular-ui-router/release/stateEvents.min.js',
        'components/angular-summernote/dist/angular-summernote.min.js',
        'components/angular-readable-time/angular-readable-time.min.js',
        'components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
        'components/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js',
        'components/angular-date-time-input/src/dateTimeInput.js'

        // 'components/angular-ui-select2/src/select2.js',
        // 'components/select2/select2.min.js'
    ])
        //.pipe(concat('vendor.js'))
        .pipe(concat(file))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('app-dist/'));
});

gulp.task('module-build-vendor', function() {
    var d = new Date();
    var file = d.getTime() + '.vendor.js';
    vendor_file = file;
    var SRC_LIST_VENDOR_MODULE = {
        reports: [
            // Theme vendor
            'components/AdminLTE/plugins/jQuery/jquery-2.2.3.min.js',
            'components/AdminLTE/bootstrap/js/bootstrap.min.js',
            'components/moment/min/moment.min.js',
            'components/AdminLTE/plugins/chartjs/Chart.min.js',
            // Angular Vendor
            'components/angular/angular.min.js',
            'components/ngstorage/ngStorage.min.js',
            'components/angular-ui-router/release/angular-ui-router.min.js',
            'components/angular-ui-router/release/stateEvents.min.js'
        ],
        "customer-services": [
            // Theme vendor
            'components/AdminLTE/plugins/jQuery/jquery-2.2.3.min.js',
            'components/AdminLTE/bootstrap/js/bootstrap.min.js',
            'components/moment/min/moment.min.js',
            'components/remarkable-bootstrap-notify/bootstrap-notify.min.js',
            'components/AdminLTE/plugins/chartjs/Chart.min.js',
            // Angular Vendor
            'components/angular/angular.min.js',
            'components/ngstorage/ngStorage.min.js',
            'components/angular-ui-router/release/angular-ui-router.min.js',
            'components/angular-ui-router/release/stateEvents.min.js'
        ],
        'checkout': [
            // Theme vendor
            'components/AdminLTE/plugins/jQuery/jquery-2.2.3.min.js',
            'components/AdminLTE/bootstrap/js/bootstrap.min.js',
            'components/moment/min/moment.min.js',
            'components/select2/select2.min.js',
            'components/remarkable-bootstrap-notify/bootstrap-notify.min.js',
            // Angular Vendor
            'components/angular/angular.min.js',
            'components/ngstorage/ngStorage.min.js',
            'components/angular-ui-router/release/angular-ui-router.min.js',
            'components/angular-ui-router/release/stateEvents.min.js'
        ]
    }

    gulp.src(SRC_LIST_VENDOR_MODULE[MODULE])
        .pipe(concat(file))
        // .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(MODULE + '/app-dist/'));
});

gulp.task('build', function () {
    var d = new Date();
    var file = d.getTime() + '.app.js';
    app_file = file;
    gulp.src('app/**/*.js')
        .pipe(concat(file))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('app-dist/'));
});

gulp.task('build-app', function() {
    var d = new Date();
    var file = d.getTime() + '.app.js';
    app_file = file;
    gulp.src('app/**/*.js')
        .pipe(concat(file))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('app-dist/'));
});

gulp.task('module-build-app', function() {
    var d = new Date();
    var file = d.getTime() + '.app.js';
    app_file = file;
    gulp.src(MODULE + '/app/**/*.js')
        .pipe(concat(file))
        // .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(MODULE + '/app-dist/'));
});

gulp.task('replace-js', function () {
    return gulp.src(['index.html'])
        .pipe(replace(/\d+\.vendor\.js/, vendor_file))
        .pipe(replace(/\d+\.app\.js/, app_file))
        .pipe(gulp.dest('./'));
});

gulp.task('module-replace-js', function () {
    return gulp.src([MODULE + '/index.html'])
        .pipe(replace(/\d+\.vendor\.js/, vendor_file))
        .pipe(replace(/\d+\.app\.js/, app_file))
        .pipe(gulp.dest(MODULE + '/'));
});

//gulp templates unknow && gulp default unknow && cd ../ && git checkout WebApp/app/templates.js
gulp.task('default', ['clean', 'build-vendor', 'build-app', 'replace-js']);

//gulp module-templates reports && gulp module reports
//gulp module-templates customer-services && gulp module customer-services

gulp.task('module', ['module-clean','module-build-vendor', 'module-build-app', 'module-replace-js']);

gulp.task(MODULE, []);