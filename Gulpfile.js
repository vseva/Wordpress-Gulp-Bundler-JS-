(function() {

    var path = require('path'),
        gulp = require('gulp'),
        scss = require('gulp-sass'),
        bundle = require('gulp-bundle-assets'),
        rimraf = require('gulp-rimraf');

    /** Usage examples:
     * $ gulp watch
     * $ gulp css
     * $ gulp bundle
     * $ gulp css && gulp bundle
     * */

    var themeName = path.dirname(__dirname).split(path.sep).pop(),
        webBasePath = '/wp-content/themes/' + themeName + '/gulp/',
        basePath = './',
        cssSource = [
            basePath + 'scss/**/*.scss',
            basePath + 'scss/*.scss'
        ],
        assetsDir = 'assets/',
        cssDest = basePath + 'css/',
        bundlesDest = basePath + assetsDir;


    function cssTask() {
        gulp
            .src(cssSource)
            .pipe(scss({
                outputStyle: 'compressed'
            }))
            .pipe(gulp.dest(cssDest));
    }

    gulp.task('cleanCss', function() {
        gulp
            .src([cssDest], {read: false})
            .pipe(rimraf());
    });

    gulp.task('cleanAssets', function() {
        gulp
            .src([bundlesDest], {read: false})
            .pipe(rimraf());
    });

    gulp.task('css', ['cleanCss'], cssTask);

    gulp.task('bundle', ['cleanAssets'], function () {
        gulp
            .src(basePath + 'bundle.develop.js')
            .pipe(bundle())
            .pipe(bundle.results({
                fileName: 'bundle.production',
                dest: basePath,
                pathPrefix: webBasePath + assetsDir
            }))
            .pipe(gulp.dest(bundlesDest));
    });

    gulp.task('watch', ['css'], function() {
        gulp.watch(cssSource, cssTask);
    });
})();
