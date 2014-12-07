# AngularApp Skeleton

This is a "walking skeleton", so to speak, web application based on AngularJS
(https://angularjs.org) and an ecosystem of nodejs (http://nodejs.org) tools that are commonly
used to manage, build, and deploy AnrgularJS applications. The idea here is to save time when
ramping up new projects by providing a comprehensive solution for all the foundational stuff
that can otherwise take hours, or days of valuable development time, particularly when this is
all new to you.

Once you have everything installed under the PREREQUISITES section below, you will be able to
BUILD a working version of the application into the build directory. The build directory is
intended to be suitable for hosting up directly whether through your IDE (IntelliJ can do this,
for example), a nodejs/grunt launched host, or some other HTTP server such as Apache already
running in your environment: simply make the contents of the build directory available through
your HTTP server solution, and you are off to the races.

To launch the AngularApp, simply direct your browser to http://yourhostname/builddir/index.html

## PREREQUISITES

1) Install nodejs (0.10.32 is working as of this writing)
2) Install npm
3) Install ruby (2.0.0 is working as of this writing)
4) npm install -g grunt grunt-cli

```
gem install foundation
gem install compass
gem install sass
```

## BUILD

If this is your first time, you will need to copy the file src/config.example.js to src/config.js
and edit the properties appropriately for the environment to which you are deploying. THEN... 

```
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
  * `grunt bower` - just get/update the bower dependencies
  * `grunt clean` - clean the build result directories out
  * `grunt test` - just run the tests without building
  * `grunt build` - just build without testing or making a dist version
  * `grunt dist` - make build and dist versions without testing
  * `grunt quick` - similar to build target, but skips testing and dist build (more quicker!)
  * `grunt watch` - watch for changes in source/test files and re-run tests when they do
  * `grunt translate` - get translation strings from source files (po/extracted.pot) and compile *.po

