module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            site_static: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/bootstrap/fonts/glyphicons-halflings-regular.*',
                              'bower_components/components-font-awesome/fonts/*'],
                        dest: 'dist/site-static/fonts/'
                    },
                    {
                        expand: true,
                        cwd: 'src',
                        src: 'index.html',
                        dest: 'dist/site-static/'
                    },
                    {
                        expand: true,
                        cwd: '.tmp',
                        src: 'mangr.min.js',
                        dest: 'dist/site-static/'
                    }
                ]
            },
            server: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'server',
                        src: ['**'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        html2js: {
            main: {
                src: ['src/**/*.tpl.html'],
                dest: '.tmp/tpl.js'
            }
        },
        concat: {
            js: {
                src: ['bower_components/jquery/dist/jquery.min.js',
                      'bower_components/bootstrap/dist/js/bootstrap.min.js',
                      'bower_components/bootstrap-drawer/dist/js/drawer.min.js',
                      'bower_components/angularjs/angular.min.js',
                      'bower_components/angular-route/angular-route.min.js',
                      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                      'bower_components/angular-ui-select/dist/select.min.js',
                      '.tmp/tpl.js',
                      'src/**/*.js'],
                dest: '.tmp/mangr.js'
            },
            css: {
                src: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
                      'bower_components/bootstrap-drawer/dist/css/bootstrap-drawer.min.css',
                      'bower_components/components-font-awesome/css/font-awesome.min.css',
                      'bower_components/angular-ui-select/dist/select.min.css',
                      'src/mangr.css'],
                dest: 'dist/site-static/mangr.css'
            }
        },
        uglify: {
            options : {
                beautify : true,
                mangle   : false
            },
            my_target: {
                files: {
                    '.tmp/mangr.min.js': ['.tmp/mangr.js']
                }
            }
        },
        clean: {
            tmp: {
                src: ['.tmp']
            },
            site_static: {
                src: ['dist/site-static']
            },
            dist: {
                src: ['dist']
            }
        },
        watch: {
            site_static: {
                files: ['src/**'],
                tasks: ['build_site_static'],
                options: {
                    spawn: false
                }
            },
            server: {
                files: ['server/**'],
                tasks: ['build_server'],
                options: {
                    spawn: false
                }
            }
        },
        run: {
            options: {
                cwd: 'dist'
            },
            updateDeps: {
                cmd: 'npm',
                args: [
                    'update'
                ]
            },
            server: {
                cmd: 'npm',
                args: [
                    'start'
                ]
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
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('build_site_static', [
        'clean:site_static',
        'html2js',
        'concat',
        'uglify',
        'copy:site_static',
        'clean:tmp'
    ]);

    grunt.registerTask('build_server', [
        'copy:server'
    ]);

    grunt.registerTask('build', [
        'build_site_static',
        'build_server'
    ]);

    grunt.registerTask('launch', [
        'build',
        'run:server'
    ]);

    grunt.registerTask('default', [
        'launch'
    ]);
};