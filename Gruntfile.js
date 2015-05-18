module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            libs: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/angularjs/angular.min.js',
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/bootstrap-drawer/dist/css/bootstrap-drawer.min.css',
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/bootstrap-drawer/dist/js/drawer.min.js',
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/jquery/dist/jquery.min.js',
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/jquery/dist/jquery.min.map',
                        dest: '.build/work/lib/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf',
                        dest: '.build/work/fonts/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff',
                        dest: '.build/work/fonts/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff2',
                        dest: '.build/work/fonts/'
                    }
                ]
            },
            src: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '**',
                        dest: '.build/work/'
                    }
                ]
            }
        },
        clean: {
            work: {
                src: ['.build/work']
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

    grunt.registerTask('build', [
        'clean:work',
        'copy'
    ]);

    grunt.registerTask('launch', [
        'build',
        'http-server:dev',
        'watch'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
}