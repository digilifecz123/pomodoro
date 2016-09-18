module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        exec: {
            ormupdate: 'php www/index.php orm:schema-tool:update --force'
        },
        fileExists: {
            scripts: ['app/config/config.local.neon']
        },

        less: {
            development: {
                files: {
                    "assets/css/main.css": "assets/css/main.less" // destination file and source file
                }
            }
        },
        watch: {
            styles: {
                files: ['assets/css/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            scripts: {
                files: 'composer.json',
                tasks: ['composer:install']
            },
            npm: {
                files: 'package.json',
                tasks: ['npm-install']
            }
        }
    });

    grunt.registerTask('templates', ['install', 'develop']);
    grunt.registerTask('default', ['develop']);
    grunt.registerTask('install', ['clean', 'fileExists', 'composer:install', 'exec:ormupdate', 'watch']);
    grunt.registerTask('develop', ['less', 'watch']);
    grunt.registerTask('deploy', ['clean:deployment']);
};