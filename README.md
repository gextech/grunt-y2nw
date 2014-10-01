Grunt + y2nw
============

Basic task for using **Yadda/Nightwatch** on your build pipeline.

```javascript
grunt.initConfig({
  y2nw: {
    local: {
      src: 'tests',
      dest: 'generated',
      options: {
        suffix: 'suitcase',
        language: 'English'
      }
    }
  }
});

grunt.loadNpmTasks('grunt-y2nw');
```

Then execute your tests with [grunt-nightwatch](https://github.com/gextech/grunt-nightwatch).

```bash
$ grunt y2nw nightwatch
```

## Build status

[![Build Status](https://travis-ci.org/gextech/grunt-y2nw.png?branch=master)](https://travis-ci.org/gextech/grunt-y2nw)
