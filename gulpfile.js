var gulp = require('gulp'),
	webpack = require('webpack'),
	fs = require('fs'),
	debug = require('gulp-debug')


gulp.task('webpack', function(callback) {
	var webpackConfig = require('./webpack.config.js')
	var compileLogger = require('./webpack-config/compileLogger.js')
	
	var myConfig = Object.create(webpackConfig)

	webpack(
		myConfig
	, function(err, stats) {
		compileLogger(err, stats)
		callback()
	})
})

/***************** 移动待发布文件到trunk ***********************/

var file = './file.txt'
gulp.task('move', function() {
	fs.readFile(file, function(err, obj){
		//console.log('err:', err)
		obj = obj.toString().split('\n')

		for(var i = 0; i< obj.length; i++){

			var srcFile = obj[i].replace('\r','')
            
			if(srcFile.indexOf('.') == -1){
				srcFile = srcFile + '/**/*.*'
			}
			console.log('dir:', srcFile)

			if(srcFile.indexOf('static_guojiang_tv') != -1){
				gulp.src(srcFile, {base: './static_guojiang_tv'})    
                    .pipe(debug({title: 'static:'}))
                    .pipe(gulp.dest( fs.realpathSync('./trunk/static') ))
			}else{
				gulp.src(srcFile, {base: './html'})    
                    .pipe(debug({title: 'videochat:'}))
                    .pipe(gulp.dest( fs.realpathSync('./trunk/videochat/web/html') ))
			}
            
		}
        
	})  


})