var gulp = require('gulp');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var git = require('gulp-git');
var rename = require('gulp-rename');

gulp.task('default', function() {
    return gulp.watch('../**/**.js', function(obj) {
        gulp.src(['README.tmp.md'])
            .pipe(rename('README.md'))
            .pipe(gulp.dest('.'));
    });
});
gulp.task('templates', function(){
    gulp.src(['README.md'])
        .pipe(replace('TIMESTAMP', Date()))
        .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', function () {
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('push-changes', function (cb) {
    git.push('origin', 'master', cb);
});

gulp.task('default', function (callback) {
    runSequence(
        'templates',
        'commit-changes',
        'push-changes',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            if(callback){
                callback(error);
            }
        });
});