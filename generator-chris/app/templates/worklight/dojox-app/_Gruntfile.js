module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['<%= commonDir %>/commonapp/**/*.js'],
            options : {
                '-W099': true
            }
        },
        
        watch: {
            options : {
                livereload: true
            },

           files: ['<%= commonDir %>/**/*'],
           tasks: ['jshint']
        },
        
        clean: {
        	themes: ["www/dojox/mobile/themes"]
        },
        
        copy: {
        	  commonapp: {
        		  expand: true,
        		  cwd: '../Build/output/requirejsBuild/commonapp',
        		  src: '**',
        		  dest: '<%= commonDir %>/commonapp'
        	  },
        	  www : {
        		  expand: true,
        		  cwd: '../Build/output/requirejsBuild/www',
        		  src: ['**'],
        		  dest: 'www'
        	  },
        	  themes : {
        		  expand: true,
        		  cwd: '../Build/output/requirejsBuild/www/dojox/mobile/themes/',
        		  src: ['iphone/iphone.css','iphone/ipad.css','common/**'],
        		  dest: 'www/dojox/mobile/themes/'
        	  }
        },
        
        requirejs: {
        	options: {
        		 mainConfigFile: "<%= commonDir %>/js/require-main.js",
        		 optimizeCss: "standard",
                 paths : {
                     commonapp : 'common/commonapp'
                 },
                 fileExclusionRegExp: /native|\.min|\.xml|\.txt|\.zip*/
        	},
            commonapp: {
                options: {
                    baseUrl: "<%= commonDir %>/commonapp",
                    dir: "../Build/output/requirejsBuild/commonapp"
                }
            },
            www: {
            	options: {
            		baseUrl: "www",
            		dir: "../Build/output/requirejsBuild/www"
            	}
            }
        }
    });

    //Load existing tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    //Start Worklight tasks
    grunt.registerTask('buildwlapp','Build Worklight app .wlapp file',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['buildwlapp','-f','../Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    
    grunt.registerTask('deploywlapp','Deploy Worklight app .wlapp file',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['deploywlapp','-f','../Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    
    grunt.registerTask('buildadapters','Build Worklight adapters',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['buildadapters','-f','../Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });

    grunt.registerTask('deployadapters','Deploy Worklight adapters',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['deployadapters','-f','../Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    
    grunt.registerTask('buildWAR','Build Worklight WAR',function(){
        grunt.util.spawn({
                 cmd : 'ant',
                 args: ['buildWAR','-f','../Build/scripts/build.xml'],
                 opts: {stdio: 'inherit'}
         },grunt.task.current.async());
    });
    //end Worklight tasks

    grunt.registerTask('default', ['jshint','requirejs','copy','clean:themes','copy:themes','buildwlapp','buildadapters']);

};