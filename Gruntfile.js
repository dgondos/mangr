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
                    }]
            },
            src: {
                files: [
                    {
                        expand:true,
                        src: 'src',
                        dest: '.build/work/src/'
                    }
                ]
            }
        },
        clean: {
            work: {
                src: ['.build/work']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', [
        'copy'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
}