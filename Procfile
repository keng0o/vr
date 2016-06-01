build: babel -d dist -w src/**/*.js --presets es2015
bundle: watchify dist/src/app.js -o bundle.js -v
livereload: browser-sync start --server --files index.html --files bundle.js