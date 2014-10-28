# Angular-App Skeleton

## REQUIREMENTS

You will need nodejs, npm, and bower installed to build this project. Version 0.10.32 is working as
of this writing: http://nodejs.org/

Install nodejs and npm normally, then install bower with npm:

npm install -g bower


## BUILD

If this is your first time, you will need to copy the file src/config.example.js to src/config.js
and edit the properties appropriately for the environment to which you are deploying. THEN... 

```
cd src
npm install
grunt
```

Build results go into three directories: 'build', 'dist', and 'test/results'. The build directory
contains a non-minified, complete copy of the applications suitable for having an HTTPD service
deliver it right out of there. The dist directory contains a minified, distribution-ready, zipped
copy of the contents of the build tree. The test/results directory contains just what it describes,
including a junit-compatible test result XML file that can be parsed by a continuous integration
server.

Other useful operations include:
  * `grunt clean` - clean the build result directories out
  * `grunt test` - just run the tests without building
  * `grunt build` - just build without testing or makign a dist version
  * `grunt dist` - make build and dist versions without testing
  * `grunt watch` - watch for changes in source/test files and re-run tests when they do
  * `grunt translate` - get translation strings from source files (po/extracted.pot) and compile *.po


## REFERENCES
* https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#lists
* http://scotch.io/tutorials/javascript/angularjs-best-practices-directory-structure
* angular minification (http://scotch.io/tutorials/javascript/declaring-angularjs-modules-for-minification)

