module.exports = function(grunt) {
  grunt.initConfig({
    webpack: {
      build: {
        entry: "./src/comment.jsx",
        output: {
          path: __dirname + "/build/",
          filename: "bundle.js"
        },
        module: {
          loaders: [
            {
              test: /\.css$/,
              loader: "style!css"
            },
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel'
            },
            {
              test: /\.(png|woff|woff2|eot|ttf|svg)$/,
              loader: 'url-loader?limit=100000'
            }
          ]
        },
        stats: {
          colors: true,
          reasons: true
        },
        progress: true
      },
      watch: {
        entry: "./src/comment.jsx",
        output: {
          path: __dirname + "/build/",
          filename: "bundle.js"
        },
        module: {
          loaders: [
            {
              test: /\.css$/,
              loader: "style!css"
            },
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel'
            },
            {
              test: /\.(png|woff|woff2|eot|ttf|svg)$/,
              loader: 'url-loader?limit=100000'
            }
          ]
        },
        stats: {
          colors: true,
          reasons: true
        },
        progress: true,
        watch: true,
        keepalive: true
      }
    },
    copy: {
      index: {
        src: "src/index.html",
        dest: "build/index.html"
      },
      image: {
        src: "src/github.png",
        dest: "build/github.png"
      }
    },
    watch: {
      main: {
        files: ['src/index.html'],
        tasks: ['copy:index', 'copy:image']
      }
    },
    concurrent: {
      watch: {
        tasks: ['webpack:watch', 'watch:main'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');


  grunt.registerTask('build', ['webpack:build', 'copy:index', 'copy:image']);
  grunt.registerTask('dev', ['concurrent:watch']);

};