module.exports = function(grunt) {

	var config = grunt.file.readJSON('grunt-config.json');
	config.pkg = grunt.file.readJSON('package.json');
	config.requirejs.options.fileExclusionRegExp =  /native|\.min|\.xml|\.txt|\.zip*/;
    grunt.initConfig(config);

    //Load existing tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    

    grunt.registerTask('default', ['jshint','requirejs','clean','copy']);

};