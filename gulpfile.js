/**
    Paths to project folders
 **/

    const paths = {
      input: "src/",
      output: "public/",
      html: {
        input: "src/views/pages/**/*.html",
        output: "public/",
        nunjunks: ["src/views/templates/", "src/views/partials/"],
        purge: "src/views/**/*.html"
      },
      scripts: {
        input: "src/scripts/index.ts",
        output: "public/"
      },
      styles: {
        input: "src/styles/index.css",
        output: "public/"
      },
      static: {
        input: "src/static/**/*",
        output: "public/"
      },
      reload: "./public/"
    };
    
    /**
        Packages
     **/
    
    // General
    const gulp = require("gulp");
    const size = require("gulp-size");
    const cache = require("gulp-cache");
    const del = require("del");
    
    // HTML
    const nunjucksRender = require("gulp-nunjucks-render");
    const htmlMinimizer = require("gulp-html-minimizer");
    
    // Scripts
    const esbuild = require("gulp-esbuild");
    
    // Styles
    const cssvariables = require("postcss-css-variables");
    const cssimport = require("postcss-import");
    const concat = require("gulp-concat");
    const postcss = require("gulp-postcss");
    const autoprefixer = require("autoprefixer");
    const cssnano = require("cssnano");
    const purgecss = require("@fullhuman/postcss-purgecss");
    
    // BrowserSync
    const browserSync = require("browser-sync").create();
    
    const isDevelopment = process.env.NODE_ENV === "development";
    
    /**
        Tasks
     **/
    
    // Remove pre-existing content from output folders
    function cleanPublic(done) {
      // Clean the public folder
      del.sync([paths.output]);
    
      // Signal completion
      return done();
    };
    
    // Process nunjunk templates to output folder
    function buildHTML() {
      return gulp.src(paths.html.input)
        .pipe(nunjucksRender({
          data: {
            isDevelopment
          },
          path: paths.html.nunjunks,
          watch: false
        }))
        .pipe(htmlMinimizer({
          removeComments: true,
          removeEmptyAttributes: true,
          sortAttributes: true,
          sortClassName: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true
        }))
        .pipe(gulp.dest(paths.html.output))
        .pipe(size({ pretty: true, showFiles: true, showTotal: false }))
        .pipe(browserSync.reload({ stream: true }));
    };
    
    // Process javascript to output folder
    function buildScripts() {
      browserSync.notify("Compiling javascript...");
    
      return gulp.src(paths.scripts.input)
        .pipe(esbuild({
          loader: { ".ts": "ts" },
          outfile: "bundle.min.js",
          bundle: true,
          minify: true,
          sourcemap: true
        }))
        .pipe(gulp.dest(paths.scripts.output))
        .pipe(size({ pretty: true, showFiles: true, showTotal: false }))
        .pipe(browserSync.reload({ stream: true }));
    };
    
    // Process stylesheets to output folder
    function buildStyles() {
      browserSync.notify("Compiling styles...");
    
      return gulp.src(paths.styles.input)
        .pipe(postcss([
          cssimport(),
          cssvariables(),
          autoprefixer(),
          cssnano({
            preset: ["default", {
              discardComments: {
                removeAll: true
              }
            }]
          }),
          purgecss({
            content: [paths.html.purge],
            fontFace: true,
            keyframes: true,
            variables: true
          })
        ]))
        .pipe(concat("bundle.min.css"))
        .pipe(gulp.dest(paths.styles.output))
        .pipe(size({ pretty: true, showFiles: true, showTotal: false }))
        .pipe(browserSync.reload({ stream: true }));
    };
    
    // Copy static assets to output folder
    function copyStaticAssets() {
      // Copy static files
      return gulp.src(paths.static.input)
        .pipe(gulp.dest(paths.static.output));
    };
    
    // Watch for changes to the src directory
    function startServer(done) {
      // Initialize BrowserSync
      browserSync.init({
        files: [paths.output],
        open: false,
        host: "localhost",
        port: 3000,
        server: {
          baseDir: paths.output,
          serveStaticOptions: {
            extensions: ["html"]
          }
        }
      });
    
      // Signal completion
      done();
    };
    
    // Build task
    const buildTask = gulp.series(
      cleanPublic,
      buildStyles,
      buildScripts,
      buildHTML,
      copyStaticAssets
    );
    
    // Reload the browser when files change
    function reloadBrowser(done) {
      cache.clearAll();
    
      browserSync.notify("Reloading site...");
      browserSync.reload();
      done();
    };
    
    // Watch for changes
    function watchSource(done) {
      browserSync.notify("Watching files...");
    
      gulp.watch(paths.input, gulp.series(buildTask, reloadBrowser));
      done();
    };
    
    // Build, watch and reload
    const serveTask = gulp.series(
      buildTask,
      startServer,
      watchSource
    );
    
    /**
        Export Tasks
     **/
    
    gulp.task("serve", serveTask);
    gulp.task("build", buildTask);
    gulp.task(buildTask);
