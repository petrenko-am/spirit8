"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var config = {
    pkg: grunt.file.readJSON("package.json"),

   clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "img/**",
            "*.html",
			"css/normalize.css"
          ],
          dest: "build"
        }]
      }
    },

    less: {
      style: {
        files: {
          "build/css/style.css": ["source/less/style.less"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/style.css"
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },

    concat: {
      options: {
        separator: ";\n"
      },
      js: {
        src: [
			"source/js/vendors/mustache-2.2.0.min.js",
			"source/js/script.js"
        ],
        dest: "build/js/script.js"
      }
    },

    uglify: {
      js: {
        files: {
          "build/js/script.min.js": [
            "source/js/vendors/mustache-2.2.0.min.js",
            "source/js/script.js"
          ]
        }
      }
    },

    watch: {
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "cmq", "postcss"]
      },
      js: {
        files: ["source/js/**/*.js"],
        tasks: ["concat"]
      }
    },

    csscomb: {
      style: {
        expand: true,
        src: ["source/less/**/*.less"]
      }
    }
  };

  


  // Не редактируйте эту строку

  grunt.initConfig(config);
  
  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "cssmin",
    "imagemin",
    "uglify"
  ]);  
 };
