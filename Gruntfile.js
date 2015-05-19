module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            libs: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/angularjs/angular.min.js*'],
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/angular-route/angular-route.min.js*'],
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
                              'bower_components/bootstrap/dist/js/bootstrap.min.js',
                              'bower_components/bootstrap/js/transition.js'],
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/bootstrap/fonts/glyphicons-halflings-regular.*'],
                        dest: '.build/work/fonts/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/bootstrap-drawer/dist/css/bootstrap-drawer.min.css',
                              'bower_components/bootstrap-drawer/dist/js/drawer.min.js'],
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/jquery/dist/jquery.min.*'],
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/components-font-awesome/css/font-awesome.min.css'],
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/components-font-awesome/fonts/*'],
                        dest: '.build/work/fonts/'
                    }
                ]
            },
            index: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: 'index.html',
                        dest: '.build/work/'
                    }
                ]
            },
            built: {
                files: [
                    {
                        expand: true,
                        cwd: '.build/tmp',
                        src: 'mangr.min.js',
                        dest: '.build/work/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'server',
                        src: ['**'],
                        dest: '.build/dist/'
                    },
                    {
                        expand: true,
                        flatten: false,
                        cwd: '.build/work',
                        src: ['**'],
                        dest: '.build/dist/site-static/'
                    }
                ]
            }
        },
        html2js: {
            main: {
                src: ['src/**/*.tpl.html'],
                dest: '.build/tmp/tpl.js'
            }
        },
        concat: {
            dist: {
                src: ['.build/tmp/tpl.js', 'src/**/*.js'],
                dest: '.build/tmp/mangr.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    '.build/tmp/mangr.min.js': ['.build/tmp/mangr.js']
                }
            }
        },
        clean: {
            build: {
                src: ['.build']
            },
            tmp: {
                src: ['.build/tmp']
            },
            work: {
                src: ['.build/work']
            },
            dist: {
                src: ['.build/dist']
            }
        },
        'http-server': {
            'dev': {
                root: ".build/work",
                port: 8282,
                host: "0.0.0.0",
                showDir: true,
                autoIndex: true,
                ext: "html",
                runInBackground: true
            }
        },
        watch: {
            scripts: {
                files: ['src/**'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', [
        'clean:tmp',
        'clean:work',
        'html2js',
        'concat',
        'uglify',
        'copy:libs',
        'copy:index',
        'copy:built'
    ]);

    grunt.registerTask('launch', [
        'build',
        'http-server:dev',
        'watch'
    ]);

    grunt.registerTask('deploy', [
        'build',
        'clean:dist',
        'copy:dist'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
}