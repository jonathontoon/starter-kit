# Starter Kit 

A simple static site / PWA boilerplate using nunjunks for HTML templating, esbuild for JS transpilation and CSS variables.

**Features**

- Concatenate, minify, and lint TypeScript.
- Compile, minify, autoprefix, and lint CSS.
- Copy static files and folders into your `public` directory.
- Automatically add headers and project details to JS and CSS files.
- Create polyfilled and non-polyfilled versions of JS files.
- Watch for file changes, and automatically recompile build and reload webpages.

**Gulp Boilerplate makes it easy to turn features on and off**, so you can reuse it for all of your projects without having to delete or modify tasks.

## Getting Started

### Dependencies

*__Note:__ if you've previously installed Gulp globally, run `npm rm --global gulp` to remove it. [Details here.](https://medium.com/gulpjs/gulp-sips-command-line-interface-e53411d4467)*

Make sure these are installed first.

- [Node.js](http://nodejs.org)

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `yarn install` to install required files and dependencies.
3. When it's done installing, run one of the task runners to get going:
	- `yarn build` manually compiles files.
	- `yarn start` automatically compiles files and applies changes using [BrowserSync](https://browsersync.io/) when you make changes to your source files.

## Documentation

Add your source files to the appropriate `src` subdirectories. Gulp will process and and compile them into `public`.

- JavaScript files in the `src/js` directory will be compiled to `public/bundle.min.js`.
- Files in the `src/css` directory will be compiled to `public/bundle.min.css`.
- Files and folders placed in the `src/assets` directory will be copied as-is into the `public` directory.

### package.json

The `package.json` file holds all of the details about your project.

Some information is automatically pulled in from it and added to a header that's injected into the top of your JavaScript and CSS files.

```json
{
	"name": "project-name",
	"version": "0.0.1",
	"description": "A description for your project.",
    "main": "gulpfile.js",
	"author": {
		"name": "YOUR NAME",
		"url": "http://link-to-your-website.com"
	},
	"license": "MIT",
	"repository": {
		"type": "git",
		"url": "http://link-to-your-git-repo.com"
	},
	"devDependencies": {}
}
```

*__Note:__ `devDependencies` are the dependencies Gulp uses. Don't change these or you'll break things.*

### Copy Files

Files and folders placed in the `src/assets` directory will be copied as-is into `public`.

This is a great place to put images, and pre-compiled assets.

## Options & Settings

Options and settings are located at the top of the `gulpfile.js`.

### Settings

Set features under the `settings` variable to `true` to turn them on (default), and `false` to turn them off.

```js
/**
     Settings
    Turn on/off build features
**/

const settings = {
    clean: true,
    html: true,
    javascript: true,
    stylesheets: true,
    assets: true,
    reload: true
};
```

### Paths

Adjust the `input` and `output` paths for all of the Gulp tasks under the `paths` variable. Paths are relative to the root project folder.

```js
/**
    Paths to project folders
**/

const paths = {
	input: "src/",
	output: "public/",
	html: {
		input: "src/views/pages/*.html",
    output: "public/",
    nunjunks: [ "src/views/templates/", "src/views/partials/" ],
    purge: "src/views/**/*.html"
	},
  javascript: {
		input: "src/js/index.js",
		output: "public/"
	},
	stylesheets: {
		input: "src/css/index.css",
		output: "public/"
	},
	assets: {
		input: "src/assets/**/*",
		output: "public/"
	},
	reload: "./public/"
};
```

## License

The code is available under the [MIT License](LICENSE.md).